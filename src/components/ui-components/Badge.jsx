const Badge = ({
  children = "Premium Badge",
  variant = "default",
  size = "md",
}) => {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variants = {
    default: {
      button: `group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] cursor-pointer select-none ${sizes[size]}`,
      text: "relative z-10 font-bold text-black group-hover:text-white transition-colors duration-300 tracking-tight",
    },
    inverted: {
      button: `group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-black hover:bg-white transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] active:shadow-none transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] cursor-pointer select-none ${sizes[size]}`,
      text: "relative z-10 font-bold text-white group-hover:text-black transition-colors duration-300 tracking-tight",
    },
    minimal: {
      button: `group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-black bg-transparent hover:bg-black transition-all duration-250 ease-out cursor-pointer select-none ${sizes[size]}`,
      text: "relative z-10 font-semibold text-black group-hover:text-white transition-colors duration-250",
    },
    outline: {
      button: `group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-black bg-transparent hover:bg-black transition-all duration-400 ease-out cursor-pointer select-none before:absolute before:inset-0 before:translate-x-[-100%] before:bg-black before:transition-transform before:duration-400 hover:before:translate-x-0 ${sizes[size]}`,
      text: "relative z-10 font-bold text-black group-hover:text-white transition-colors duration-400",
    },
    glow: {
      button: `group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] cursor-pointer select-none ${sizes[size]}`,
      text: "relative z-10 font-bold text-black group-hover:text-white transition-colors duration-300 tracking-tight",
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <button className={currentVariant.button}>
      <span className={currentVariant.text}>{children}</span>
    </button>
  );
};

export default Badge;
