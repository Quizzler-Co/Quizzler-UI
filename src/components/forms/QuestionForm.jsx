import { useState, useEffect } from "react";
import { X, Plus, Check, AlertCircle } from "lucide-react";
import { Card } from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import Label from "../ui-components/Label";
import Badge from "../ui-components/Badge";
import {
  Question,
  DIFFICULTIES,
  CATEGORIES,
  getDifficultyColor,
  getCategoryIcon,
} from "../../models/Question";

const QuestionForm = ({
  question,
  onSave,
  onCancel,
  onDelete,
  isEdit = false,
}) => {
  const [questionData, setQuestionData] = useState(
    question ? question.clone() : new Question()
  );
  const [errors, setErrors] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (question) {
      setQuestionData(question.clone());
    }
  }, [question]);

  const handleInputChange = (field, value) => {
    setQuestionData((prev) => {
      const newQuestion = prev.clone();
      newQuestion[field] = value;
      return newQuestion;
    });

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleOptionChange = (index, value) => {
    setQuestionData((prev) => {
      const newQuestion = prev.clone();
      newQuestion.options[index] = value;
      return newQuestion;
    });
  };

  const handleAddOption = () => {
    if (questionData.options.length < 6) {
      setQuestionData((prev) => {
        const newQuestion = prev.clone();
        newQuestion.options.push("");
        return newQuestion;
      });
    }
  };

  const handleRemoveOption = (index) => {
    if (questionData.options.length > 2) {
      setQuestionData((prev) => {
        const newQuestion = prev.clone();
        newQuestion.options.splice(index, 1);
        // Adjust correct answer if needed
        if (newQuestion.correctAnswer >= newQuestion.options.length) {
          newQuestion.correctAnswer = newQuestion.options.length - 1;
        }
        return newQuestion;
      });
    }
  };

  const handleSave = () => {
    const validationErrors = questionData.getValidationErrors();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Generate ID if it's a new question
    if (!questionData.id) {
      questionData.id = Date.now();
    }

    onSave(questionData);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      onDelete(questionData.id);
    }
  };

  const PreviewCard = () => (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <span>{getCategoryIcon(questionData.category)}</span>
        Question Preview
        <Badge
          size="sm"
          className={getDifficultyColor(questionData.difficulty)}
        >
          {questionData.difficulty}
        </Badge>
      </h4>
      <div className="space-y-3">
        <p className="font-medium">{questionData.question}</p>
        <div className="space-y-2">
          {questionData.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 ${
                index === questionData.correctAnswer
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                {index === questionData.correctAnswer && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
                <span>
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </div>
            </div>
          ))}
        </div>
        {questionData.explanation && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Explanation:</strong> {questionData.explanation}
            </p>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {isEdit ? "Edit Question" : "Add New Question"}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          {isEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-800">
              Please fix the following errors:
            </span>
          </div>
          <ul className="list-disc list-inside text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question Text *</Label>
            <textarea
              id="question"
              placeholder="Enter your question here..."
              value={questionData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Answer Options *</Label>
              {questionData.options.length < 6 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddOption}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add Option
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {questionData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={questionData.correctAnswer === index}
                      onChange={() => handleInputChange("correctAnswer", index)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300"
                    />
                    <span className="text-sm font-medium min-w-[20px]">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                  {questionData.options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Select the radio button next to the correct answer
            </p>
          </div>

          {/* Question Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={questionData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
              >
                <option value="">Select category</option>
                {Object.entries(CATEGORIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {getCategoryIcon(value)}{" "}
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <select
                id="difficulty"
                value={questionData.difficulty}
                onChange={(e) =>
                  handleInputChange("difficulty", e.target.value)
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
              >
                {Object.entries(DIFFICULTIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                max="10"
                placeholder="1"
                value={questionData.points}
                onChange={(e) =>
                  handleInputChange("points", parseInt(e.target.value) || 1)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
              <Input
                id="timeLimit"
                type="number"
                min="10"
                max="300"
                placeholder="30"
                value={questionData.timeLimit}
                onChange={(e) =>
                  handleInputChange("timeLimit", parseInt(e.target.value) || 30)
                }
              />
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <textarea
              id="explanation"
              placeholder="Provide an explanation for the correct answer..."
              value={questionData.explanation}
              onChange={(e) => handleInputChange("explanation", e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">{showPreview && <PreviewCard />}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          {isEdit ? "Update Question" : "Add Question"}
        </Button>
      </div>
    </Card>
  );
};

export default QuestionForm;
