import { getAuth } from "firebase/auth";

export async function apiFetch(url, options = {}) {
  const auth = getAuth();
  const user = auth.currentUser;

  let headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // If logged in, attach Firebase ID token
  if (user) {
    const idToken = await user.getIdToken();
    headers.Authorization = `Bearer ${idToken}`;
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    credentials: "include",
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Request failed");
  }

  return res.json();
}
