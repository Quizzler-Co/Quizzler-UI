import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui-components/Card";
import Button from "../../components/ui-components/Button";
import Input from "../../components/ui-components/Input";
import Label from "../../components/ui-components/Label";

const QuizForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    timePerQuestion: "",
    description: "",
    questions: [],
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Check if we're editing an existing quiz
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get("id");

    if (quizId) {
      setIsEdit(true);
      // In a real app, you'd fetch the quiz data here
      // For now, we'll just show it's in edit mode
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically send the data to your backend
    toast.success(
      isEdit ? "Quiz updated successfully!" : "Quiz created successfully!"
    );
    setTimeout(() => navigate("/admin"), 1500); // Navigate back after showing toast
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
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="mixed">Mixed</option>
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
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
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
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Questions</h2>
              <Button type="button" variant="outline">
                Add Question
              </Button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p>
                No questions added yet. Click "Add Question" to get started.
              </p>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isEdit ? "Update Quiz" : "Create Quiz"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
