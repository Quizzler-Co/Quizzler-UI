import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const CompactSignUpForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Name Field */}
      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            required
          />
        </div>
      </div>

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

      {/* Terms Checkbox */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          className="mt-1 w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
          required
        />
        <label htmlFor="terms" className="text-xs text-gray-600">
          I agree to the{" "}
          <button type="button" className="text-black hover:underline">
            Terms
          </button>{" "}
          and{" "}
          <button type="button" className="text-black hover:underline">
            Privacy Policy
          </button>
        </label>
      </div>

      {/* Create Account Button */}
      <button
        type="submit"
        disabled={!formData.acceptTerms}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Create Account
      </button>
    </form>
  );
};

export default CompactSignUpForm;
