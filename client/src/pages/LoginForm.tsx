import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useShop } from "../context/ShopContextProvider";

const LoginForm = () => {
  const { setIsLogin, currentState, setCurrentState } = useShop();

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formLogin, setFormLogin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    condition: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLogin(true);
    navigate("/")
    console.log("Form submitted:", formLogin);
  };

  return (
    <div className="min-h-screen bg-app-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold text-app-green inline-block"
          >
            Village<span className="text-app-orange">Store</span>
          </Link>
          <h2 className="text-2xl font-serif text-app-text mt-4">
            {currentState === "login" ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-sm text-app-text-light mt-1">
            {currentState === "login"
              ? "Sign in to your account to continue"
              : "Join the VillageStore community today"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields - Only show on signup */}
            {currentState === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-app-text-light mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
                    <input
                      type="text"
                      name="firstName"
                      value={formLogin.firstName}
                      onChange={handleChange}
                      placeholder="Mohammed"
                      className="w-full pl-10 pr-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-app-text-light mb-1.5">
                    Last Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
                    <input
                      type="text"
                      name="lastName"
                      value={formLogin.lastName}
                      onChange={handleChange}
                      placeholder="Awal"
                      className="w-full pl-10 pr-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
                <input
                  type="email"
                  name="email"
                  value={formLogin.email}
                  onChange={handleChange}
                  placeholder="villagestore.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formLogin.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
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
            </div>

            {/* Remember Me & Forgot Password - Login Only */}
            {currentState === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 rounded border-app-border text-app-orange focus:ring-app-orange focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-app-text-light">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-app-orange hover:text-app-orange-dark transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms & Conditions - Signup Only */}
            {currentState === "signup" && (
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="condition"
                  checked={formLogin.condition}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-app-border text-app-orange focus:ring-app-orange focus:ring-2 cursor-pointer mt-0.5"
                />
                <span className="text-sm text-app-text-light">
                  I agree to the{" "}
                  <Link to="/terms" className="text-app-orange hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-app-orange hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {currentState === "login" ? "Sign In" : "Create Account"}
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-app-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-app-text-light">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-app-border rounded-xl hover:bg-app-cream transition-colors duration-200 text-sm font-medium text-app-text"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-app-border rounded-xl hover:bg-app-cream transition-colors duration-200 text-sm font-medium text-app-text"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <div className="text-center mt-6">
            <p className="text-sm text-app-text-light">
              {currentState === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                type="button"
                onClick={() =>
                  setCurrentState(currentState === "login" ? "signup" : "login")
                }
                className="ml-1 text-app-orange hover:text-app-orange-dark font-medium transition-colors"
              >
                {currentState === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 text-center">
          <p className="text-xs text-app-text-light">
            Demo: admin@villagestore.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
