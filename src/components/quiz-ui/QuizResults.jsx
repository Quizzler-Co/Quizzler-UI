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
  Code2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui-components/Card";
import Button from "../ui-components/Button";
import Badge from "../ui-components/Badge";
import SubmissionResult from "../SubmissionResult";

const QuizResults = ({ quizData, results, onRetakeQuiz, onGoHome }) => {
  const {
    answers = {}, // legacy local answers: { questionId: optionIndex }
    codingSolutions = {}, // coding question solutions: { questionId: { code, submissionResult } }
    serverAnswers = [], // new backend detailed answers
    timeTaken,
    totalQuestions: localTotalQuestions,
    answeredQuestions: localAnswered,
    serverScore,
    percentage,
    submissionMessage,
  } = results || {};
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

  // Determine answered count including coding solutions
  const codingAnsweredCount = Object.keys(codingSolutions || {}).length;
  const mcqAnsweredCount = serverAnswers.length > 0 ? serverAnswers.length : Object.keys(answers || {}).length;
  const answeredCount = mcqAnsweredCount + codingAnsweredCount;
  const totalQuestions =
    localTotalQuestions || quizData?.questions?.length || 0;

  const getCompletionPercentage = () => {
    if (percentage !== undefined) return Math.round(percentage);
    if (!totalQuestions) return 0;
    return Math.round((answeredCount / totalQuestions) * 100);
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
            {(serverScore !== undefined || percentage !== undefined) && (
              <p className="text-base font-semibold text-blue-700 flex flex-col sm:flex-row items-center justify-center gap-2">
                {serverScore !== undefined && <span>Score: {serverScore}</span>}
                {percentage !== undefined && (
                  <span className="text-sm font-medium text-blue-600">
                    ({getCompletionPercentage()}%)
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {answeredCount}
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
              const isCoding = question.type === "CODING";
              
              // Handle coding questions
              if (isCoding) {
                const solution = codingSolutions[question.id];
                const isAnswered = solution !== undefined;
                const submissionResult = solution?.submissionResult;
                const verdict = submissionResult?.verdict;
                const isAccepted = verdict === "ACCEPTED";

                return (
                  <div
                    key={question.id}
                    className={`border rounded-lg p-4 space-y-3 transition-colors ${
                      isAnswered
                        ? isAccepted
                          ? "border-green-300 bg-green-50"
                          : "border-orange-300 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <span className="font-medium text-gray-900 mr-2 flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Question {index + 1} (Coding)
                          </span>
                          {isAnswered ? (
                            isAccepted ? (
                              <Badge variant="success" size="sm">
                                <CheckCircle className="h-3 w-3 mr-1" /> Accepted
                              </Badge>
                            ) : (
                              <Badge variant="warning" size="sm">
                                <XCircle className="h-3 w-3 mr-1" /> {verdict?.replace("_", " ") || "Not Accepted"}
                              </Badge>
                            )
                          ) : (
                            <Badge variant="secondary" size="sm">
                              <XCircle className="h-3 w-3 mr-1" /> Not Submitted
                            </Badge>
                          )}
                          {question.difficulty && (
                            <Badge variant="outline" size="sm">
                              {question.difficulty}
                            </Badge>
                          )}
                        </div>
                        <div className="text-gray-800 mb-3 leading-relaxed">
                          <p className="font-semibold mb-2">{question.title || "Coding Problem"}</p>
                          {question.description && (
                            <p className="text-sm text-gray-600 mb-2">{question.description}</p>
                          )}
                          {question.methodName && question.returnType && (
                            <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-2">
                              <code>
                                public {question.returnType} {question.methodName}(
                                {question.parameterTypes || "input"} input)
                              </code>
                            </div>
                          )}
                        </div>
                        {isAnswered && (
                          <div className="space-y-3">
                            {submissionResult && (
                              <SubmissionResult result={submissionResult} />
                            )}
                            {solution.code && (
                              <div className="mt-3">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Submitted Code:</p>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                  <pre className="text-xs font-mono whitespace-pre-wrap">
                                    {solution.code}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              // Handle MCQ questions (existing logic)
              const serverEntry = serverAnswers.find(
                (a) => a.questionId === question.id
              );
              const localAnsweredIndex = answers[question.id];
              const submittedAnswerText = serverEntry
                ? serverEntry.submittedAnswer
                : localAnsweredIndex !== undefined
                ? question.options?.[localAnsweredIndex]
                : undefined;
              const correctAnswerText = serverEntry?.correctAnswer;
              const explanation = serverEntry?.explanation;
              const isAnswered = submittedAnswerText !== undefined;
              const isCorrect =
                isAnswered &&
                correctAnswerText !== undefined &&
                submittedAnswerText === correctAnswerText;

              return (
                <div
                  key={question.id}
                  className={`border rounded-lg p-4 space-y-3 transition-colors ${
                    isAnswered
                      ? isCorrect
                        ? "border-green-300 bg-green-50"
                        : "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="font-medium text-gray-900 mr-2">
                          Question {index + 1}
                        </span>
                        {isAnswered ? (
                          isCorrect ? (
                            <Badge variant="success" size="sm">
                              <CheckCircle className="h-3 w-3 mr-1" /> Correct
                            </Badge>
                          ) : (
                            <Badge variant="destructive" size="sm">
                              <XCircle className="h-3 w-3 mr-1" /> Incorrect
                            </Badge>
                          )
                        ) : (
                          <Badge variant="secondary" size="sm">
                            <XCircle className="h-3 w-3 mr-1" /> Skipped
                          </Badge>
                        )}
                        {question.difficulty && (
                          <Badge variant="outline" size="sm">
                            {question.difficulty}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-800 mb-3 leading-relaxed">
                        {question.questionText || question.question}
                      </p>
                      {isAnswered && (
                        <div className="space-y-3">
                          <div
                            className={`p-3 rounded-md text-sm border ${
                              isCorrect
                                ? "bg-green-100 border-green-300 text-green-800"
                                : "bg-red-100 border-red-300 text-red-800"
                            }`}
                          >
                            <p className="font-medium mb-1">
                              Your Answer: {submittedAnswerText}
                            </p>
                            {!isCorrect && correctAnswerText && (
                              <p>
                                Correct Answer:{" "}
                                <span className="font-semibold">
                                  {correctAnswerText}
                                </span>
                              </p>
                            )}
                          </div>
                          {explanation && (
                            <div className="p-3 rounded-md bg-blue-50 border border-blue-200 text-sm text-blue-800">
                              <p className="font-medium mb-1">Explanation</p>
                              <p className="leading-snug">{explanation}</p>
                            </div>
                          )}
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
                text: `I just completed "${quizData.title}" with ${
                  serverScore !== undefined
                    ? serverScore + "/" + totalQuestions + " correct"
                    : getCompletionPercentage() + "%"
                }!`,
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
