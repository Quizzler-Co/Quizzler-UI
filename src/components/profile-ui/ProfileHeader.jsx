import React from "react";
import { Camera } from "lucide-react";
import { Card, CardContent } from "../ui-components/Card";
import Avatar from "../ui-components/Avatar";
import { SimpleBadge } from "../ui-components/SimpleBadge";

const ProfileHeader = ({
  user,
  userStats,
  userAchievements,
  isUploadingAvatar,
  onAvatarUpload,
}) => {
  return (
    <Card className="mb-8 animate-in slide-in-from-bottom-4 duration-700">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Section */}
          <div className="relative group">
            <Avatar
              src={user.avatar}
              alt={user.name}
              size="lg"
              className="h-24 w-24 transition-all duration-300 group-hover:scale-105"
            />
            <label
              className={`absolute -bottom-2 -right-2 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:scale-110 ${
                isUploadingAvatar
                  ? "opacity-50 cursor-not-allowed animate-pulse"
                  : "hover:shadow-lg"
              }`}
            >
              <Camera className="h-3 w-3" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onAvatarUpload}
                disabled={isUploadingAvatar}
              />
            </label>
            {isUploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-black">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <SimpleBadge
                variant="purple"
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {user.rank}
              </SimpleBadge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105">
                <div className="text-xl sm:text-2xl font-bold text-blue-800">
                  {userStats.totalQuizzes}
                </div>
                <div className="text-xs sm:text-sm text-blue-600">
                  Quizzes Taken
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:scale-105">
                <div className="text-xl sm:text-2xl font-bold text-green-800">
                  {userStats.averageScore}%
                </div>
                <div className="text-xs sm:text-sm text-green-600">
                  Average Score
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105">
                <div className="text-xl sm:text-2xl font-bold text-purple-800">
                  {userAchievements.length}
                </div>
                <div className="text-xs sm:text-sm text-purple-600">
                  Achievements
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
