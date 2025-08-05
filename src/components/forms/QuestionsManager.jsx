import { useState } from "react";
import { Plus, Edit3, Trash2, Eye, Search, Filter, Copy } from "lucide-react";
import { Card } from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import Badge from "../ui-components/Badge";
import QuestionForm from "./QuestionForm";
import {
  Question,
  getDifficultyColor,
  getCategoryIcon,
} from "../../models/Question";

const QuestionItem = ({ question, onEdit, onDelete, onDuplicate, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-gray-500">
              Q{index + 1}
            </span>
            <span className="text-sm">
              {getCategoryIcon(question.category)}
            </span>
            <Badge
              size="sm"
              className={getDifficultyColor(question.difficulty)}
            >
              {question.difficulty}
            </Badge>
            <Badge size="sm" variant="outline">
              {question.points} pt{question.points !== 1 ? "s" : ""}
            </Badge>
          </div>

          <h4
            className="font-medium text-gray-900 mb-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {question.question}
          </h4>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{question.options.length} options</span>
            <span>{question.timeLimit}s limit</span>
            {question.explanation && <span>Has explanation</span>}
          </div>

          {showDetails && (
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-2 rounded text-sm ${
                      optIndex === question.correctAnswer
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>{" "}
                    {option}
                    {optIndex === question.correctAnswer && (
                      <Badge size="sm" className="ml-2 bg-green-500 text-white">
                        Correct
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {question.explanation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            title="View Details"
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDuplicate(question)}
            title="Duplicate Question"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(question)}
            title="Edit Question"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(question.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete Question"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const QuestionsManager = ({ questions, onQuestionsChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowForm(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleSaveQuestion = (questionData) => {
    const newQuestions = [...questions];
    const existingIndex = newQuestions.findIndex(
      (q) => q.id === questionData.id
    );

    if (existingIndex >= 0) {
      // Update existing question
      newQuestions[existingIndex] = questionData;
    } else {
      // Add new question
      newQuestions.push(questionData);
    }

    onQuestionsChange(newQuestions);
    setShowForm(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const newQuestions = questions.filter((q) => q.id !== questionId);
      onQuestionsChange(newQuestions);
    }
  };

  const handleDuplicateQuestion = (question) => {
    const duplicatedQuestion = question.clone();
    duplicatedQuestion.id = Date.now(); // Generate new ID
    duplicatedQuestion.question = `${duplicatedQuestion.question} (Copy)`;

    const newQuestions = [...questions, duplicatedQuestion];
    onQuestionsChange(newQuestions);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.options.some((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      !filterCategory || question.category === filterCategory;
    const matchesDifficulty =
      !filterDifficulty || question.difficulty === filterDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get unique categories and difficulties from questions
  const categories = [...new Set(questions.map((q) => q.category))].filter(
    Boolean
  );
  const difficulties = [...new Set(questions.map((q) => q.difficulty))].filter(
    Boolean
  );

  if (showForm) {
    return (
      <QuestionForm
        question={editingQuestion}
        onSave={handleSaveQuestion}
        onCancel={handleCancelForm}
        onDelete={handleDeleteQuestion}
        isEdit={!!editingQuestion}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">Questions</h2>
          <p className="text-gray-600">
            {questions.length} question{questions.length !== 1 ? "s" : ""} added
          </p>
        </div>
        <Button onClick={handleAddQuestion} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {questions.length > 0 && (
        <>
          {/* Search and Filters */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search questions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {getCategoryIcon(category)}{" "}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Questions Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {questions.length}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {questions.filter((q) => q.difficulty === "easy").length}
              </p>
              <p className="text-sm text-gray-600">Easy</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {questions.filter((q) => q.difficulty === "medium").length}
              </p>
              <p className="text-sm text-gray-600">Medium</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {questions.filter((q) => q.difficulty === "hard").length}
              </p>
              <p className="text-sm text-gray-600">Hard</p>
            </Card>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  index={questions.indexOf(question)} // Use original index for numbering
                  onEdit={handleEditQuestion}
                  onDelete={handleDeleteQuestion}
                  onDuplicate={handleDuplicateQuestion}
                />
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">
                  {searchTerm || filterCategory || filterDifficulty
                    ? "No questions match your search criteria."
                    : "No questions added yet."}
                </p>
                {(searchTerm || filterCategory || filterDifficulty) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterCategory("");
                      setFilterDifficulty("");
                    }}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                )}
              </Card>
            )}
          </div>
        </>
      )}

      {questions.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-6xl">📝</div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                No questions yet
              </h3>
              <p className="text-gray-500">
                Start building your quiz by adding your first question.
              </p>
            </div>
            <Button
              onClick={handleAddQuestion}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Your First Question
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuestionsManager;
