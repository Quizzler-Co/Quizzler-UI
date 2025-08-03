const Card = ({ children, className = "", onClick, ...props }) => {
  return (
    <div
      className={`
        bg-white border-2 border-black rounded-lg 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
        hover:translate-x-[2px] hover:translate-y-[2px] 
        transition-all duration-200 ease-out
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-3 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-bold text-black ${className}`}>{children}</h3>
  );
};

const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
  );
};

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
