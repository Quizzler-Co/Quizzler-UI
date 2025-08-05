import { useState } from "react";
import { Brain, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui-components/Button";
import SearchBar from "./ui-components/SearchBar";
import { AuthModal } from "./ui-components/auth";

const NavBar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("signin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //navigation links - data for routing
  const navigationLinks = [
    { href: "/quizzes", label: "Quizzes" },
    { href: "/categories", label: "Categories" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/profile", label: "Profile" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin" },
  ];

  const openSignIn = () => {
    setDefaultTab("signin");
    setIsAuthModalOpen(true);
  };

  const openSignUp = () => {
    setDefaultTab("signup");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <div className="flex h-14 items-center">
          {/* Logo */}
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Quizzler</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex flex-1 items-center justify-center"></div>

          <div className="hidden lg:flex items-center mr-3 ">
            <SearchBar />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2 ">
            <Button text="Sign In" onClick={openSignIn} />
            <Button text="Sign Up" onClick={openSignUp} />
          </div>

          {/* Tablet Actions (md to lg) - Only auth buttons with shorter text */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <Button
              text="Sign In"
              onClick={openSignIn}
              className="text-xs px-2"
            />
            <Button
              text="Sign Up"
              onClick={openSignUp}
              className="text-xs px-2"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Tablet Search Bar - Below main nav */}
        <div className="hidden md:block lg:hidden border-t bg-background">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search */}
              <div className="pt-3 border-t">
                <SearchBar />
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-3 border-t">
                <Button
                  text="Sign In"
                  onClick={() => {
                    openSignIn();
                    closeMobileMenu();
                  }}
                />
                <Button
                  text="Sign Up"
                  onClick={() => {
                    openSignUp();
                    closeMobileMenu();
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultTab={defaultTab}
      />
    </>
  );
};

export default NavBar;
