/**
 * Profile Demo Utilities
 * Helper functions to demonstrate profile features and generate sample data
 */

import { UserService } from "../services/UserService";

export class ProfileDemo {
  // Generate sample user data for demo purposes
  static generateSampleUser() {
    return {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: null,
      joinDate: "2024-01-15",
      totalQuizzes: 24,
      averageScore: 78,
      rank: "Expert",
    };
  }

  // Generate sample quiz participation data
  static generateSampleParticipations() {
    const categories = [
      "Science",
      "History",
      "Geography",
      "Literature",
      "Mathematics",
      "Art",
    ];
    const quizTitles = {
      Science: [
        "Physics Fundamentals",
        "Chemistry Basics",
        "Biology Essentials",
        "Astronomy Quiz",
      ],
      History: [
        "World War II",
        "Ancient Civilizations",
        "Medieval Times",
        "Modern History",
      ],
      Geography: [
        "World Capitals",
        "Country Flags",
        "Mountain Ranges",
        "Ocean Geography",
      ],
      Literature: [
        "Classic Novels",
        "Poetry Masters",
        "Modern Literature",
        "Shakespeare",
      ],
      Mathematics: [
        "Algebra Basics",
        "Geometry Quiz",
        "Statistics",
        "Calculus Intro",
      ],
      Art: ["Renaissance Art", "Modern Art", "Famous Painters", "Art History"],
    };

    const participations = [];
    const currentDate = new Date();

    for (let i = 0; i < 15; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const titles = quizTitles[category];
      const title = titles[Math.floor(Math.random() * titles.length)];

      // Generate date within last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const completedAt = new Date(currentDate);
      completedAt.setDate(completedAt.getDate() - daysAgo);

      const totalQuestions = 10 + Math.floor(Math.random() * 15); // 10-25 questions
      const score = 50 + Math.floor(Math.random() * 50); // 50-100% score
      const minutes = 3 + Math.floor(Math.random() * 10); // 3-13 minutes
      const seconds = Math.floor(Math.random() * 60);

      participations.push({
        id: i + 1,
        quizTitle: title,
        category,
        score,
        totalQuestions,
        completedAt: completedAt.toISOString().split("T")[0],
        duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        rank: this.calculateRank(score),
      });
    }

    return participations.sort(
      (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
    );
  }

  // Calculate rank based on score
  static calculateRank(score) {
    if (score >= 95) return "A+";
    if (score >= 90) return "A";
    if (score >= 85) return "B+";
    if (score >= 80) return "B";
    if (score >= 75) return "B-";
    if (score >= 70) return "C+";
    if (score >= 60) return "C";
    return "D";
  }

  // Demonstrate profile statistics calculation
  static demonstrateStatistics() {
    const user = this.generateSampleUser();
    const participations = this.generateSampleParticipations();
    const stats = UserService.calculateUserStats(participations);

    console.log("📊 Profile Statistics Demo:");
    console.log("User:", user.name);
    console.log("Statistics:", stats);
    console.log("User Rank:", UserService.getUserRank(stats.averageScore));

    return { user, participations, stats };
  }

  // Demonstrate achievement system
  static demonstrateAchievements() {
    const user = this.generateSampleUser();
    const participations = this.generateSampleParticipations();
    const achievements = UserService.generateAchievements(user, participations);

    console.log("🏆 Achievement System Demo:");
    console.log("Total Achievements:", achievements.length);
    achievements.forEach((achievement) => {
      console.log(
        `- ${achievement.name} (${achievement.rarity}): ${achievement.description}`
      );
    });

    return achievements;
  }

  // Demonstrate validation system
  static demonstrateValidation() {
    console.log("✅ Validation System Demo:");

    // Test profile validation
    const validProfile = { name: "John Doe", email: "john@example.com" };
    const invalidProfile = { name: "", email: "invalid-email" };

    console.log(
      "Valid profile errors:",
      UserService.validateProfile(validProfile)
    );
    console.log(
      "Invalid profile errors:",
      UserService.validateProfile(invalidProfile)
    );

    // Test password validation
    const validPassword = {
      currentPassword: "current123",
      newPassword: "newSecurePassword123",
      confirmPassword: "newSecurePassword123",
    };

    const invalidPassword = {
      currentPassword: "",
      newPassword: "123",
      confirmPassword: "456",
    };

    console.log(
      "Valid password errors:",
      UserService.validatePassword(validPassword)
    );
    console.log(
      "Invalid password errors:",
      UserService.validatePassword(invalidPassword)
    );

    return { validProfile, invalidProfile, validPassword, invalidPassword };
  }

  // Generate sample data for testing
  static generateTestData() {
    return {
      user: this.generateSampleUser(),
      participations: this.generateSampleParticipations(),
      achievements: this.demonstrateAchievements(),
    };
  }

  // Simulate real-time statistics update
  static simulateRealTimeUpdate(currentData, callback) {
    console.log("🔄 Simulating real-time update...");

    // Simulate adding a new quiz participation
    setTimeout(() => {
      const newParticipation = {
        id: currentData.participations.length + 1,
        quizTitle: "Live Demo Quiz",
        category: "Demo",
        score: 85 + Math.floor(Math.random() * 15),
        totalQuestions: 10,
        completedAt: new Date().toISOString().split("T")[0],
        duration: "4:23",
        rank: "A",
      };

      const updatedParticipations = [
        newParticipation,
        ...currentData.participations,
      ];
      const updatedStats = UserService.calculateUserStats(
        updatedParticipations
      );
      const updatedAchievements = UserService.generateAchievements(
        currentData.user,
        updatedParticipations
      );

      callback({
        participations: updatedParticipations,
        stats: updatedStats,
        achievements: updatedAchievements,
      });

      console.log("✅ Real-time update complete!");
    }, 2000);
  }

  // Performance test for large datasets
  static performanceTest() {
    console.log("⚡ Performance Test Starting...");
    const startTime = performance.now();

    // Generate large dataset
    const largeParticipations = [];
    for (let i = 0; i < 1000; i++) {
      largeParticipations.push(...this.generateSampleParticipations());
    }

    // Test statistics calculation
    const stats = UserService.calculateUserStats(largeParticipations);

    // Test achievement generation
    const achievements = UserService.generateAchievements(
      this.generateSampleUser(),
      largeParticipations
    );

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log(`✅ Performance Test Complete!`);
    console.log(`- Dataset size: ${largeParticipations.length} participations`);
    console.log(`- Execution time: ${executionTime.toFixed(2)}ms`);
    console.log(
      `- Statistics calculated: ${Object.keys(stats).length} metrics`
    );
    console.log(`- Achievements generated: ${achievements.length} badges`);

    return {
      executionTime,
      datasetSize: largeParticipations.length,
      stats,
      achievements,
    };
  }
}

export default ProfileDemo;
