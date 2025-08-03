import { Brain, Clock, Trophy } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Timed Challenges",
      description:
        "Race against the clock with our exciting timed quiz modes that keep you on your toes and boost your quick thinking skills.",
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description:
        "Compete with players worldwide and see how you rank on our global leaderboards. Climb to the top and earn bragging rights.",
    },
    {
      icon: Brain,
      title: "Multiple Categories",
      description:
        "From science to sports, history to pop culture - find quizzes that match your interests and expand your knowledge.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-black">
              Why Choose Quizzler?
            </h2>
            <p className="max-w-[800px] mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
              Experience the ultimate quiz platform with features designed to
              make learning fun, engaging, and rewarding.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-black bg-white group-hover:bg-black group-hover:border-white transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-black group-hover:bg-white transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center justify-center h-12 px-8 overflow-hidden rounded-full border-2 border-black bg-white hover:bg-black transition-all duration-300 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transform hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] cursor-pointer select-none font-bold text-black group-hover:text-white tracking-tight">
            <Brain className="mr-2 h-5 w-5 flex-shrink-0" />
            Start Exploring Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
