
const AuthBenefitsCard = () => {
  const benefits = [
    "Track your progress",
    "Compete globally",
    "Earn achievements",
    "Join leaderboards",
  ];

  return (
    <div className="bg-black/5 border border-black/20 rounded-lg p-4">
      <div className="pb-3">
        <h3 className="text-sm font-medium">🎯 Join QuizMaster Today</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthBenefitsCard;
