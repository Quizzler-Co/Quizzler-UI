import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit3, Trash2, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";

const QuizItem = ({ quiz }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/quiz-form?id=${quiz.id}`);
  };

  const handleView = () => {
    toast.success(`Viewing quiz: ${quiz.title}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      toast.success(`Quiz "${quiz.title}" deleted successfully`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "hard":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "draft":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h4 className="font-semibold text-black text-lg">{quiz.title}</h4>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 border border-gray-200 rounded text-xs">
            {quiz.category}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
              quiz.difficulty
            )}`}
          >
            {quiz.difficulty}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs ${getStatusColor(
              quiz.status
            )}`}
          >
            {quiz.status}
          </span>
          <span className="text-sm text-gray-600">
            {quiz.questions} questions
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">
            {quiz.participants} participants
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleView}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const QuizManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAddQuiz = () => {
    navigate("/quiz-form");
  };

  const mockQuizzes = [
    {
      id: "1",
      title: "General Knowledge",
      category: "Mixed",
      difficulty: "medium",
      questions: 10,
      participants: 1520,
      status: "active",
    },
    {
      id: "2",
      title: "Science & Technology",
      category: "Science",
      difficulty: "hard",
      questions: 15,
      participants: 890,
      status: "active",
    },
    {
      id: "3",
      title: "World History",
      category: "History",
      difficulty: "medium",
      questions: 12,
      participants: 2100,
      status: "draft",
    },
  ];

  const filteredQuizzes = mockQuizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-black">Quiz Management</h2>
          <p className="text-gray-600">Create, edit, and manage quizzes</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleAddQuiz}>
          <Plus className="h-4 w-4" />
          Add Quiz
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search quizzes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {filteredQuizzes.map((quiz) => (
          <QuizItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </Card>
  );
};

export default QuizManagement;
