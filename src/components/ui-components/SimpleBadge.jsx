const SimpleBadge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-300",
    primary: "bg-blue-100 text-blue-800 border-blue-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    danger: "bg-red-100 text-red-800 border-red-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
  };

  const variantClasses = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

export { SimpleBadge };
