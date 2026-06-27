import React, { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldIcon,
  LogInIcon,
} from "lucide-react";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (
      adminForm.email === "mohammed0012@gmail.com" &&
      adminForm.password === "0244583176"
    ) {
      localStorage.setItem("admin", "true");
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-app-green to-app-green-light p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", damping: 25 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl space-y-6"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            className="flex items-center justify-center mb-2"
          >
            <div className="w-16 h-16 rounded-full bg-app-orange/10 flex items-center justify-center">
              <ShieldIcon className="w-8 h-8 text-app-orange" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-app-text">
              Admin Login
            </h2>
            <p className="text-sm text-app-text-light mt-1">
              Enter your credentials to access the dashboard
            </p>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-1.5"
          >
            <label className="block text-xs font-medium text-app-text-light">
              Email Address
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                value={adminForm.email}
                onChange={handleChange}
                placeholder="admin@villagestore.com"
                className="w-full pl-10 pr-4 py-3 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="space-y-1.5"
          >
            <label className="block text-xs font-medium text-app-text-light">
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type={showPassword ? "text" : "password"}
                name="password"
                value={adminForm.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-light hover:text-app-text transition-colors"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-app-cream/50 rounded-xl p-3 text-center"
          >
            <p className="text-xs text-app-text-light">
              <span className="font-medium">Demo:</span> mohammed0012@gmail.com
              / 0244583176
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-app-orange hover:bg-app-orange-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <LogInIcon className="w-4 h-4" />
            Login
          </motion.button>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="text-center pt-2 border-t border-app-border/50"
          >
            <p className="text-xs text-app-text-light">
              VillageStore Admin Panel
            </p>
          </motion.div>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default AdminLogin;
