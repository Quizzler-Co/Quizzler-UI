import BlogManagement from "./BlogManagement";
import DashboardHeader from "./DashboardHeader";
import DashboardTabs from "./DashboardTabs";
import QuizManagement from "./QuizManagement";
import UserManagement from "./UserManagement";

const Dashboard = () => {
  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case "quizzes":
        return <QuizManagement />;
      case "users":
        return <UserManagement />;
      case "blogs":
        return <BlogManagement />;
      default:
        return <QuizManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />
        <DashboardTabs>{renderTabContent}</DashboardTabs>
      </div>
    </div>
  );
};

export default Dashboard;
