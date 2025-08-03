import { Clock, Brain, Users, Trophy } from "lucide-react";

const QuizDetailsCard = ({
  totalQuizzes = 12,
  totalQuestions = 156,
  avgTimePerQuestion = 45,
  totalPlayers = 2500,
}) => {
  const statsData = [
    {
      icon: Brain,
      value: totalQuizzes,
      label: "Quiz Categories",
      color: "text-purple-600",
    },
    {
      icon: Trophy,
      value: totalQuestions,
      label: "Total Questions",
      color: "text-yellow-600",
    },
    {
      icon: Clock,
      value: `${Math.round(avgTimePerQuestion)}s`,
      label: "Avg. per Question",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: `~${Math.round(totalPlayers / 1000)}K`,
      label: "Players",
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="group relative bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ease-out"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-full border-2 border-black ${stat.color} bg-white`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stat.value}</p>
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizDetailsCard;
