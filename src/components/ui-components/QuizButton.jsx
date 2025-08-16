const QuizButton = ({
  children,
  text,
  className = "",
  size = "md",
  variant = "default",
  onClick,
  disabled = false,
  ...props
}) => {
  // Responsive size utilities: tighter padding on very small screens
  const sizes = {
    sm: "px-3 py-2 text-sm sm:px-4",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-5 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
  };

  const variants = {
    default: {
      base: "bg-white text-black border-2 border-black",
      hover:
        "hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      active:
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    },
    primary: {
      base: "bg-black text-white border-2 border-black",
      hover:
        "hover:bg-white hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      active:
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    },
    success: {
      base: "bg-green-500 text-white border-2 border-green-700",
      hover:
        "hover:bg-green-600 hover:shadow-[2px_2px_0px_0px_rgba(21,128,61,1)]",
      active:
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    },
    danger: {
      base: "bg-red-500 text-white border-2 border-red-700",
      hover:
        "hover:bg-red-600 hover:shadow-[2px_2px_0px_0px_rgba(185,28,28,1)]",
      active:
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    },
    outline: {
      base: "bg-transparent text-black border-2 border-black",
      hover:
        "hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      active:
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <button
      className={`
        ${currentVariant.base}
        ${!disabled && currentVariant.hover}
        ${!disabled && currentVariant.active}
        ${sizes[size]}
        font-bold rounded-lg
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200 ease-out
  flex items-center justify-center gap-2
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        outline-none focus:ring-4 focus:ring-black/20
        transform
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default QuizButton;
