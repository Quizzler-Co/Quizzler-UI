import React, { useState } from "react";
import { Phone, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import Input from "../Input";
import Label from "../Label";

const OTPSignInForm = ({ onSubmit }) => {
  const [otpStep, setOtpStep] = useState("phone"); // "phone" | "verify" | "complete"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep("verify");
    }, 2000);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep("complete");
      setTimeout(() => {
        if (onSubmit) onSubmit({ phoneNumber, otp });
        resetOTPFlow();
      }, 2000);
    }, 1500);
  };

  const resetOTPFlow = () => {
    setOtpStep("phone");
    setPhoneNumber("");
    setOtp("");
  };

  if (otpStep === "phone") {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <Shield className="h-12 w-12 text-black mx-auto" />
          <h3 className="text-lg font-semibold">Sign in with OTP</h3>
          <p className="text-sm text-gray-600">
            We'll send a verification code to your phone
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="pl-10"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          onClick={handleSendOTP}
          disabled={!phoneNumber || isLoading}
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    );
  }

  if (otpStep === "verify") {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <button
              className="mr-2 p-1 hover:bg-gray-100 rounded"
              onClick={resetOTPFlow}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Shield className="h-12 w-12 text-black" />
          </div>
          <h3 className="text-lg font-semibold">Enter Verification Code</h3>
          <p className="text-sm text-gray-600">
            We sent a 6-digit code to {phoneNumber}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            className="text-center text-lg tracking-widest"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            required
          />
        </div>
        <button
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          onClick={handleVerifyOTP}
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Sign In"}
        </button>
        <div className="text-center">
          <button
            className="text-sm text-black hover:underline"
            onClick={handleSendOTP}
          >
            Didn't receive code? Resend
          </button>
        </div>
      </div>
    );
  }

  if (otpStep === "complete") {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h3 className="text-lg font-semibold text-green-600">
          Verification Successful!
        </h3>
        <p className="text-sm text-gray-600">You're being signed in...</p>
      </div>
    );
  }
};

export default OTPSignInForm;
