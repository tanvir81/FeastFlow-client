import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// upload image to ImgBB
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=51cf2af8b48eb5d916dd2d4dd09b0a3f`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!data.success)
    throw new Error(data.error?.message || "Image upload failed");
  return data.data.url; // hosted image URL
};

function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const file = data.photoFile[0];
      if (!file) throw new Error("No file selected");

      console.log(" Uploading image to ImgBB...");
      const uploadedUrl = await uploadImage(file);

      // Call AuthContext register
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        profileImage: uploadedUrl,
        address: data.address,
      });

      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Registration failed:", err);
      toast.error(err?.message || "Registration failed.");
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Profile Image File */}
        <input
          type="file"
          accept="image/*"
          {...register("photoFile", { required: "Profile image is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.photoFile && (
          <p className="text-red-500">{errors.photoFile.message}</p>
        )}

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a className="text-red-600" href="/login">
          Login
        </a>
      </p>
    </section>
  );
}

export default Register;
