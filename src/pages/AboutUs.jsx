import React from "react";
import { Users, Award, BookOpen, Target, Heart, Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui-components/Card";

const AboutUs = () => {
  const teamMembers = [
    { name: "Mr. Vaibhav Virulkar", role: "Project Guide", icon: Award },
    { name: "Mr. Prashant Deshpande", role: "Project Guide", icon: Award },
  ];

  const features = [
    {
      icon: Target,
      title: "Role-Based Access",
      description:
        "Powerful admin controls with secure user management and comprehensive quiz oversight.",
    },
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description:
        "Engaging quizzes with instant feedback and detailed performance tracking.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Competitive leaderboards that motivate learning and foster healthy competition.",
    },
  ];

  const techStack = [
    {
      name: "Frontend",
      tech: "React.js - Responsive & Intuitive UI",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      name: "Backend",
      tech: "Spring Boot - Robust & Scalable",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      name: "Security",
      tech: "Spring Security & JWT - Enterprise-grade",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      name: "Database",
      tech: "Secure Data Management",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            About Quizzler
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A modern, full-stack quiz management system designed to make quiz
            creation, participation, and evaluation simple and efficient.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Heart className="h-6 w-6 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our core mission is to create a dynamic learning environment where
              administrators can effortlessly create and manage quizzes,
              questions, and users with a powerful, role-based control system.
              Users can engage with a wide range of quizzes, receive instant
              feedback on their performance, and track their progress through a
              competitive leaderboard.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            What Makes Quizzler Special
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

        {/* Technology Stack */}
        <Card className="mb-12 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Code className="h-6 w-6 text-blue-500" />
              Built with Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We've implemented a robust technical stack to ensure our platform
              is both reliable and extensible:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {techStack.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                >
                  <span className="font-medium text-gray-800">
                    {item.name}:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${item.color}`}
                  >
                    {item.tech}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Project Section */}
        <Card className="mb-12 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BookOpen className="h-6 w-6 text-green-500" />
              Academic Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Quizzler was developed by a dedicated team of PG-DAC students from
              the
              <strong>
                {" "}
                Institute for Advanced Computing and Software Development
                (IACSD)
              </strong>{" "}
              in Akurdi, Pune. As part of our academic project, we focused on
              building a secure, scalable, and user-friendly application that
              demonstrates best practices in full-stack development.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This project represents our commitment to creating innovative
              solutions that bridge the gap between theoretical knowledge and
              practical application in the field of software development.
            </p>
          </CardContent>
        </Card>

        {/* Team & Acknowledgments */}
        <Card className="mb-12 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-6 w-6 text-purple-500" />
              Our Mentors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We extend our heartfelt gratitude to our project guides whose
              invaluable guidance and support were instrumental in shaping
              Quizzler into a valuable academic and technical project:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {teamMembers.map((member, index) => {
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

        {/* Vision Statement */}
        <Card className="text-center hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Quizzler is more than just a quiz application; it's a tool for
              knowledge assessment and continuous learning. We believe in the
              power of instant feedback and structured evaluation to motivate
              users and help them achieve their learning goals.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16 mb-8">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience the future of quiz-based learning?
          </p>
          <button className="group relative inline-flex items-center justify-center h-12 px-8 overflow-hidden rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] cursor-pointer select-none font-bold text-black group-hover:text-white tracking-tight">
            <Target className="mr-2 h-5 w-5 flex-shrink-0" />
            Start Your Learning Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
