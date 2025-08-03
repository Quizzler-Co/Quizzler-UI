import {
  BookOpen,
  Brain,
  Clock,
  Play,
  Star,
  Target,
  Users,
} from "lucide-react";
import { allQuizzes } from "../data/quizData";
import Badge from "./ui-components/Badge";
import QuizButton from "./ui-components/QuizButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui-components/Card";

const Quiz = () => {
  const getDifficultyStats = (quiz) => {
    const difficulties = quiz.questions.map((q) => q.difficulty);
    const easy = difficulties.filter((d) => d === "easy").length;
    const medium = difficulties.filter((d) => d === "medium").length;
    const hard = difficulties.filter((d) => d === "hard").length;
    return { easy, medium, hard };
  };

  const handleStartQuiz = (quizId) => {
    console.log(`Starting quiz: ${quizId}`);
    // Add navigation logic here
  };

  return (
    <div className="space-y-12 p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Brain className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">{allQuizzes.length}</p>
              <p className="text-sm text-gray-600">Quiz Categories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {allQuizzes.reduce(
                  (acc, quiz) => acc + quiz.questions.length,
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
                {allQuizzes
                  .reduce((acc, quiz) => acc + (quiz.totalPlayers || 0), 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Players</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Target className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">4.6</p>
              <p className="text-sm text-gray-600">Avg. Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Quizzes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Quiz Categories</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allQuizzes.map((quiz) => {
            const stats = getDifficultyStats(quiz);
            return (
              <Card key={quiz.id} onClick={() => handleStartQuiz(quiz.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{quiz.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <Badge variant="minimal" className="mt-1">
                          {quiz.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline">{quiz.questions.length}Q</Badge>
                  </div>
                  <CardDescription className="mt-2 text-sm">
                    {quiz.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{quiz.timePerQuestion}s/q</span>
                    </div>
                    {quiz.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{quiz.rating}</span>
                      </div>
                    )}
                    {quiz.totalPlayers && (
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>
                          {quiz.totalPlayers > 1000
                            ? `${Math.floor(quiz.totalPlayers / 1000)}k`
                            : quiz.totalPlayers}
                        </span>
                      </div>
                    )}
                  </div>

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

                  <QuizButton
                    className="w-full"
                    variant="success"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartQuiz(quiz.id);
                    }}
                  >
                    <Play className="h-4 w-4" />
                    Start Quiz
                  </QuizButton>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
