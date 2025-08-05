import { useState, useRef, useEffect } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const ProfileAvatar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
      >
        <Avatar
          src={user?.avatar}
          alt={user?.name || "User"}
          size="sm"
          className="ring-1 ring-gray-200"
        />
        <span className="hidden sm:block text-sm font-medium text-gray-700 truncate max-w-[100px]">
          {user?.name || "User"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* User Info */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Avatar src={user?.avatar} alt={user?.name || "User"} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700"
              onClick={() => setIsDropdownOpen(false)}
            >
              <UserIcon className="h-4 w-4 text-gray-500" />
              <span>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
