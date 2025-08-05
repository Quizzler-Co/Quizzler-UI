/**
 * Quiz Service
 * Handles all quiz-related operations and business logic
 */

import { Question } from "../models/Question";

export class QuizService {
  // Validate a complete quiz
  static validateQuiz(quizData) {
    const errors = [];

    // Basic information validation
    if (!quizData.title?.trim()) {
      errors.push("Quiz title is required");
    }

    if (!quizData.category?.trim()) {
      errors.push("Quiz category is required");
    }

    if (!quizData.difficulty?.trim()) {
      errors.push("Quiz difficulty is required");
    }

    // Questions validation
    if (!quizData.questions || quizData.questions.length === 0) {
      errors.push("At least one question is required");
    } else {
      // Validate each question
      quizData.questions.forEach((questionData, index) => {
        const question = Question.fromJSON(questionData);
        const questionErrors = question.getValidationErrors();

        if (questionErrors.length > 0) {
          errors.push(`Question ${index + 1}: ${questionErrors.join(", ")}`);
        }
      });
    }

    return errors;
  }

  // Calculate quiz statistics
  static calculateQuizStats(quizData) {
    if (!quizData.questions || quizData.questions.length === 0) {
      return {
        totalQuestions: 0,
        totalPoints: 0,
        estimatedDuration: 0,
        difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
        categoryBreakdown: {},
      };
    }

    const questions = quizData.questions.map((q) => Question.fromJSON(q));

    const totalQuestions = questions.length;
    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0);
    const estimatedDuration = questions.reduce(
      (sum, q) => sum + (q.timeLimit || 30),
      0
    );

    // Difficulty breakdown
    const difficultyBreakdown = questions.reduce(
      (acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      },
      { easy: 0, medium: 0, hard: 0 }
    );

    // Category breakdown
    const categoryBreakdown = questions.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {});

    return {
      totalQuestions,
      totalPoints,
      estimatedDuration: Math.round(estimatedDuration / 60), // Convert to minutes
      difficultyBreakdown,
      categoryBreakdown,
    };
  }

  // Generate quiz preview data
  static generateQuizPreview(quizData) {
    const stats = this.calculateQuizStats(quizData);
    const validationErrors = this.validateQuiz(quizData);

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
      stats,
      readyToPublish:
        validationErrors.length === 0 && stats.totalQuestions >= 3,
    };
  }

  // Format quiz data for API submission
  static formatQuizForSubmission(quizData) {
    return {
      title: quizData.title?.trim(),
      category: quizData.category,
      difficulty: quizData.difficulty,
      timePerQuestion: parseInt(quizData.timePerQuestion) || 30,
      description: quizData.description?.trim() || "",
      questions: quizData.questions.map((q) => {
        const question = Question.fromJSON(q);
        return question.toJSON();
      }),
      metadata: {
        createdAt: new Date().toISOString(),
        totalQuestions: quizData.questions.length,
        estimatedDuration: this.calculateQuizStats(quizData).estimatedDuration,
      },
    };
  }

  // Import questions from various formats
  static importQuestionsFromJSON(jsonData) {
    try {
      const data =
        typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

      if (Array.isArray(data)) {
        return data.map((item, index) => {
          try {
            return Question.fromJSON(item);
          } catch (error) {
            throw new Error(
              `Error parsing question ${index + 1}: ${error.message}`
            );
          }
        });
      }

      throw new Error("JSON data must be an array of questions");
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}`);
    }
  }

  // Export questions to various formats
  static exportQuestionsToJSON(questions) {
    return JSON.stringify(
      questions.map((q) => (q.toJSON ? q.toJSON() : q)),
      null,
      2
    );
  }

  // Shuffle questions for randomization
  static shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Filter questions by criteria
  static filterQuestions(questions, criteria) {
    return questions.filter((question) => {
      const q = question.toJSON ? question.toJSON() : question;

      if (criteria.category && q.category !== criteria.category) {
        return false;
      }

      if (criteria.difficulty && q.difficulty !== criteria.difficulty) {
        return false;
      }

      if (criteria.search) {
        const searchLower = criteria.search.toLowerCase();
        const questionText = q.question.toLowerCase();
        const optionsText = q.options.join(" ").toLowerCase();

        if (
          !questionText.includes(searchLower) &&
          !optionsText.includes(searchLower)
        ) {
          return false;
        }
      }

      return true;
    });
  }

  // Generate question templates
  static generateQuestionTemplate(type = "multiple_choice") {
    const templates = {
      multiple_choice: new Question({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        category: "",
        difficulty: "medium",
        explanation: "",
        points: 1,
        timeLimit: 30,
      }),

      true_false: new Question({
        question: "",
        options: ["True", "False"],
        correctAnswer: 0,
        category: "",
        difficulty: "easy",
        explanation: "",
        points: 1,
        timeLimit: 20,
      }),
    };

    return templates[type] || templates.multiple_choice;
  }
}

export default QuizService;
