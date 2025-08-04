import { useState } from "react";

const DashboardTabs = ({ children, defaultValue = "quizzes" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabs = [
    { value: "quizzes", label: "Quiz Management" },
    { value: "users", label: "User Management" },
    { value: "blogs", label: "Blog Management" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div>{children(activeTab)}</div>
    </div>
  );
};

export default DashboardTabs;
