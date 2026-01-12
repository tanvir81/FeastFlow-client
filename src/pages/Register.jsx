import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

// upload image to ImgBB
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
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
    <section className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 right-0 w-96 h-96 bg-amber-glow-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 60, 0],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-base-100/80 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <img src="/fest-flow.png" alt="FeastFlow Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h2 className="text-3xl font-extrabold text-base-content">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Join FeastFlow and start your culinary adventure
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-base-content ml-1 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="appearance-none block w-full px-4 py-3 border border-base-300 bg-base-100/50 text-base-content rounded-xl placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-amber-glow-400/50 focus:border-amber-glow-400 transition-all duration-200"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 ml-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-base-content ml-1 mb-1">
              Email Address
            </label>
            <input
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

          {/* Profile Image File */}
          <div>
            <label className="block text-sm font-medium text-base-content ml-1 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photoFile", {
                required: "Profile image is required",
              })}
              className="block w-full text-sm text-base-content file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-amber-glow-100 file:text-amber-glow-700 hover:file:bg-amber-glow-200 transition-all"
            />
            {errors.photoFile && (
              <p className="mt-1 text-sm text-red-500 ml-1">
                {errors.photoFile.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-base-content ml-1 mb-1">
              Delivery Address
            </label>
            <textarea
              rows={2}
              placeholder="123 Main St, City, Country"
              {...register("address", { required: "Address is required" })}
              className="appearance-none block w-full px-4 py-3 border border-base-300 bg-base-100/50 text-base-content rounded-xl placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-amber-glow-400/50 focus:border-amber-glow-400 transition-all duration-200 resize-none"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500 ml-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Password Group */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-base-content ml-1 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••"
                {...register("password", {
                  required: "Required",
                  minLength: {
                    value: 6,
                    message: "Min 6 chars",
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

            <div>
              <label className="block text-sm font-medium text-base-content ml-1 mb-1">
                Confirm
              </label>
              <input
                type="password"
                placeholder="••••••"
                {...register("confirmPassword", {
                  required: "Required",
                })}
                className="appearance-none block w-full px-4 py-3 border border-base-300 bg-base-100/50 text-base-content rounded-xl placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-amber-glow-400/50 focus:border-amber-glow-400 transition-all duration-200"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
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
                  Creating Account...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </motion.div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Already have an account?{" "}
            <a
              className="font-bold text-amber-glow-600 hover:text-amber-glow-500 transition-colors"
              href="/login"
            >
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Register;
