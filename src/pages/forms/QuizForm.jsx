import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui-components/Card";
import Button from "../../components/ui-components/Button";
import Input from "../../components/ui-components/Input";
import Label from "../../components/ui-components/Label";
import { QuestionsManager, QuizPreview } from "../../components/forms";
import { Question } from "../../models/Question";
import { QuizAPIService } from "../../services/QuizAPIService";
import { UserService } from "../../services/UserService";

const QuizForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    timePerQuestion: "30",
    description: "",
    questions: [],
  });

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    // Check if we're editing an existing quiz
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      setIsEdit(true);
      setQuizId(id);
      loadQuizData(id);
    }
  }, []);

  const loadQuizData = async (id) => {
    try {
      setLoading(true);
      const response = await QuizAPIService.getQuizById(id);

      if (response.success) {
        const quiz = response.data;
        setFormData({
          title: quiz.title || "",
          category: quiz.category || "",
          difficulty: quiz.difficulty || "",
          timePerQuestion: quiz.timePerQuestion?.toString() || "30",
          description: quiz.description || "",
          questions: quiz.questions || [],
        });
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
      toast.error(`Failed to load quiz: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionsChange = (questions) => {
    setFormData((prev) => ({
      ...prev,
      questions: questions.map((q) => (q.toJSON ? q.toJSON() : q)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a quiz title.");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category.");
      return;
    }

    if (!formData.difficulty) {
      toast.error("Please select a difficulty level.");
      return;
    }

    if (formData.questions.length === 0) {
      toast.error("Please add at least one question to create a quiz.");
      return;
    }

    // Validate questions
    const invalidQuestions = formData.questions.filter((q, index) => {
      const question = Question.fromJSON(q);
      const errors = question.getValidationErrors();
      if (errors.length > 0) {
        toast.error(`Question ${index + 1}: ${errors.join(", ")}`);
        return true;
      }
      return false;
    });

    if (invalidQuestions.length > 0) {
      return;
    }

    try {
      setLoading(true);

      console.log("=== QUIZ FORM SUBMISSION DEBUG ===");
      console.log("Is authenticated:", UserService.isAuthenticated());
      console.log("Form data before submission:", formData);
      console.log("Number of questions:", formData.questions.length);
      console.log("Questions data:", formData.questions);

      let response;
      if (isEdit && quizId) {
        response = await QuizAPIService.updateQuiz(quizId, formData);
        toast.success("Quiz updated successfully!");
      } else {
        console.log("Creating new quiz...");
        response = await QuizAPIService.createQuiz(formData);
        console.log("Quiz creation response:", response);

        // Show success message based on response
        const successMessage =
          response.data?.message || "Quiz created successfully!";
        toast.success(successMessage);
      }

      console.log("Quiz submission response:", response);

      // Navigate back to dashboard after successful submission
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error("=== QUIZ SUBMISSION ERROR ===");
      console.error("Error details:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      toast.error(
        `Failed to ${isEdit ? "update" : "create"} quiz: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2"
              disabled={loading}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black">
                {isEdit ? "Edit Quiz" : "Create New Quiz"}
              </h1>
              <p className="text-gray-600">
                {isEdit
                  ? "Update quiz details and questions"
                  : "Add a new quiz to the platform"}
              </p>
            </div>
          </div>
        </div>

        {loading && isEdit ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <span className="text-gray-600">Loading quiz data...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-black mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter quiz title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                  >
                    <option value="">Select category</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Sports">Sports</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Technology">Technology</option>
                    <option value="Art">Art</option>
                    <option value="Literature">Literature</option>
                    <option value="Mythology">Mythology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Mixed Topics">Mixed Topics</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                  >
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timePerQuestion">
                    Time per Question (seconds)
                  </Label>
                  <Input
                    id="timePerQuestion"
                    name="timePerQuestion"
                    type="number"
                    placeholder="30"
                    value={formData.timePerQuestion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter quiz description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                />
              </div>
            </Card>

            {/* Questions Section */}
            <QuestionsManager
              questions={formData.questions.map((q) => Question.fromJSON(q))}
              onQuestionsChange={handleQuestionsChange}
            />

            {/* Quiz Preview */}
            {formData.questions.length > 0 && (
              <QuizPreview quizData={formData} />
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoBack}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="button" variant="outline" disabled={loading}>
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEdit ? "Update Quiz" : "Create Quiz"}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
