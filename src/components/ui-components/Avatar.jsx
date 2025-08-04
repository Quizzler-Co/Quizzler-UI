import { User } from "lucide-react";

const Avatar = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AvatarImage = ({ src, alt = "", className = "", ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  );
};

const AvatarFallback = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 ${className}`}
      {...props}
    >
      {children || <User className="h-4 w-4" />}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback };
