import { Users, Brain, FileText, TrendingUp } from "lucide-react";
import { Card } from "../ui-components/Card";

const StatsCard = ({ title, value, icon: Icon, change, changeText }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        <span className="text-green-600">{change}</span> {changeText}
      </p>
    </Card>
  );
};

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Users",
      value: "50,247",
      icon: Users,
      change: "+12%",
      changeText: "from last month",
    },
    {
      title: "Total Quizzes",
      value: "1,234",
      icon: Brain,
      change: "+8%",
      changeText: "from last month",
    },
    {
      title: "Blog Posts",
      value: "89",
      icon: FileText,
      change: "+5%",
      changeText: "from last month",
    },
    {
      title: "Active Users",
      value: "12,450",
      icon: TrendingUp,
      change: "+15%",
      changeText: "from last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsOverview;
