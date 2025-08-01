import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full">
      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4 max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-black">
                Ready to Test Your Knowledge?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 text-lg md:text-xl leading-relaxed">
                Join thousands of quiz enthusiasts and start your learning
                journey today!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <button className="w-full sm:w-auto group relative inline-flex items-center justify-center h-12 px-8 overflow-hidden rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] cursor-pointer select-none font-bold text-black group-hover:text-white tracking-tight">
                <Brain className="mr-2 h-4 w-4 flex-shrink-0" />
                Start Your First Quiz
              </button>
              <button className="w-full sm:w-auto group relative inline-flex items-center justify-center h-12 px-8 overflow-hidden rounded-full border-2 border-black bg-transparent hover:bg-black transition-all duration-300 ease-out cursor-pointer select-none font-semibold text-black group-hover:text-white">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-black" />
              <span className="font-bold text-xl text-black">Quizzler</span>
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-600">
                © 2025 Quizzler. All rights reserved.
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
              <Link
                to="https://github.com/Quizzler-Co/Quizzler"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
              >
                Terms of Service
              </Link>
              <Link
                to="https://github.com/Quizzler-Co/Quizzler"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <Link
                to="https://github.com/Quizzler-Co/Quizzler"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
              >
                Contact Us
              </Link>
              <Link
                to="https://github.com/Quizzler-Co/Quizzler"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
              >
                Help Center
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
