import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({ children, defaultValue, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );

  // Update selected value when value prop changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setIsOpen(false);
  };

  // Get display text for selected value
  const getDisplayText = () => {
    if (!selectedValue) return "Select...";

    let displayText = selectedValue;
    React.Children.forEach(children, (child) => {
      if (child.type === SelectContent) {
        React.Children.forEach(child.props.children, (item) => {
          if (item.type === SelectItem && item.props.value === selectedValue) {
            displayText = item.props.children;
          }
        });
      }
    });
    return displayText;
  };

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            selectedValue: getDisplayText(),
            isOpen,
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onValueChange: handleValueChange,
            selectedValue,
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ onClick, selectedValue, isOpen, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span>{selectedValue || "Select..."}</span>
      <ChevronDown
        className={`h-4 w-4 opacity-50 transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const SelectValue = ({ placeholder = "Select..." }) => {
  return <span>{placeholder}</span>;
};

const SelectContent = ({ children, isOpen, onValueChange, selectedValue }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md animate-in fade-in-0 zoom-in-95 top-full mt-1">
      <div className="p-1">
        {React.Children.map(children, (child) => {
          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              onSelect: onValueChange,
              isSelected: child.props.value === selectedValue,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

const SelectItem = ({
  children,
  value,
  onSelect,
  isSelected,
  className = "",
}) => {
  return (
    <div
      onClick={() => onSelect(value)}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
        isSelected ? "bg-gray-100" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
