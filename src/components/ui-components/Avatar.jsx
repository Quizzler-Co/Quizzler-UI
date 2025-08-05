import { User } from "lucide-react";

const Avatar = ({ src, alt = "", size = "md", className = "", ...props }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div
      className={`relative flex shrink-0 overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <User className="h-3 w-3 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
