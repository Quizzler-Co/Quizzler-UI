import {
  BookOpen,
  Brain,
  Clock,
  Loader2,
  Play,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { API_BASE_URL } from "../config/api";
import { QuizContainer, QuizPreviewCard } from "./quiz-ui";
import Badge from "./ui-components/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui-components/Card";
import QuizButton from "./ui-components/QuizButton";
import { AuthModal } from "./ui-components/auth";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handler to open auth modal
  const handleOpenAuthModal = () => {
    console.log("handleOpenAuthModal called");
    setIsAuthModalOpen(true);
    console.log("isAuthModalOpen set to true");
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const token = UserService.getAuthToken();

      // Check if user is logged in
      if (!token) {
        setError("Please log in to view quizzes");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/quiz/`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          setError("Please log in to view quizzes");
          // Clear invalid token
          UserService.logout();
          setIsAuthModalOpen(true);
          return;
        }
        
        // Handle 500 errors - might be authentication related
        if (response.status === 500) {
          // Try to parse error message to see if it's auth-related
          try {
            const errorData = await response.json();
            if (errorData.message && (
              errorData.message.toLowerCase().includes("unauthorized") ||
              errorData.message.toLowerCase().includes("authentication") ||
              errorData.message.toLowerCase().includes("token")
            )) {
              setError("Please log in to view quizzes");
              UserService.logout();
              setIsAuthModalOpen(true);
              return;
            }
          } catch (e) {
            // If we can't parse, show generic message
          }
          setError("Unable to load quizzes. Please try again later.");
        } else {
          setError(`Failed to load quizzes. Please try again.`);
        }
        return;
      }

      const data = await response.json();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      // Check if it's a network error or auth-related
      if (err.message.includes("401") || err.message.includes("403") || err.message.includes("Unauthorized")) {
        setError("Please log in to view quizzes");
        UserService.logout();
        setIsAuthModalOpen(true);
      } else {
        setError("Unable to load quizzes. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyStats = () => {
    // Since we only have questionIds in QuizDTO, we'll need to fetch question details
    // For now, returning default stats
    return { easy: 0, medium: 0, hard: 0 };
  };

  const handleStartQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setPreviewQuiz(null); // Close preview if open
  };

  const handlePreviewQuiz = (quiz) => {
    setPreviewQuiz(quiz);
  };

  const handleClosePreview = () => {
    setPreviewQuiz(null);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuizId(null);
  };

  // If a quiz is selected, show the quiz play interface
  if (selectedQuizId) {
    return (
      <QuizContainer
        quizId={selectedQuizId}
        onBackToQuizzes={handleBackToQuizzes}
      />
    );
  }

  const isQuizActive = (quiz) => {
    const now = new Date();
    const startTime = quiz.startTime ? new Date(quiz.startTime) : null;
    const endTime = quiz.endTime ? new Date(quiz.endTime) : null;

    if (startTime && now < startTime) return false; // Quiz hasn't started
    if (endTime && now > endTime) return false; // Quiz has ended
    return true; // Quiz is active
  };

  const getQuizStatus = (quiz) => {
    const now = new Date();
    const startTime = quiz.startTime ? new Date(quiz.startTime) : null;
    const endTime = quiz.endTime ? new Date(quiz.endTime) : null;

    if (startTime && now < startTime) return "upcoming";
    if (endTime && now > endTime) return "ended";
    return "active";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Loading quizzes...</span>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes("log in") || error.includes("Please log in");
    
    return (
      <>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md mx-auto">
            <h3 className="text-red-800 font-medium text-lg mb-2">
              {isAuthError ? "Authentication Required" : "Error Loading Quizzes"}
            </h3>
            <p className="text-red-600 mt-1 mb-4">{error}</p>
            <div className="flex gap-3">
            {isAuthError ? (
              <button
                type="button"
                onClick={handleOpenAuthModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Go to Login
              </button>
            ) : (
                <button
                  onClick={fetchQuizzes}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              {!isAuthError && (
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Go Home
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Auth Modal - needed here for error state */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => {
            console.log("Closing auth modal");
            setIsAuthModalOpen(false);
          }}
          defaultTab="signin"
        />
      </>
    );
  }

  return (
    <div className="space-y-12 p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Brain className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">{quizzes.length}</p>
              <p className="text-sm text-gray-600">Total Quizzes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {quizzes.reduce(
                  (acc, quiz) => acc + (quiz.questionIds?.length || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {quizzes.filter((quiz) => isQuizActive(quiz)).length}
              </p>
              <p className="text-sm text-gray-600">Active Quizzes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Target className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {
                  quizzes.filter((quiz) => getQuizStatus(quiz) === "upcoming")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Quizzes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Quizzes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const stats = getDifficultyStats();
            const status = getQuizStatus(quiz);
            const isActive = isQuizActive(quiz);

            return (
              <Card
                key={quiz.id}
                className="transition-all duration-200 hover:shadow-lg cursor-pointer"
                onClick={() => handlePreviewQuiz(quiz)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📝</span>
                      <div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <Badge
                          variant={
                            status === "active"
                              ? "success"
                              : status === "upcoming"
                              ? "warning"
                              : "secondary"
                          }
                          className="mt-1"
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {quiz.questionIds?.length || 0}Q
                    </Badge>
                  </div>
                  <CardDescription className="mt-2 text-sm">
                    {quiz.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    {quiz.startTime && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>
                          {status === "upcoming"
                            ? `Starts: ${new Date(
                                quiz.startTime
                              ).toLocaleDateString()}`
                            : status === "ended"
                            ? `Ended: ${new Date(
                                quiz.endTime
                              ).toLocaleDateString()}`
                            : "Active"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Difficulty stats - will be empty until we fetch question details */}
                  <div className="flex items-center space-x-1 text-xs">
                    {stats.easy > 0 && <Badge size="sm">E:{stats.easy}</Badge>}
                    {stats.medium > 0 && (
                      <Badge size="sm" variant="inverted">
                        M:{stats.medium}
                      </Badge>
                    )}
                    {stats.hard > 0 && (
                      <Badge size="sm" variant="outline">
                        H:{stats.hard}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 w-full min-w-0">
                    <QuizButton
                      className="flex-1 w-full min-w-0"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviewQuiz(quiz);
                      }}
                    >
                      <span className="text-[10px] sm:text-xs md:text-sm">
                        Preview
                      </span>
                    </QuizButton>
                    <QuizButton
                      className="flex-1 w-full min-w-0"
                      variant={isActive ? "success" : "secondary"}
                      size="sm"
                      disabled={!isActive}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) handleStartQuiz(quiz.id);
                      }}
                    >
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                        {status === "upcoming"
                          ? "Coming Soon"
                          : status === "ended"
                          ? "Quiz Ended"
                          : "Start Quiz"}
                      </span>
                    </QuizButton>
                    <QuizButton
                      className="flex-1 w-full min-w-0"
                      variant="outline"
                      size="sm"
                      aria-label="Leaderboard"
                      title="Leaderboard"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/leaderboard/${quiz.id}`);
                      }}
                    >
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                        Leaderboard
                      </span>
                    </QuizButton>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No quizzes available
            </h3>
            <p className="text-gray-500">Check back later for new quizzes!</p>
          </div>
        )}
      </div>

      {/* Quiz Preview Dialog */}
      {previewQuiz && (
        <QuizPreviewCard
          quiz={previewQuiz}
          isOpen={!!previewQuiz}
          onStartQuiz={handleStartQuiz}
          onClose={handleClosePreview}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signin"
      />
    </div>
  );
};

export default Quiz;
