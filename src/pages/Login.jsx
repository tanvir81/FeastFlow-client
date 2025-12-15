import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Step 1: login via AuthContext (handles token + backend)
      const userWithRole = await login(data.email, data.password);

      // Step 2: role is already returned from AuthContext
      const role = userWithRole.role || "user";

      toast.success("Logged in successfully!");

      // ✅ Step 3: always redirect to /dashboard
      // Dashboard.jsx will render the correct dashboard based on role
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.message || "Login failed.");
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 chars",
            },
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <a className="text-red-600" href="/register">
          Register
        </a>
      </p>
    </section>
  );
}

export default Login;
