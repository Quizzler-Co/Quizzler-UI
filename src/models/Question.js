/**
 * Question Model
 * Represents the structure and validation for quiz questions
 */

export class Question {
  constructor(data = {}) {
    this.id = data.id || null;
    this.question = data.question || "";
    this.options = data.options || ["", "", "", ""];
    this.correctAnswer = data.correctAnswer || 0;
    this.category = data.category || "";
    this.difficulty = data.difficulty || "medium";
    this.explanation = data.explanation || "";
    this.points = data.points || 1;
    this.timeLimit = data.timeLimit || 30;
    this.tags = data.tags || [];
  }

  // Validation methods
  isValid() {
    return (
      this.question.trim() !== "" &&
      this.options.every((option) => option.trim() !== "") &&
      this.correctAnswer >= 0 &&
      this.correctAnswer < this.options.length &&
      this.category.trim() !== "" &&
      this.difficulty.trim() !== ""
    );
  }

  // Get validation errors
  getValidationErrors() {
    const errors = [];

    if (!this.question.trim()) {
      errors.push("Question text is required");
    }

    if (this.options.some((option) => !option.trim())) {
      errors.push("All options must be filled");
    }

    if (this.correctAnswer < 0 || this.correctAnswer >= this.options.length) {
      errors.push("Valid correct answer must be selected");
    }

    if (!this.category.trim()) {
      errors.push("Category is required");
    }

    if (!this.difficulty.trim()) {
      errors.push("Difficulty is required");
    }

    return errors;
  }

  // Convert to JSON for API calls
  toJSON() {
    return {
      id: this.id,
      question: this.question,
      options: this.options,
      correctAnswer: this.correctAnswer,
      category: this.category,
      difficulty: this.difficulty,
      explanation: this.explanation,
      points: this.points,
      timeLimit: this.timeLimit,
      tags: this.tags,
    };
  }

  // Create from JSON
  static fromJSON(data) {
    return new Question(data);
  }

  // Clone question
  clone() {
    return new Question(this.toJSON());
  }
}

// Question constants
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  TRUE_FALSE: "true_false",
  FILL_IN_BLANK: "fill_in_blank",
};

export const DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const CATEGORIES = {
  SCIENCE: "science",
  HISTORY: "history",
  SPORTS: "sports",
  ENTERTAINMENT: "entertainment",
  GEOGRAPHY: "geography",
  TECHNOLOGY: "technology",
  LITERATURE: "literature",
  MUSIC: "music",
  ART: "art",
  MIXED: "mixed",
};

// Helper functions
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case DIFFICULTIES.EASY:
      return "bg-green-500 text-white";
    case DIFFICULTIES.MEDIUM:
      return "bg-yellow-500 text-white";
    case DIFFICULTIES.HARD:
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const getCategoryIcon = (category) => {
  switch (category) {
    case CATEGORIES.SCIENCE:
      return "🔬";
    case CATEGORIES.HISTORY:
      return "🏛️";
    case CATEGORIES.SPORTS:
      return "⚽";
    case CATEGORIES.ENTERTAINMENT:
      return "🎬";
    case CATEGORIES.GEOGRAPHY:
      return "🌍";
    case CATEGORIES.TECHNOLOGY:
      return "💻";
    case CATEGORIES.LITERATURE:
      return "📚";
    case CATEGORIES.MUSIC:
      return "🎵";
    case CATEGORIES.ART:
      return "🎨";
    case CATEGORIES.MIXED:
      return "🧠";
    default:
      return "❓";
  }
};
