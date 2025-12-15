import { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth } from "../firebase.init";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const skipAuthCheck = useRef(false);

  const registerUserInDB = async (firebaseUser, role = "user") => {
    try {
      const payload = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || "",
        profileImage: firebaseUser.photoURL || "",
        role,
      };
      await axios.post("http://localhost:3000/users", payload, {
        withCredentials: true,
      });
    } catch (err) {
      if (err.response?.data?.error !== "User already exists") {
        console.error(
          "Failed to register user in DB:",
          err.response?.data || err.message
        );
      }
    }
  };

  const register = async ({
    email,
    password,
    name,
    profileImage,
    role = "user",
    address,
  }) => {
    skipAuthCheck.current = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profileImage,
      });

      await userCredential.user.reload();
      const updatedFirebaseUser = auth.currentUser;

      const token = await updatedFirebaseUser.getIdToken(true);

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token, name, address, profileImage }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Backend register failed");
      const data = await res.json();

      // 5. Ensure basic user record exists
      await registerUserInDB(updatedFirebaseUser, role);

      const finalUser = { ...updatedFirebaseUser, ...data.user };

      setUser(finalUser);
      setUserRole(role);

      return { ...finalUser, role };
    } finally {
      setTimeout(() => {
        skipAuthCheck.current = false;
      }, 1000);
    }
  };

  // Login existing user
  const login = async (email, password) => {
    skipAuthCheck.current = true;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken(true);
      const tokenResult = await userCredential.user.getIdTokenResult();
      const role = tokenResult.claims.role || "user";

      // 1. Login to backend (sets cookie)
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken: token }),
      });

      if (!res.ok) throw new Error("Backend login failed");

      // 2. Fetch full user profile from backend
      const meRes = await fetch("http://localhost:3000/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      let finalUser = userCredential.user;
      if (meRes.ok) {
        const meData = await meRes.json();
        // Merge to ensure completeness
        finalUser = { ...userCredential.user, ...meData.user };
      }

      setUser(finalUser);
      setUserRole(role);

      await registerUserInDB(userCredential.user, role);

      return { ...finalUser, role };
    } finally {
      setTimeout(() => {
        skipAuthCheck.current = false;
      }, 1000);
    }
  };

  // Logout
  const logout = async () => {
    skipAuthCheck.current = true;
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Backend logout failed", err);
    } finally {
      setTimeout(() => {
        skipAuthCheck.current = false;
      }, 1000);
    }
  };

  //  Track auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      //  Check if we should skip
      if (skipAuthCheck.current) {
        return;
      }

      if (current) {
        setAuthLoading(true);
        try {
          await current.getIdToken(true);
          const tokenResult = await current.getIdTokenResult();
          const role = tokenResult.claims.role || "user";

          const res = await fetch("http://localhost:3000/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${await current.getIdToken()}` },
          });

          if (res.ok) {
            const data = await res.json();
            setUser({ ...current, ...data.user });
          } else {
            console.warn("Backend sync failed, using Firebase state");
            setUser(current);
          }
          setUserRole(role);
        } catch (err) {
          console.error("Auth hydration error:", err);
          setUser(current);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setAuthLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userRole, authLoading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
