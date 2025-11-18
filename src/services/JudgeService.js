/**
 * Judge Service
 * Handles all code execution and problem-related operations
 */

import { UserService } from "./UserService";

export class JudgeService {
  // Get all problems with optional difficulty filter
  static async getAllProblems(difficulty = null) {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      const token = UserService.getAuthToken();
      let url = "http://localhost:8086/api/v1/judge/problems";
      
      if (difficulty && ["EASY", "MEDIUM", "HARD"].includes(difficulty)) {
        url += `?difficulty=${difficulty}`;
      }

      console.log("Fetching problems from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }).catch((fetchError) => {
        // Handle network errors (CORS, connection refused, etc.)
        console.error("Network error fetching problems:", fetchError);
        if (fetchError.message.includes("Failed to fetch") || fetchError.message.includes("NetworkError")) {
          throw new Error("Unable to connect to the server. Please check if the backend service is running on http://localhost:8086");
        }
        throw new Error(`Network error: ${fetchError.message}`);
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied");
        } else if (response.status === 404) {
          throw new Error("Problems endpoint not found. Please check if the judge service is running.");
        } else if (response.status === 500) {
          throw new Error("Server error. The judge service may be experiencing issues.");
        }
        throw new Error(
          `Failed to fetch problems: ${response.status} ${response.statusText}`
        );
      }

      const problems = await response.json();

