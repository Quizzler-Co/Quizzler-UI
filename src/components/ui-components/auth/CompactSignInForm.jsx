import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const CompactSignInForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in data:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Email Field */}
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Sign In
      </button>

      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-black transition-colors"
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
};

export default CompactSignInForm;
