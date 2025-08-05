
const Input = ({ className = "", type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-black focus:border-black 
        transition-colors duration-200 ${className}`}
      {...props}
    />
  );
};

export default Input;
