import { Apple, X } from "lucide-react";

const SocialLoginButtons = () => {
  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGithubLogin}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <X className="mr-2 h-4 w-4" />
          X
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
