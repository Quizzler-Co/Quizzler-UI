import {
  Eye,
  Clock,
  Award,
  BarChart3,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card } from "../ui-components/Card";
import Badge from "../ui-components/Badge";
import { getDifficultyColor, getCategoryIcon } from "../../models/Question";
import QuizService from "../../services/QuizService";

const QuizPreview = ({ quizData }) => {
  const preview = QuizService.generateQuizPreview(quizData);
  const { stats, isValid, errors, readyToPublish } = preview;

  const StatCard = ({ icon, label, value, color = "text-blue-600" }) => {
    const IconComponent = icon;
    return (
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-gray-100 ${color}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Quiz Preview
        </h3>
        <div className="flex items-center gap-2">
          {isValid ? (
            <Badge className="bg-green-500 text-white flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Valid
            </Badge>
          ) : (
            <Badge className="bg-red-500 text-white flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Issues Found
            </Badge>
          )}
          {readyToPublish && (
            <Badge className="bg-blue-500 text-white">Ready to Publish</Badge>
          )}
        </div>
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-800">Issues to Fix:</span>
          </div>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz Information */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <h4 className="font-medium mb-3">Quiz Information</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Title:</span>
              <span className="font-medium">
                {quizData.title || "Untitled Quiz"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Category:</span>
              <div className="flex items-center gap-1">
                <span>{getCategoryIcon(quizData.category)}</span>
                <span className="font-medium">
                  {quizData.category || "Not set"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Difficulty:</span>
              {quizData.difficulty ? (
                <Badge className={getDifficultyColor(quizData.difficulty)}>
                  {quizData.difficulty}
                </Badge>
              ) : (
                <span className="text-gray-400">Not set</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time per Question:</span>
              <span className="font-medium">
                {quizData.timePerQuestion || 30}s
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {stats.totalQuestions > 0 && (
          <>
            <div>
              <h4 className="font-medium mb-3">Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  icon={BarChart3}
                  label="Questions"
                  value={stats.totalQuestions}
                  color="text-blue-600"
                />
                <StatCard
                  icon={Award}
                  label="Total Points"
                  value={stats.totalPoints}
                  color="text-purple-600"
                />
                <StatCard
                  icon={Clock}
                  label="Duration"
                  value={`~${stats.estimatedDuration}m`}
                  color="text-green-600"
                />
                <StatCard
                  icon={BarChart3}
                  label="Categories"
                  value={Object.keys(stats.categoryBreakdown).length}
                  color="text-orange-600"
                />
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div>
              <h4 className="font-medium mb-3">Difficulty Distribution</h4>
              <div className="grid grid-cols-3 gap-3">
                <Card className="p-3 text-center">
                  <p className="text-lg font-bold text-green-600">
                    {stats.difficultyBreakdown.easy}
                  </p>
                  <p className="text-xs text-gray-600">Easy</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-lg font-bold text-yellow-600">
                    {stats.difficultyBreakdown.medium}
                  </p>
                  <p className="text-xs text-gray-600">Medium</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-lg font-bold text-red-600">
                    {stats.difficultyBreakdown.hard}
                  </p>
                  <p className="text-xs text-gray-600">Hard</p>
                </Card>
              </div>
            </div>

            {/* Category Breakdown */}
            {Object.keys(stats.categoryBreakdown).length > 1 && (
              <div>
                <h4 className="font-medium mb-3">Category Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(stats.categoryBreakdown).map(
                    ([category, count]) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <span>{getCategoryIcon(category)}</span>
                          <span className="text-sm font-medium">
                            {category}
                          </span>
                        </div>
                        <Badge size="sm" variant="outline">
                          {count}
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Recommendations */}
        {stats.totalQuestions > 0 && (
          <div>
            <h4 className="font-medium mb-3">Recommendations</h4>
            <div className="space-y-2">
              {stats.totalQuestions < 5 && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">
                      Consider adding more questions
                    </p>
                    <p className="text-yellow-700">
                      Quizzes with 5+ questions provide better engagement.
                    </p>
                  </div>
                </div>
              )}

              {stats.difficultyBreakdown.easy === stats.totalQuestions &&
                stats.totalQuestions > 3 && (
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800">
                        Mix difficulty levels
                      </p>
                      <p className="text-blue-700">
                        Adding medium/hard questions creates better challenge
                        progression.
                      </p>
                    </div>
                  </div>
                )}

              {Object.keys(stats.categoryBreakdown).length === 1 &&
                quizData.category === "mixed" && (
                  <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded">
                    <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-purple-800">
                        Add variety for mixed category
                      </p>
                      <p className="text-purple-700">
                        Mixed quizzes work best with questions from different
                        categories.
                      </p>
                    </div>
                  </div>
                )}

              {readyToPublish && (
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800">
                      Ready to publish!
                    </p>
                    <p className="text-green-700">
                      Your quiz looks great and is ready for players.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizPreview;
