import React from "react";
import {
  Clock,
  Users,
  BookOpen,
  Calendar,
  Target,
  AlertCircle,
  Play,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui-components/Card";
import Button from "../ui-components/Button";
import Badge from "../ui-components/Badge";
import { Dialog } from "../ui-components/Dialog";

const QuizPreviewCard = ({ quiz, onStartQuiz, onClose, isOpen }) => {
  const getQuizStatus = (quiz) => {
    const now = new Date();
    const startTime = quiz.startTime ? new Date(quiz.startTime) : null;
    const endTime = quiz.endTime ? new Date(quiz.endTime) : null;

    if (startTime && now < startTime) return "upcoming";
    if (endTime && now > endTime) return "ended";
    return "active";
  };

  const isQuizActive = (quiz) => {
    const status = getQuizStatus(quiz);
    return status === "active";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const status = getQuizStatus(quiz);
  const isActive = isQuizActive(quiz);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-6xl">📝</div>
            <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
            <Badge
              variant={
                status === "active"
                  ? "success"
                  : status === "upcoming"
                  ? "warning"
                  : "secondary"
              }
              className="text-sm"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          {/* Description */}
          {quiz.description && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 text-center leading-relaxed">
                {quiz.description}
              </p>
            </div>
          )}

          {/* Quiz Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {quiz.questionIds?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>

            {quiz.timePerQuestion > 0 && (
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  {quiz.timePerQuestion}s
                </div>
                <div className="text-sm text-gray-600">Per Question</div>
              </div>
            )}

            {quiz.category && (
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-600">
                  {quiz.category}
                </div>
                <div className="text-sm text-gray-600">Category</div>
              </div>
            )}

            {quiz.difficulty && (
              <div
                className={`rounded-lg p-4 text-center ${
                  quiz.difficulty === "easy"
                    ? "bg-green-50"
                    : quiz.difficulty === "medium"
                    ? "bg-yellow-50"
                    : "bg-red-50"
                }`}
              >
                <Target
                  className={`h-8 w-8 mx-auto mb-2 ${
                    quiz.difficulty === "easy"
                      ? "text-green-600"
                      : quiz.difficulty === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                />
                <div
                  className={`text-lg font-bold capitalize ${
                    quiz.difficulty === "easy"
                      ? "text-green-600"
                      : quiz.difficulty === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {quiz.difficulty}
                </div>
                <div className="text-sm text-gray-600">Difficulty</div>
              </div>
            )}
          </div>

          {/* Time Information */}
          {(quiz.startTime || quiz.endTime) && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="font-medium text-gray-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </h3>
              {quiz.startTime && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Starts:</span>{" "}
                  {formatDate(quiz.startTime)}
                </div>
              )}
              {quiz.endTime && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Ends:</span>{" "}
                  {formatDate(quiz.endTime)}
                </div>
              )}
            </div>
          )}

          {/* Instructions/Rules */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Instructions
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Read each question carefully before answering</li>
              <li>• You can navigate between questions freely</li>
              <li>• Make sure to submit your quiz when complete</li>
              {quiz.timePerQuestion > 0 && (
                <li>• Each question has a time limit</li>
              )}
            </ul>
          </div>

          {/* Status Warning */}
          {!isActive && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">
                    {status === "upcoming" ? "Quiz Not Started" : "Quiz Ended"}
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    {status === "upcoming"
                      ? "This quiz will be available soon. Check back later!"
                      : "This quiz is no longer accepting submissions."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
            <Button
              onClick={() => onStartQuiz(quiz.id)}
              disabled={!isActive}
              className={`flex-1 flex items-center justify-center space-x-2 ${
                isActive
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <Play className="h-4 w-4" />
              <span>
                {status === "upcoming"
                  ? "Coming Soon"
                  : status === "ended"
                  ? "Quiz Ended"
                  : "Start Quiz"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default QuizPreviewCard;
