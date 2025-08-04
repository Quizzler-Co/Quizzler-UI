import React, { useState } from "react";

const Tabs = ({ children, defaultValue, className = "", onValueChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange: handleTabChange })
      )}
    </div>
  );
};

const TabsList = ({ children, className = "", activeTab, onTabChange }) => {
  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange })
      )}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  className = "",
  activeTab,
  onTabChange,
}) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
        isActive ? "bg-black text-white" : "text-gray-600 hover:text-black"
      } ${className}`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = "", activeTab }) => {
  if (activeTab !== value) return null;

  return <div className={`mt-4 ${className}`}>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
