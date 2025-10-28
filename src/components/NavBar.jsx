import { useState, useEffect } from "react";
import { Brain, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui-components/Button";
import SearchBar from "./ui-components/SearchBar";
import ProfileAvatar from "./ui-components/ProfileAvatar";
import { AuthModal } from "./ui-components/auth";
import { isAuthenticated, logout } from "../utils/auth";
import { UserService } from "../services/UserService";

const NavBar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("signin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Helper function to extract role from JWT token
  const getUserRole = () => {
    const token = UserService.getAuthToken();
    if (!token) return null;

    try {
      // Extract token part (remove "Bearer " prefix if present)
      const actualToken = token.includes("Bearer ") ? token.split(" ")[1] : token;
      
      // Decode JWT (base64)
      const base64Url = actualToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      return payload.role || null;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  // Check authentication status on component mount and when auth modal closes
  useEffect(() => {
    const checkAuthAndUser = async () => {
      const authStatus = isAuthenticated();
      setIsUserAuthenticated(authStatus);

      if (authStatus) {
        // Extract role from JWT token
        const role = getUserRole();
        setUserRole(role);

        // First try to get cached user data (synchronous)
        const cachedUser = UserService.getCachedUser();
        if (cachedUser) {
          setCurrentUser(cachedUser);
        } else {
          // If no cached data, fetch from API (asynchronous)
          try {
            const userData = await UserService.getCurrentUser();
            setCurrentUser(userData);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setCurrentUser(null);
          }
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    };

    checkAuthAndUser();
  }, [isAuthModalOpen]);

  //navigation links - data for routing
  const navigationLinks = [
    { href: "/quizzes", label: "Quizzes" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin", adminOnly: true },
  ];

  // Filter navigation links based on user role
  const getFilteredNavigationLinks = () => {
    return navigationLinks.filter(link => {
      if (link.adminOnly) {
        return userRole === "ROLE_ADMIN";
      }
      return true;
    });
  };

  const filteredLinks = getFilteredNavigationLinks();

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

  const handleLogout = () => {
    logout();
    UserService.logout(); // Also clear user data from UserService
    setIsUserAuthenticated(false);
    setCurrentUser(null);
    setUserRole(null);
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg sm:text-xl">Quizzler</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <SearchBar />
            {isUserAuthenticated ? (
              <ProfileAvatar user={currentUser} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-3 w-55">
                <Button
                  text="Sign In"
                  onClick={openSignIn}
                  variant="outline"
                  size="sm"
                />
                <Button
                  text="Sign Up"
                  onClick={openSignUp}
                  variant="outline"
                  size="sm"
                />
              </div>
            )}
          </div>

          {/* Tablet Actions (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {isUserAuthenticated ? (
              <ProfileAvatar user={currentUser} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  text="Sign In"
                  onClick={openSignIn}
                  className="text-sm px-3"
                />
                <Button
                  text="Sign Up"
                  onClick={openSignUp}
                  className="text-sm px-3"
                />
              </div>
            )}
          </div>

          {/* Mobile: Profile or Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {isUserAuthenticated && (
              <ProfileAvatar user={currentUser} onLogout={handleLogout} />
            )}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
        </div>

        {/* Tablet Search Bar - Below main nav */}
        <div className="hidden md:block lg:hidden border-t bg-gray-50/50">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-1">
                {filteredLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block py-3 px-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search */}
              <div className="pt-3 border-t border-gray-100">
                <SearchBar />
              </div>

              {/* Mobile Auth Section */}
              {!isUserAuthenticated && (
                <div className="pt-3 border-t border-gray-100">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Account
                    </p>
                    <div className="space-y-2">
                      <Button
                        text="Sign In"
                        onClick={() => {
                          openSignIn();
                          closeMobileMenu();
                        }}
                        variant="outline"
                        className="w-full"
                      />
                      <Button
                        text="Sign Up"
                        onClick={() => {
                          openSignUp();
                          closeMobileMenu();
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile User Info (when authenticated) */}
              {isUserAuthenticated && (
                <div className="pt-3 border-t border-gray-100">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Account
                    </p>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {currentUser?.name || "User"}
                        </p>
                        <p className="text-gray-500">
                          {currentUser?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                    <Button
                      text="Sign Out"
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              )}
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
