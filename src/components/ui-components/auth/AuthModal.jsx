import { useState } from "react";
import CompactSignInForm from "./CompactSignInForm";
import CompactSignUpForm from "./CompactSignUpForm";
import SocialLogin from "./SocialLogin";

const AuthModal = ({ isOpen, onClose, defaultTab = "signin" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">🧠</span>
            </div>
            <h2 className="text-xl font-semibold text-black">
              Welcome to QuizMaster
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "signin"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "signup"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "signin" && <CompactSignInForm onClose={onClose} />}
          {activeTab === "signup" && <CompactSignUpForm onClose={onClose} />}

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
