import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../Dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Tabs";
import EmailSignInForm from "./EmailSignInForm";
import OTPSignInForm from "./OTPSignInForm";
import NewSignUpForm from "./SignUpForm";
import SocialLoginButtons from "./SocialLoginButtons";
import AuthBenefitsCard from "./AuthBenefitsCard";

const NewAuthModal = ({ isOpen, onClose, defaultTab = "signin" }) => {
  const handleEmailSignIn = (data) => {
    console.log("Email sign in:", data);
    onClose();
  };

  const handleOTPSignIn = (data) => {
    console.log("OTP sign in:", data);
    onClose();
  };

  const handleSignUp = (data) => {
    console.log("Sign up:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <span className="mr-2">🧠</span>
              Welcome to QuizMaster
            </DialogTitle>
            <DialogDescription>
              Join thousands of quiz enthusiasts worldwide
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="space-y-4">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="otp">Phone OTP</TabsTrigger>
                </TabsList>

                {/* Email Sign In */}
                <TabsContent value="email" className="space-y-4">
                  <EmailSignInForm onSubmit={handleEmailSignIn} />
                </TabsContent>

                {/* OTP Sign In */}
                <TabsContent value="otp" className="space-y-4">
                  <OTPSignInForm onSubmit={handleOTPSignIn} />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-4">
              <NewSignUpForm onSubmit={handleSignUp} />
            </TabsContent>
          </Tabs>

          {/* Social Login Options */}
          <SocialLoginButtons />

          {/* Benefits */}
          <AuthBenefitsCard />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAuthModal;
