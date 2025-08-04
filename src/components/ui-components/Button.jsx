//

const Button = ({
  text,
  children,
  className = "",
  onClick,
  variant = "default",
  size = "default",
  ...props
}) => {
  // Support both text prop and children
  const content = text || children;

  // Variant styles
  const variants = {
    default: "bg-white text-black border-black",
    outline: "bg-transparent text-black border-black hover:bg-gray-50",
  };

  // Size styles
  const sizes = {
    default: "px-2.5 py-1",
    sm: "px-2 py-0.5 text-sm",
  };

  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;

  return (
    <>
      <button
        className={`${variantClasses} border border-b-4 font-medium overflow-hidden relative ${sizeClasses} rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group ${className}`}
        onClick={onClick}
        {...props}
      >
        <span className="bg-black shadow-black absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        {content}
      </button>
    </>
  );
};

export default Button;
