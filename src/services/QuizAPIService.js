/**
 * Quiz API Service
 * Handles all quiz-related API operations
 */

import { UserService } from "./UserService";

export class QuizAPIService {
  // Create a new quiz
  static async createQuiz(quizData) {
    try {
      // Check if user is authenticated
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required to create quiz");
      }

      const token = UserService.getAuthToken();
      console.log("Auth token:", token ? "Present" : "Missing");

      // Transform the quiz data to match backend expectations
      const transformedData = this.transformQuizData(quizData);

      console.log("Sending quiz data to backend:", transformedData);
      console.log("API endpoint: http://localhost:8086/api/v1/quiz/create");

      const response = await fetch("http://localhost:8086/api/v1/quiz/create", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        let errorMessage = `Failed to create quiz: ${response.status} ${response.statusText}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.log("Error response body:", errorData);
        } catch {
          console.log("Could not parse error response as JSON");
          try {
            const errorText = await response.text();
            console.log("Error response text:", errorText);
            if (errorText) errorMessage = errorText;
          } catch {
            console.log("Could not read error response as text");
          }
        }

        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied: Admin privileges required");
        } else if (response.status === 404) {
          throw new Error(
            "API endpoint not found. Please check if the backend server is running on localhost:8086"
          );
        }

        throw new Error(errorMessage);
      }

      // Handle successful response
      let result;
      try {
        result = await response.json();
        console.log("Success response (JSON):", result);
      } catch {
        // If response is not JSON, get it as text
        console.log("Response is not JSON, getting as text");
        const textResponse = await response.text();
        console.log("Success response (Text):", textResponse);

        // Create a success response object
        result = {
          message: textResponse,
          success: true,
        };
      }

      return {
        success: true,
        data: result,
        message: "Quiz created successfully",
      };
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw error;
    }
  }

  // Transform frontend quiz data to backend format
  static transformQuizData(quizData) {
    return {
      title: quizData.title.trim(),
      description: quizData.description?.trim() || "",
      category: quizData.category,
      timePerQuestion: parseInt(quizData.timePerQuestion) || 30,
      questions: quizData.questions.map((question) => ({
        questionText: question.question || question.questionText,
        options: Array.isArray(question.options) ? question.options : [],
        correctAnswer: question.correctAnswer,
        category: question.category || quizData.category,
        difficulty: question.difficulty || quizData.difficulty,
        explanation: question.explanation || "",
      })),
    };
  }

  // Get all quizzes (for admin management)
  static async getAllQuizzes() {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      const token = UserService.getAuthToken();
      const response = await fetch("http://localhost:8086/api/v1/quiz/all", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied: Admin privileges required");
        }
        throw new Error(
          `Failed to fetch quizzes: ${response.status} ${response.statusText}`
        );
      }

      const quizzes = await response.json();

      return {
        success: true,
        data: Array.isArray(quizzes) ? quizzes : [],
        message: "Quizzes fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw new Error(error.message || "Failed to fetch quizzes");
    }
  }

  // Get quiz by ID
  static async getQuizById(quizId) {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      const token = UserService.getAuthToken();
      const response = await fetch(
        `http://localhost:8086/api/v1/quiz/${quizId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Quiz not found");
        } else if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied");
        }
        throw new Error(
          `Failed to fetch quiz: ${response.status} ${response.statusText}`
        );
      }

      const quiz = await response.json();

      return {
        success: true,
        data: quiz,
        message: "Quiz fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching quiz:", error);
      throw new Error(error.message || "Failed to fetch quiz");
    }
  }

  // Update quiz
  static async updateQuiz(quizId, quizData) {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      const token = UserService.getAuthToken();
      const transformedData = this.transformQuizData(quizData);

      const response = await fetch(
        `http://localhost:8086/api/v1/quiz/${quizId}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Quiz not found");
        } else if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied");
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to update quiz: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
        message: "Quiz updated successfully",
      };
    } catch (error) {
      console.error("Error updating quiz:", error);
      throw new Error(error.message || "Failed to update quiz");
    }
  }

  // Delete quiz
  static async deleteQuiz(quizId) {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      const token = UserService.getAuthToken();
      const response = await fetch(
        `http://localhost:8086/api/v1/quiz/${quizId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Quiz not found");
        } else if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied");
        }
        throw new Error(
          `Failed to delete quiz: ${response.status} ${response.statusText}`
        );
      }

      return {
        success: true,
        message: "Quiz deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting quiz:", error);
      throw new Error(error.message || "Failed to delete quiz");
    }
  }
}

export default QuizAPIService;
