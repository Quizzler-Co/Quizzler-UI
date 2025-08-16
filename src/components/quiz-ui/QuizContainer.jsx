import React, { useState, useEffect, useCallback } from "react";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import QuizPlay from "./QuizPlay";
import QuizResults from "./QuizResults";
import Button from "../ui-components/Button";
import { UserService } from "../../services/UserService";

const QuizContainer = ({ quizId, onBackToQuizzes }) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("loading"); // loading, quiz, results
  const [quizResults, setQuizResults] = useState(null);
  const [participationData, setParticipationData] = useState(null);

  const createParticipation = useCallback(async () => {
    try {
      const token = UserService.getAuthToken();

      const response = await fetch(
        `http://localhost:8086/api/v1/participation/quiz/${quizId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create participation: ${response.status}`);
      }

      const participationResponse = await response.json();
      console.log("Participation created:", participationResponse);
      setParticipationData(participationResponse);
      return participationResponse;
    } catch (err) {
      console.error("Error creating participation:", err);
      throw err;
    }
  }, [quizId]);

  const fetchQuizWithQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = UserService.getAuthToken();

      // First, create participation
      await createParticipation();

      // Then fetch quiz data
      const response = await fetch(
        `http://localhost:8086/api/v1/quiz/with-questions/${quizId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: ${response.status}`);
      }

      const data = await response.json();
      setQuizData(data);
      setCurrentView("quiz");
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError(err.message);
      setCurrentView("error");
    } finally {
      setLoading(false);
    }
  }, [quizId, createParticipation]);

  useEffect(() => {
    if (quizId) {
      fetchQuizWithQuestions();
    }
  }, [quizId, fetchQuizWithQuestions]);

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentView("results");

    // Optional: Submit results to backend
    submitQuizResults(results);
  };

  const submitQuizResults = async (results) => {
    try {
      if (!participationData?.participationId) {
        console.warn("No participation ID available for submission");
        return;
      }

      const token = UserService.getAuthToken();
      // Build answers array with actual selected option text (backend expects selectedOption string)
      const answersArray = Object.entries(results.answers).map(
        ([questionId, answerIndex]) => {
          const question = quizData?.questions?.find(
            (q) => q.id === questionId
          );
          const selectedOptionValue = question?.options?.[answerIndex];
          return {
            questionId,
            // Fallback to index if option text missing
            selectedOption: selectedOptionValue ?? String(answerIndex),
          };
        }
      );

      const submissionPayload = { answers: answersArray };

      const response = await fetch(
        `http://localhost:8086/api/v1/participation/${participationData.participationId}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionPayload),
        }
      );

      if (!response.ok) {
        console.warn("Failed to submit quiz results:", response.status);
        return;
      }

      let submissionResult;
      const contentType = response.headers.get("content-type") || "";
      try {
        if (contentType.includes("application/json")) {
          submissionResult = await response.json();
        } else {
          const text = await response.text();
          submissionResult = { message: text };
        }
      } catch {
        submissionResult = { message: "Quiz submitted" };
      }

      // Normalize new backend response shape:
      // {
      //   participantId, answers:[{questionId, submittedAnswer, correctAnswer, explanation}],
      //   score, totalQuestions, percentage
      // }
      const {
        answers: serverAnswers,
        score: serverScore,
        totalQuestions: serverTotalQuestions,
        percentage,
      } = submissionResult || {};

      setQuizResults((prev) => ({
        ...prev,
        serverScore: serverScore ?? prev?.serverScore,
        percentage: percentage ?? prev?.percentage,
        totalQuestions: serverTotalQuestions ?? prev?.totalQuestions,
        serverAnswers: Array.isArray(serverAnswers)
          ? serverAnswers
          : prev?.serverAnswers,
        submissionMessage: submissionResult.message || prev?.submissionMessage,
        submissionId: participationData.participationId,
      }));
    } catch (err) {
      console.warn("Error submitting quiz results:", err);
      // Don't show error to user as this is optional
    }
  };

  const handleQuizExit = () => {
    setCurrentView("loading");
    onBackToQuizzes();
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setParticipationData(null); // Clear previous participation
    setCurrentView("quiz");
    // Reset quiz state by re-fetching and creating new participation
    fetchQuizWithQuestions();
  };

  const handleGoHome = () => {
    onBackToQuizzes();
  };

  // Loading state
  if (loading || currentView === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Loading Quiz...</h3>
          <p className="text-gray-600 mt-1">Preparing your quiz experience</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || currentView === "error") {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Failed to Load Quiz
          </h3>
          <p className="text-red-600 mb-4">
            {error || "Something went wrong while loading the quiz."}
          </p>
          <div className="space-y-2">
            <Button onClick={fetchQuizWithQuestions} className="w-full">
              Try Again
            </Button>
            <Button
              onClick={onBackToQuizzes}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Quizzes</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz playing state
  if (currentView === "quiz" && quizData) {
    return (
      <QuizPlay
        quizData={quizData}
        participationData={participationData}
        onQuizComplete={handleQuizComplete}
        onQuizExit={handleQuizExit}
      />
    );
  }

  // Results state
  if (currentView === "results" && quizResults && quizData) {
    return (
      <QuizResults
        quizData={quizData}
        results={quizResults}
        onRetakeQuiz={handleRetakeQuiz}
        onGoHome={handleGoHome}
      />
    );
  }

  // Fallback
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Something went wrong
        </h3>
        <Button onClick={onBackToQuizzes} variant="outline">
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
};

export default QuizContainer;
