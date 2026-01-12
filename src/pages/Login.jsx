import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userWithRole = await login(data.email, data.password);

      const role = userWithRole.role || "user";

      toast.success("Logged in successfully!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.message || "Login failed.");
    }
  };

  const handleDemoLogin = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    toast.info("Demo credentials auto-filled. Click 'Sign In' to proceed.");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-amber-glow-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -60, 0],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div 
           animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 45, 0],
            x: [0, -50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-base-100/80 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <img src="/fest-flow.png" alt="FeastFlow Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h2 className="text-3xl font-extrabold text-base-content">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Sign in to continue your delicious journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content ml-1 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="appearance-none block w-full px-4 py-3 border border-base-300 bg-base-100/50 text-base-content rounded-xl placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-amber-glow-400/50 focus:border-amber-glow-400 transition-all duration-200"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content ml-1 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 chars",
                    },
                  })}
                  className="appearance-none block w-full px-4 py-3 border border-base-300 bg-base-100/50 text-base-content rounded-xl placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-amber-glow-400/50 focus:border-amber-glow-400 transition-all duration-200"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end mt-2">
                 <a href="#" className="text-sm font-medium text-amber-glow-600 hover:text-amber-glow-500">Forgot password?</a>
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-amber-glow-500 to-orange-500 hover:from-amber-glow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-glow-500 transition-all duration-200 shadow-lg shadow-orange-500/30"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </motion.div>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-8 pt-6 border-t border-base-content/10">
          <p className="text-center text-xs font-bold text-base-content/50 uppercase tracking-widest mb-4">
            Quick Access Demo
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Admin", role: "admin", email: "myadmin@example.com", pass: "Myadmin123456!", color: "bg-red-500/10 text-red-600 border-red-500/20" },
              { label: "Chef", role: "chef", email: "gordon@Ramsay.com", pass: "Gordon1234!", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
              { label: "User", role: "user", email: "alice@dean.com", pass: "Alicedean45!", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
            ].map((demo) => (
              <motion.button
                key={demo.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDemoLogin(demo.email, demo.pass)}
                className={`py-2 px-1 text-[10px] font-bold rounded-xl border transition-all duration-200 ${demo.color} hover:shadow-md`}
              >
                {demo.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Don’t have an account?{" "}
            <a
              className="font-bold text-amber-glow-600 hover:text-amber-glow-500 transition-colors"
              href="/register"
            >
              Create an account
            </a>
          </p>
        </div>
      </motion.div>
    </section>

  );
}

export default Login;
