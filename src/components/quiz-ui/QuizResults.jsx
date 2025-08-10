import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  RotateCcw,
  Home,
  Share2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui-components/Card";
import Button from "../ui-components/Button";
import Badge from "../ui-components/Badge";

const QuizResults = ({ quizData, results, onRetakeQuiz, onGoHome }) => {
  const {
    answers,
    timeTaken,
    totalQuestions,
    answeredQuestions,
    serverScore,
    submissionMessage,
  } = results;
  const navigate = useNavigate();

  // Calculate score (since we don't have correct answers, we'll show stats only)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getCompletionPercentage = () => {
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getPerformanceMessage = () => {
    const completionRate = getCompletionPercentage();

    if (completionRate === 100) {
      return {
        message: "Excellent! You completed all questions!",
        color: "text-green-600",
        icon: Trophy,
      };
    } else if (completionRate >= 80) {
      return {
        message: "Great job! You answered most questions!",
        color: "text-blue-600",
        icon: Target,
      };
    } else if (completionRate >= 60) {
      return {
        message: "Good effort! Consider reviewing the missed questions.",
        color: "text-yellow-600",
        icon: CheckCircle,
      };
    } else {
      return {
        message: "Don't give up! Practice makes perfect.",
        color: "text-orange-600",
        icon: RotateCcw,
      };
    }
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-4 rounded-full">
            <Trophy className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Quiz Completed!</h1>
        <p className="text-gray-600 text-lg">{quizData.title}</p>
      </div>

      {/* Performance Summary */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PerformanceIcon className={`h-6 w-6 ${performance.color}`} />
            <span>Performance Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className={`text-lg font-medium ${performance.color}`}>
              {performance.message}
            </p>
            {submissionMessage && (
              <p className="text-sm text-gray-600">{submissionMessage}</p>
            )}
            {serverScore !== undefined && (
              <p className="text-base font-semibold text-blue-700">
                Score: {serverScore}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {answeredQuestions}
              </div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getCompletionPercentage()}%
              </div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {formatTime(timeTaken)}
              </div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Quiz Progress</span>
              <span>{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizData.questions.map((question, index) => {
              const isAnswered = answers[question.id] !== undefined;
              const selectedOption = answers[question.id];

              return (
                <div
                  key={question.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">
                          Question {index + 1}
                        </span>
                        {isAnswered ? (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Answered
                          </Badge>
                        ) : (
                          <Badge variant="secondary" size="sm">
                            <XCircle className="h-3 w-3 mr-1" />
                            Skipped
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">
                        {question.questionText}
                      </p>

                      {isAnswered && (
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm text-gray-600 mb-1">
                            Your answer:
                          </p>
                          <p className="text-blue-800 font-medium">
                            {question.options[selectedOption]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRetakeQuiz}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Retake Quiz</span>
        </Button>

        <Button
          onClick={onGoHome}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Home className="h-4 w-4" />
          <span>Back to Quizzes</span>
        </Button>

        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `I completed ${quizData.title}!`,
                text: `I just completed "${
                  quizData.title
                }" with ${getCompletionPercentage()}% completion rate!`,
              });
            }
          }}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Results</span>
        </Button>

        <Button
          onClick={() =>
            navigate(`/leaderboard/${quizData.quizId || quizData.id}`)
          }
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Trophy className="h-4 w-4" />
          <span>View Leaderboard</span>
        </Button>
      </div>

      {/* Encouragement Message */}
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Keep Learning! 🎓
        </h3>
        <p className="text-gray-600">
          Every quiz is a step forward in your learning journey.
          {getCompletionPercentage() < 100 &&
            " Try retaking this quiz to improve your score, or "}{" "}
          Check out more quizzes to expand your knowledge!
        </p>
      </div>
    </div>
  );
};

export default QuizResults;
