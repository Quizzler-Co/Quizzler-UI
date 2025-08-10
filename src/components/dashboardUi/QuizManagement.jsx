import {
  AlertTriangle,
  Edit3,
  Filter,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../../utils/auth";
import Button from "../ui-components/Button";
import { Card } from "../ui-components/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui-components/Dialog";
import Input from "../ui-components/Input";

const QuizItem = ({ quiz, onQuizDeleted }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/quiz-form?id=${quiz.id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const response = await authenticatedFetch(
        `http://localhost:8086/api/v1/quiz/${quiz.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success(
          data.message || `Quiz "${quiz.title}" deleted successfully`
        );
        // Call the callback to refresh the quiz list
        if (onQuizDeleted) {
          onQuizDeleted(quiz.id);
        }
        setShowDeleteModal(false);
      } else {
        throw new Error(data.message || "Failed to delete quiz");
      }
    } catch (err) {
      console.error("Error deleting quiz:", err);
      toast.error("Failed to delete quiz. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
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
    <>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex-1">
          <h4 className="font-semibold text-black text-lg">{quiz.title}</h4>
          {quiz.description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {quiz.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2 py-1 bg-gray-100 text-gray-800 border border-gray-200 rounded text-xs">
              General
            </span>
            <span
              className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                "medium"
              )}`}
            >
              medium
            </span>
            <span
              className={`px-2 py-1 rounded text-xs ${getStatusColor(
                "active"
              )}`}
            >
              active
            </span>
            <span className="text-sm text-gray-600">
              {quiz.questionIds ? quiz.questionIds.length : 0} questions
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              Created by: {quiz.createdByUserId}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeleteClick}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <div className="p-6">
            <DialogHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle>Delete Quiz</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{quiz.title}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDeleteCancel}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-slate-700"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const QuizManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await authenticatedFetch(
          "http://localhost:8086/api/v1/quiz/"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to fetch quizzes. Please try again.");
        toast.error("Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleAddQuiz = () => {
    navigate("/quiz-form");
  };

  const handleQuizDeleted = (deletedQuizId) => {
    // Remove the deleted quiz from the state
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz.id !== deletedQuizId)
    );
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quiz.description &&
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading quizzes...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </Card>
    );
  }

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
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No quizzes found matching your search."
                : "No quizzes available. Create your first quiz!"}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddQuiz}>
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            )}
          </div>
        ) : (
          filteredQuizzes.map((quiz) => (
            <QuizItem
              key={quiz.id}
              quiz={quiz}
              onQuizDeleted={handleQuizDeleted}
            />
          ))
        )}
      </div>
    </Card>
  );
};

export default QuizManagement;
