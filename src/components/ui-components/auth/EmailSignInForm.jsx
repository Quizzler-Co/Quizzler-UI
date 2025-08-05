/**
 * EmailSignInForm Component
 *
 * A form component for user email/password authentication.
 * Integrates with the backend API at http://localhost:8086/api/v1/auth/login
 *
 * Features:
 * - Email/password validation
 * - "Remember me" functionality (stores token in localStorage vs sessionStorage)
 * - Loading states with spinner
 * - Error handling and display
 * - Password visibility toggle
 *
 * Usage:
 * <EmailSignInForm onSubmit={(result) => {
 *   if (result.success) {
 *     // Handle successful login
 *     console.log('Token:', result.data.accessToken);
 *   }
 * }} />
 *
 * The component automatically:
 * - Stores JWT token in localStorage (if remember me) or sessionStorage
 * - Handles API errors and displays them to the user
 * - Provides loading feedback during authentication
 */

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "../Input";
import Label from "../Label";
import UserService from "../../../services/UserService";

const EmailSignInForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await UserService.login(formData);
      console.log("Login successful:", result);

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit({
          success: true,
          data: result.data,
          formData: formData,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signin-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-black transition-colors disabled:cursor-not-allowed"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <button
          type="button"
          className="text-sm text-black hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default EmailSignInForm;
