import React from "react";
import { Clock, Brain, Target, Zap } from "lucide-react";

const QuizLoadingScreen = ({ quizTitle, tips = [] }) => {
  const defaultTips = [
    "Read each question carefully before answering",
    "Don't spend too much time on difficult questions",
    "Review your answers before submitting",
    "Stay calm and focused throughout the quiz",
    "Trust your first instinct when unsure",
  ];

  const displayTips = tips.length > 0 ? tips : defaultTips;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
        {/* Loading Animation */}
        <div className="mb-6">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping"></div>
            <div className="relative bg-blue-500 rounded-full w-20 h-20 flex items-center justify-center">
              <Brain className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preparing Your Quiz
        </h2>
        {quizTitle && (
          <p className="text-gray-600 mb-6 font-medium">{quizTitle}</p>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full bg-blue-500 animate-pulse`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="text-left bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2 text-blue-500" />
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {displayTips.slice(0, 3).map((tip, index) => (
              <li key={index} className="flex items-start">
                <Zap className="h-3 w-3 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 text-sm mt-6 animate-pulse">
          Loading questions and setting up your quiz environment...
        </p>
      </div>
    </div>
  );
};

export default QuizLoadingScreen;
