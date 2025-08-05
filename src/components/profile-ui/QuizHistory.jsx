import { Calendar } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui-components/Card";
import { SimpleBadge } from "../ui-components/SimpleBadge";

const QuizHistory = ({ participations, getRankColor }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Calendar className="h-5 w-5" />
          Quiz History
        </CardTitle>
        <CardDescription>
          Your complete quiz participation history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {participations.map((participation, index) => (
            <div
              key={participation.id}
              className={`border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300 hover:scale-[1.01] bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 animate-in slide-in-from-left duration-${
                300 + index * 50
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="font-bold text-lg text-gray-800">
                    {participation.quizTitle}
                  </div>
                  <div className="text-sm text-gray-600">
                    {participation.category}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {participation.score}%
                  </div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <SimpleBadge
                    className={`${getRankColor(
                      participation.rank
                    )} shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105`}
                  >
                    {participation.rank}
                  </SimpleBadge>
                  <div className="text-sm text-gray-600 mt-1">
                    {participation.score}/{participation.totalQuestions} correct
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-800">
                    {participation.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(participation.completedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizHistory;
