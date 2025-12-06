import { Brain } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";
import EmailSignInForm from "./EmailSignInForm";
import OTPSignInForm from "./OTPSignInForm";
import SignUpForm from "./SignUpForm";

const AuthModal = ({ isOpen, onClose, defaultTab = "signin" }) => {
  const navigate = useNavigate();

  const handleEmailSignIn = (result) => {
    console.log("Email sign in:", result);

    if (result.success) {
      // Login was successful
      console.log("Login successful, token stored");
      toast.success("Logged-in successfully");

      // Close the modal
      onClose();

      // Redirect to quizzes page
      navigate("/quizzes");
    } else {
      // Handle login failure (though this should be handled in the form itself)
      console.error("Login failed:", result);
    }
  };

  const handleOTPSignIn = (data) => {
    console.log("OTP sign in:", data);
    toast.success("Logged-in successfully");
    onClose();
    // Redirect to quizzes page
    navigate("/quizzes");
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
              <span className="mr-2">
                <Brain />
              </span>
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
              <SignUpForm onSubmit={handleSignUp} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
