/**
 * User Service
 * Handles all user-related operations including profile management, authentication, and user data
 */

export class UserService {
  // Validate user profile data
  static validateProfile(userData) {
    const errors = [];

    // Name validation
    if (!userData.name?.trim()) {
      errors.push("Name is required");
    } else if (userData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    // Email validation
    if (!userData.email?.trim()) {
      errors.push("Email is required");
    } else if (!this.isValidEmail(userData.email)) {
      errors.push("Please enter a valid email address");
    }

    return errors;
  }

  // Validate password data
  static validatePassword(passwordData) {
    const errors = [];

    if (!passwordData.currentPassword) {
      errors.push("Current password is required");
    }

    if (!passwordData.newPassword) {
      errors.push("New password is required");
    } else if (passwordData.newPassword.length < 6) {
      errors.push("New password must be at least 6 characters long");
    } else if (passwordData.newPassword.length > 128) {
      errors.push("New password must be less than 128 characters");
    }

    if (!passwordData.confirmPassword) {
      errors.push("Password confirmation is required");
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.push("Passwords do not match");
    }

    // Check for common weak passwords
    const weakPasswords = [
      "123456",
      "password",
      "123456789",
      "qwerty",
      "abc123",
    ];
    if (weakPasswords.includes(passwordData.newPassword.toLowerCase())) {
      errors.push("Please choose a stronger password");
    }

    return errors;
  }

  // Email validation helper
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get user statistics
  static calculateUserStats(participations) {
    if (!participations || participations.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        favoriteCategory: "None",
        streak: 0,
      };
    }

    const totalQuizzes = participations.length;
    const totalScore = participations.reduce((sum, p) => sum + p.score, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const bestScore = Math.max(...participations.map((p) => p.score));

    const totalQuestions = participations.reduce(
      (sum, p) => sum + p.totalQuestions,
      0
    );
    const correctAnswers = participations.reduce(
      (sum, p) => sum + Math.round((p.score / 100) * p.totalQuestions),
      0
    );
    const accuracy =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    // Find favorite category
    const categoryCount = {};
    participations.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    const favoriteCategory = Object.keys(categoryCount).reduce(
      (a, b) => (categoryCount[a] > categoryCount[b] ? a : b),
      "None"
    );

    // Calculate current streak (consecutive days with quiz activity)
    const sortedDates = participations
      .map((p) => new Date(p.completedAt))
      .sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
      const quizDate = new Date(sortedDates[i]);
      quizDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (currentDate - quizDate) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === streak) {
        streak++;
        currentDate = quizDate;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return {
      totalQuizzes,
      averageScore,
      bestScore,
      totalQuestions,
      correctAnswers,
      accuracy,
      favoriteCategory,
      streak,
    };
  }

  // Get rank based on average score
  static getUserRank(averageScore) {
    if (averageScore >= 95) return "Master";
    if (averageScore >= 85) return "Expert";
    if (averageScore >= 75) return "Advanced";
    if (averageScore >= 65) return "Intermediate";
    if (averageScore >= 50) return "Beginner";
    return "Novice";
  }

  // Get rank color for badges
  static getRankColor(rank) {
    switch (rank) {
      case "A+":
        return "bg-green-100 text-green-800 border-green-300";
      case "A":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "B+":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "B":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "B-":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "C+":
        return "bg-red-100 text-red-800 border-red-300";
      case "C":
        return "bg-red-200 text-red-900 border-red-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

  // Generate achievements based on user activity
  static generateAchievements(user, participations) {
    const achievements = [];
    const stats = this.calculateUserStats(participations);

    // First Quiz Achievement
    if (participations.length >= 1) {
      achievements.push({
        id: "first-quiz",
        name: "First Steps",
        description: "Completed your first quiz",
        icon: "🎯",
        earnedDate: participations[participations.length - 1].completedAt,
        rarity: "common",
      });
    }

    // Perfect Score Achievement
    if (participations.some((p) => p.score === 100)) {
      achievements.push({
        id: "perfect-score",
        name: "Perfectionist",
        description: "Achieved a perfect score",
        icon: "💯",
        earnedDate: participations.find((p) => p.score === 100).completedAt,
        rarity: "rare",
      });
    }

    // Speed Demon Achievement
    const fastQuiz = participations.find((p) => {
      const [minutes, seconds] = p.duration.split(":").map(Number);
      const totalSeconds = minutes * 60 + seconds;
      const timePerQuestion = totalSeconds / p.totalQuestions;
      return timePerQuestion < 10; // Less than 10 seconds per question
    });

    if (fastQuiz) {
      achievements.push({
        id: "speed-demon",
        name: "Speed Demon",
        description: "Completed a quiz in record time",
        icon: "⚡",
        earnedDate: fastQuiz.completedAt,
        rarity: "uncommon",
      });
    }

    // Knowledge Seeker Achievement
    if (participations.length >= 10) {
      achievements.push({
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        description: "Completed 10 quizzes",
        icon: "📚",
        earnedDate: participations[participations.length - 10].completedAt,
        rarity: "uncommon",
      });
    }

    // Quiz Master Achievement
    if (participations.length >= 50) {
      achievements.push({
        id: "quiz-master",
        name: "Quiz Master",
        description: "Completed 50 quizzes",
        icon: "👑",
        earnedDate: participations[participations.length - 50].completedAt,
        rarity: "epic",
      });
    }

    // Category Expert Achievement
    const categoryGroups = {};
    participations.forEach((p) => {
      if (!categoryGroups[p.category]) categoryGroups[p.category] = [];
      categoryGroups[p.category].push(p);
    });

    Object.entries(categoryGroups).forEach(([category, quizzes]) => {
      if (quizzes.length >= 5 && quizzes.every((q) => q.score >= 80)) {
        achievements.push({
          id: `${category.toLowerCase()}-expert`,
          name: `${category} Expert`,
          description: `Mastered ${category} with 5+ high-scoring quizzes`,
          icon: "🏆",
          earnedDate: quizzes[quizzes.length - 1].completedAt,
          rarity: "rare",
        });
      }
    });

    // Streak Achievement
    if (stats.streak >= 7) {
      achievements.push({
        id: "week-streak",
        name: "Week Warrior",
        description: "7-day quiz streak",
        icon: "🔥",
        earnedDate: new Date().toISOString().split("T")[0],
        rarity: "rare",
      });
    }

    return achievements;
  }

  // Authentication API calls
  static async register(userData) {
    try {
      const response = await fetch(
        "http://localhost:8086/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${userData.firstName} ${userData.lastName}`.trim(),
            username: userData.username.trim(), // Using email as username for simplicity
            email: userData.email,
            password: userData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Registration failed: ${response.status}`
        );
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: "Account created successfully",
      };
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  }

  static async login(credentials) {
    try {
      const response = await fetch("http://localhost:8086/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed: ${response.status}`
        );
      }

      const data = await response.json();

      // Store the token in localStorage if remember me is checked
      if (credentials.rememberMe && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenType", data.tokenType);
        // Store user data
        if (data.user) {
          localStorage.setItem("currentUser", JSON.stringify(data.user));
        }
      } else if (data.accessToken) {
        // Store in sessionStorage for session-based auth
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("tokenType", data.tokenType);
        // Store user data
        if (data.user) {
          sessionStorage.setItem("currentUser", JSON.stringify(data.user));
        }
      }

      return {
        success: true,
        data: data,
        message: "Login successful",
      };
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  }

  static logout() {
    // Remove tokens from both storage types
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("tokenType");
    sessionStorage.removeItem("currentUser");
  }

  static getAuthToken() {
    // Check localStorage first, then sessionStorage
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const tokenType =
      localStorage.getItem("tokenType") || sessionStorage.getItem("tokenType");

    if (token && tokenType) {
      return `${tokenType} ${token}`;
    }
    return null;
  }

  static isAuthenticated() {
    return !!this.getAuthToken();
  }

  static getCurrentUser() {
    // Get user data from localStorage/sessionStorage or return default
    const userData =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser");
    if (userData) {
      return JSON.parse(userData);
    }

    // Return default user if authenticated but no stored user data
    if (this.isAuthenticated()) {
      return {
        name: "User",
        email: "user@example.com",
        avatar: null,
      };
    }

    return null;
  }

  // Mock API calls - In a real app, these would be actual API calls
  static async updateProfile(profileData) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate data
    const errors = this.validateProfile(profileData);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    // Simulate success
    return {
      success: true,
      data: profileData,
      message: "Profile updated successfully",
    };
  }

  static async changePassword(passwordData) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validate data
    const errors = this.validatePassword(passwordData);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    // Simulate success
    return {
      success: true,
      message: "Password changed successfully",
    };
  }

  static async uploadAvatar(file) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validate file
    if (!file || !file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file");
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      throw new Error("Image size must be less than 5MB");
    }

    // Simulate file upload and return URL
    return {
      success: true,
      avatarUrl: URL.createObjectURL(file),
      message: "Avatar updated successfully",
    };
  }
}

export default UserService;
