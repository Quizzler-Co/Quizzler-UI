import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Flag,
  RotateCcw,
  Trophy,
  AlertCircle,
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

const QuizPlay = ({ quizData, onQuizComplete, onQuizExit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [startTime] = useState(new Date());

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handleSubmitQuiz = useCallback(() => {
    setIsSubmitted(true);
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const results = {
      answers,
      timeTaken,
      totalQuestions,
      answeredQuestions: Object.keys(answers).length,
      quizId: quizData.quizId,
    };

    onQuizComplete(results);
  }, [answers, totalQuestions, quizData.quizId, startTime, onQuizComplete]);

  // Timer logic
  useEffect(() => {
    if (quizData.timePerQuestion > 0 && !isSubmitted) {
      setTimeRemaining(quizData.timePerQuestion);

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-move to next question when time runs out
            if (!isLastQuestion) {
              handleNext();
            } else {
              handleSubmitQuiz();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [
    currentQuestionIndex,
    quizData.timePerQuestion,
    isSubmitted,
    isLastQuestion,
    handleNext,
    handleSubmitQuiz,
  ]);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleExitQuiz = () => {
    setShowExitDialog(false);
    onQuizExit();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Questions Available
          </h3>
          <p className="text-gray-600 mb-4">
            This quiz doesn't have any questions yet.
          </p>
          <Button onClick={onQuizExit} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {quizData.title}
            </h1>
            {quizData.description && (
              <p className="text-gray-600 mt-1">{quizData.description}</p>
            )}
          </div>
          <Button
            onClick={() => setShowExitDialog(true)}
            variant="outline"
            size="sm"
          >
            Exit Quiz
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span>{getAnsweredCount()} answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        {quizData.timePerQuestion > 0 && timeRemaining !== null && (
          <div className="flex items-center justify-center mt-4">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                timeRemaining <= 10
                  ? "bg-red-100 text-red-700"
                  : timeRemaining <= 30
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Question Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Question {currentQuestionIndex + 1}</span>
            <div className="flex space-x-2">
              {currentQuestion.difficulty && (
                <Badge
                  variant={
                    currentQuestion.difficulty === "easy"
                      ? "success"
                      : currentQuestion.difficulty === "medium"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {currentQuestion.difficulty}
                </Badge>
              )}
              {currentQuestion.category && (
                <Badge variant="outline">{currentQuestion.category}</Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg text-gray-900 leading-relaxed">
            {currentQuestion.questionText}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="flex-1 text-base">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex space-x-2">
          {isLastQuestion ? (
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <Trophy className="h-4 w-4" />
              <span>Submit Quiz</span>
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {quizData.questions.map((_, index) => {
              const isAnswered =
                answers[quizData.questions[index].id] !== undefined;
              const isCurrent = index === currentQuestionIndex;

              return (
                <button
                  key={index}
                  onClick={() => handleQuestionJump(index)}
                  className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                    isCurrent
                      ? "border-blue-500 bg-blue-500 text-white"
                      : isAnswered
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Exit Quiz?</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to exit? Your progress will be lost.
          </p>
          <div className="flex space-x-3 justify-end">
            <Button onClick={() => setShowExitDialog(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleExitQuiz} variant="destructive">
              Exit Quiz
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Submit Quiz?
          </h3>
          <div className="space-y-3 mb-6">
            <p className="text-gray-600">
              You have answered {getAnsweredCount()} out of {totalQuestions}{" "}
              questions.
            </p>
            {getAnsweredCount() < totalQuestions && (
              <p className="text-orange-600 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>
                  {totalQuestions - getAnsweredCount()} questions are
                  unanswered.
                </span>
              </p>
            )}
            <p className="text-gray-600">
              Once submitted, you cannot change your answers.
            </p>
          </div>
          <div className="flex space-x-3 justify-end">
            <Button
              onClick={() => setShowSubmitDialog(false)}
              variant="outline"
            >
              Review Answers
            </Button>
            <Button
              onClick={handleSubmitQuiz}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Quiz
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default QuizPlay;
