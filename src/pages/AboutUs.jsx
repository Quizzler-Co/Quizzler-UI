import React from "react";
import { Users, BookOpen, Target, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui-components/Card";

const AboutUs = () => {
  const founders = [
    {
      name: "Aniket Baghel",
      role: "Co-Founder • UI/UX & Frontend Design",
      icon: Users,
    },
    {
      name: "Vedang Hinge",
      role: "Co-Founder • System Architecture & Backend Logic",
      icon: Users,
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Role-Based Access",
      description:
        "Streamlined controls that make managing users, quizzes, and admin workflows effortless.",
    },
    {
      icon: BookOpen,
      title: "Interactive Experience",
      description:
        "A clean, intuitive quiz flow designed to help users focus on learning — not friction.",
    },
    {
      icon: Users,
      title: "Competition & Progress",
      description:
        "Leaderboards and performance insights that motivate users and boost engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            About Quizzler
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Quizzler is a modern, user-focused quiz platform designed to make
            assessments fast, smooth, and enjoyable. A clean interface, simple
            controls, and a frictionless quiz experience — built for everyone.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Heart className="h-6 w-6 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to create a simple and effective digital assessment
              experience. No unnecessary complexity — just a clean interface,
              fast loading, quick evaluation, and a system that works reliably
              every time.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            What Makes Quizzler Stand Out
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-black bg-white mb-6">
                      <IconComponent className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Founders Section */}
        <Card className="mb-12 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-6 w-6 text-purple-500" />
              Founders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Quizzler is built and led by a two-member founding team committed
              to creating a smooth, reliable, and enjoyable assessment
              experience. With complementary strengths in design and system
              engineering, the platform blends clean UI with strong foundations.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {founders.map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full border-2 border-black bg-white">
                      <IconComponent className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{member.name}</h4>
                      <p className="text-gray-600">{member.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="text-center hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              We aim to make Quizzler the simplest, fastest, and most reliable
              quiz experience for learners and organizations. A platform where
              speed, clarity, and ease of use come first — and where learning
              feels effortless.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16 mb-8">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience a smoother way to take quizzes?
          </p>
          <button className="group relative inline-flex items-center justify-center h-12 px-8 overflow-hidden rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] cursor-pointer select-none font-bold text-black group-hover:text-white tracking-tight">
            <Target className="mr-2 h-5 w-5 flex-shrink-0" />
            Start Your Journey
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
