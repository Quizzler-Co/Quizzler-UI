import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, User, Target, Settings, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui-components/Card";

const HelpCenter = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on 'Create Account' in the navigation bar or footer. Fill in your details including first name, last name, email, phone number, and username. Create a strong password and accept the Terms of Service and Privacy Policy. Once registered, you can start taking quizzes immediately.",
        },
        {
          q: "What are the password requirements?",
          a: "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number. This helps keep your account secure.",
        },
        {
          q: "How do I log in?",
          a: "Click on 'Sign In' in the navigation bar. Enter your username or email along with your password. If you've forgotten your password, you can use the password recovery option.",
        },
      ],
    },
    {
      id: "quizzes",
      title: "Taking Quizzes",
      icon: Target,
      questions: [
        {
          q: "How do I take a quiz?",
          a: "Navigate to the 'Quizzes' page from the main menu. Browse available quizzes and click on one that interests you. Read the instructions carefully, then click 'Start Quiz' to begin. Answer all questions and submit when you're done.",
        },
        {
          q: "Can I retake a quiz?",
          a: "Yes, you can retake most quizzes. However, some quizzes may have restrictions set by the administrator. Check the quiz details before starting to see if retakes are allowed.",
        },
        {
          q: "How are quiz results calculated?",
          a: "Quiz results are calculated based on the number of correct answers. Your score is displayed immediately after submission, along with a breakdown of your performance. You can also view your results in your profile.",
        },
        {
          q: "What happens if I close the quiz before completing it?",
          a: "If you close the quiz before submitting, your progress may be lost depending on the quiz settings. It's recommended to complete the quiz in one session to ensure your answers are saved.",
        },
      ],
    },
    {
      id: "profile",
      title: "Profile & Account",
      icon: User,
      questions: [
        {
          q: "How do I update my profile information?",
          a: "Go to your Profile page from the navigation menu. Click on 'Edit Profile' to update your personal information, including name, email, phone number, and other details. Remember to save your changes.",
        },
        {
          q: "How do I change my password?",
          a: "In your Profile settings, look for the 'Change Password' option. You'll need to enter your current password and then create a new password that meets the security requirements.",
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can delete your account from your Profile settings. Please note that this action is permanent and cannot be undone. All your quiz data and progress will be permanently deleted.",
        },
      ],
    },
    {
      id: "leaderboard",
      title: "Leaderboards",
      icon: Target,
      questions: [
        {
          q: "What is the leaderboard?",
          a: "The leaderboard shows the top performers for each quiz, ranked by their scores. It's a great way to see how you compare with other users and track your progress.",
        },
        {
          q: "How is the leaderboard ranked?",
          a: "Leaderboards are typically ranked by highest score first, then by fastest completion time if scores are tied. The exact ranking criteria may vary by quiz.",
        },
        {
          q: "Can I see my position on the leaderboard?",
          a: "Yes, after completing a quiz, you can view the leaderboard for that specific quiz. Your position will be highlighted so you can easily see where you rank.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: Settings,
      questions: [
        {
          q: "The page isn't loading properly. What should I do?",
          a: "Try refreshing the page (F5 or Ctrl+R). Clear your browser cache and cookies, then try again. Make sure you're using a modern browser (Chrome, Firefox, Safari, or Edge). If the problem persists, contact our support team.",
        },
        {
          q: "I'm having trouble submitting a quiz. What can I do?",
          a: "Check your internet connection first. Make sure all required questions are answered. If you're still having issues, try refreshing the page and starting the quiz again. Contact support if the problem continues.",
        },
        {
          q: "Are there browser requirements?",
          a: "Quizzler works best on modern browsers like Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari. Make sure your browser is updated to the latest version for the best experience.",
        },
        {
          q: "Is Quizzler available on mobile?",
          a: "Yes, Quizzler is responsive and works on mobile devices, tablets, and desktops. You can access all features from your mobile browser.",
        },
      ],
    },
    {
      id: "other",
      title: "Other Questions",
      icon: MessageCircle,
      questions: [
        {
          q: "How do I contact support?",
          a: "You can reach out to our support team through the 'Contact Us' link in the footer. We typically respond within 24-48 hours. For urgent issues, please include 'URGENT' in your subject line.",
        },
        {
          q: "Can I suggest new features?",
          a: "Absolutely! We love hearing from our users. Use the Contact Us form to share your ideas and suggestions. We review all feedback and consider it for future updates.",
        },
        {
          q: "Is Quizzler free to use?",
          a: "Yes, Quizzler is free to use for all users. You can create an account, take quizzes, and access all features without any cost.",
        },
        {
          q: "How do I report a problem or bug?",
          a: "If you encounter a bug or technical issue, please use the Contact Us form and provide as much detail as possible, including what you were doing when the issue occurred and any error messages you saw.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-black bg-white mb-6">
            <HelpCircle className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and learn how to get the most out of Quizzler
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-black mx-auto mb-3" />
              <h3 className="font-bold text-black mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600">New to Quizzler? Start here</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-black mx-auto mb-3" />
              <h3 className="font-bold text-black mb-2">Taking Quizzes</h3>
              <p className="text-sm text-gray-600">Learn how to take and submit quizzes</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-black mx-auto mb-3" />
              <h3 className="font-bold text-black mb-2">Account Help</h3>
              <p className="text-sm text-gray-600">Manage your profile and settings</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            const isOpen = openSections[category.id];
            
            return (
              <Card key={category.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <button
                    onClick={() => toggleSection(category.id)}
                    className="w-full text-left"
                  >
                    <CardTitle className="flex items-center justify-between text-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-black" />
                        {category.title}
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </CardTitle>
                  </button>
                </CardHeader>
                {isOpen && (
                  <CardContent>
                    <div className="space-y-6">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-semibold text-black mb-2">{faq.q}</h4>
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-black mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-4">Still Need Help?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Can't find what you're looking for? Our support team is here to help. 
              Reach out to us through the Contact Us page and we'll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 font-semibold text-black hover:text-white"
            >
              Contact Support
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;