      return {
        success: true,
        data: Array.isArray(problems) ? problems : [],
        message: "Problems fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching problems:", error);
      // Don't wrap the error if it's already a user-friendly message
      if (error.message && (
        error.message.includes("Unable to connect") ||
        error.message.includes("Network error") ||
        error.message.includes("Authentication required") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Access denied")
      )) {
        throw error;
      }
      throw new Error(error.message || "Failed to fetch problems. Please check your connection and try again.");
    }
  }

  // Get problem details by ID
  static async getProblem(problemId) {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      const token = UserService.getAuthToken();
      const url = `http://localhost:8086/api/v1/judge/problems/${problemId}`;
      
      console.log("Fetching problem from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }).catch((fetchError) => {
        // Handle network errors
        console.error("Network error fetching problem:", fetchError);
        if (fetchError.message.includes("Failed to fetch") || fetchError.message.includes("NetworkError")) {
          throw new Error("Unable to connect to the server. Please check if the backend service is running on http://localhost:8086");
        }
        throw new Error(`Network error: ${fetchError.message}`);
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Problem not found");
        } else if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied");
        } else if (response.status === 500) {
          throw new Error("Server error. The judge service may be experiencing issues.");
        }
        throw new Error(
          `Failed to fetch problem: ${response.status} ${response.statusText}`
        );
      }

      const problem = await response.json();

      return {
        success: true,
        data: problem,
        message: "Problem fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching problem:", error);
      // Don't wrap the error if it's already a user-friendly message
      if (error.message && (
        error.message.includes("Unable to connect") ||
        error.message.includes("Network error") ||
        error.message.includes("Authentication required") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Access denied") ||
        error.message.includes("not found")
      )) {
        throw error;
      }
      throw new Error(error.message || "Failed to fetch problem. Please check your connection and try again.");
    }
  }

  // Submit code solution
  static async submitCode(problemId, code) {
    try {
      if (!UserService.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      if (!problemId || !code || !code.trim()) {
        throw new Error("Problem ID and code are required");
      }

      const token = UserService.getAuthToken();
      const url = "http://localhost:8086/api/v1/judge/submit";
      
      console.log("Submitting code to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: problemId,
          code: code.trim(),
        }),
      }).catch((fetchError) => {
        // Handle network errors
        console.error("Network error submitting code:", fetchError);
        if (fetchError.message.includes("Failed to fetch") || fetchError.message.includes("NetworkError")) {
          throw new Error("Unable to connect to the server. Please check if the backend service is running on http://localhost:8086");
        }
        throw new Error(`Network error: ${fetchError.message}`);
      });

      // Log response status for debugging
      console.log("Submission response status:", response.status, response.statusText);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
      // Parse response first (can only read body once)
      const contentType = response.headers.get("content-type") || "";
      console.log("Response content-type:", contentType);
      
      let result;
      let errorMessage;
      
      try {
        if (contentType.includes("application/json")) {
          result = await response.json();
          console.log("Parsed JSON result:", result);
        } else {
          const text = await response.text();
          console.log("Non-JSON response text:", text);
          // Try to parse as JSON even if content-type is wrong
          try {
            result = JSON.parse(text);
            console.log("Parsed text as JSON:", result);
          } catch {
            result = { message: text, verdict: "ERROR" };
            errorMessage = text;
          }
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        errorMessage = "Invalid response format from server";
      }
      
      // Check if result has a verdict - if so, it's a valid submission result (even if HTTP status is not 200)
      // This handles cases where backend returns 503/502 but still includes compilation/runtime error details
      // Also check for alternative field names that might be used
      const verdict = result?.verdict || result?.status || result?.result;
      
      if (result && verdict) {
        console.log("Result contains verdict/status, treating as valid submission result:", verdict);
        console.log("Full result object:", JSON.stringify(result, null, 2));
        
        // Normalize the result to always have 'verdict' field
        const normalizedResult = {
          ...result,
          verdict: verdict,
        };
        
        // This is a valid submission result (COMPILATION_ERROR, RUNTIME_ERROR, WRONG_ANSWER, etc.)
        // Return it even if HTTP status is not 200
        return {
          success: true,
          data: normalizedResult,
          message: "Code submitted successfully",
        };
      }
      
      // Log if we don't have a verdict
      console.warn("No verdict found in result:", result);
      
      // If no verdict, check HTTP status for actual errors
      if (!response.ok) {
        // Use parsed error message if available
        if (result && result.message) {
          errorMessage = result.message;
        } else if (result && result.error) {
          errorMessage = result.error;
        } else if (!errorMessage) {
          errorMessage = `Failed to submit code: ${response.status} ${response.statusText}`;
        }
        
        console.error("Error response:", { status: response.status, message: errorMessage, result });
        
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again");
        } else if (response.status === 403) {
          throw new Error("Access denied");
        } else if (response.status === 400) {
          throw new Error(errorMessage);
        } else if (response.status === 503 || response.status === 502) {
          // Service Unavailable or Bad Gateway - service is down
          // Only show this if there's no verdict in the response
          throw new Error(errorMessage || "Judge Service is unavailable. Please try again later.");
        } else if (response.status === 500) {
          throw new Error(errorMessage || "Server error. The judge service may be experiencing issues.");
        }
        throw new Error(errorMessage);
      }

      // Success response (200 OK) - ensure result has required fields
      if (!result) {
        console.warn("No result data in response");
        result = { verdict: "ERROR", message: "No response data received" };
      } else if (!result.verdict && !result.status && !result.result) {
        // If we got here with a 200 OK but no verdict, log it
        console.warn("200 OK response but no verdict field found. Result:", JSON.stringify(result, null, 2));
        // Try to infer verdict from message or create default
        if (result.message) {
          result.verdict = "ERROR";
        } else {
          result.verdict = "ERROR";
          result.message = "Unexpected response format from server";
        }
      }
      
      console.log("Final submission result:", result);

      return {
        success: true,
        data: result,
        message: "Code submitted successfully",
      };
    } catch (error) {
      console.error("Error submitting code:", error);
      // Don't wrap the error if it's already a user-friendly message
      if (error.message && (
        error.message.includes("Unable to connect") ||
        error.message.includes("Network error") ||
        error.message.includes("Authentication required") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Access denied") ||
        error.message.includes("Invalid submission")
      )) {
        throw error;
      }
      throw new Error(error.message || "Failed to submit code. Please check your connection and try again.");
    }
  }
}

export default JudgeService;

