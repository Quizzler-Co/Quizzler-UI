import { useState } from "react";
import toast from "react-hot-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui-components/Tabs";
import {
  ProfileHeader,
  QuizHistory,
  ProfileSettings,
  PasswordSettings,
} from "../components/profile-ui";
import { UserService } from "../services/UserService";

const Profile = () => {
  // Mock user data - in real app this would come from auth context/API
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
    joinDate: "2024-01-15",
    totalQuizzes: 24,
    averageScore: 78,
    rank: "Expert",
    achievements: [
      { id: 1, name: "First Quiz", icon: "🎯", earnedDate: "2024-01-15" },
      { id: 2, name: "Speed Demon", icon: "⚡", earnedDate: "2024-02-01" },
      { id: 3, name: "Knowledge Seeker", icon: "📚", earnedDate: "2024-03-10" },
      { id: 4, name: "Perfect Score", icon: "💯", earnedDate: "2024-04-05" },
    ],
  });

  // Mock quiz participation data
  const [participations] = useState([
    {
      id: 1,
      quizTitle: "General Knowledge",
      category: "Mixed",
      score: 85,
      totalQuestions: 10,
      completedAt: "2024-08-05",
      duration: "5:23",
      rank: "A",
    },
    {
      id: 2,
      quizTitle: "Science Fundamentals",
      category: "Science",
      score: 72,
      totalQuestions: 15,
      completedAt: "2024-08-04",
      duration: "8:45",
      rank: "B",
    },
    {
      id: 3,
      quizTitle: "World History",
      category: "History",
      score: 90,
      totalQuestions: 12,
      completedAt: "2024-08-03",
      duration: "6:12",
      rank: "A+",
    },
    {
      id: 4,
      quizTitle: "Geography Challenge",
      category: "Geography",
      score: 68,
      totalQuestions: 20,
      completedAt: "2024-08-02",
      duration: "12:30",
      rank: "B-",
    },
  ]);

  // State for editing profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user.name,
    email: user.email,
  });

  // State for password reset
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for loading states
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Calculate user statistics using UserService
  const userStats = UserService.calculateUserStats(participations);
  const userAchievements = UserService.generateAchievements(
    user,
    participations
  );

  // Update user rank based on average score
  const updatedUser = {
    ...user,
    rank: UserService.getUserRank(userStats.averageScore),
    achievements: userAchievements,
  };

  // Handle profile editing with service validation
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setEditedProfile({
      name: updatedUser.name,
      email: updatedUser.email,
    });
  };

  const handleSaveProfile = async () => {
    setIsUpdatingProfile(true);
    try {
      const result = await UserService.updateProfile(editedProfile);
      if (result.success) {
        setUser((prev) => ({
          ...prev,
          name: editedProfile.name,
          email: editedProfile.email,
        }));
        setIsEditingProfile(false);
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditedProfile({
      name: updatedUser.name,
      email: updatedUser.email,
    });
  };

  // Handle password change with service validation
  const handlePasswordChange = async () => {
    setIsUpdatingPassword(true);
    try {
      const result = await UserService.changePassword(passwordData);
      if (result.success) {
        toast.success(result.message);
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Handle avatar upload with service validation
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const result = await UserService.uploadAvatar(file);
      if (result.success) {
        setUser((prev) => ({
          ...prev,
          avatar: result.avatarUrl,
        }));
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Get rank color using service
  const getRankColor = (rank) => UserService.getRankColor(rank);

  // Handler functions for component callbacks
  const handleProfileChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordDataChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTogglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleStartPasswordChange = () => {
    setIsChangingPassword(true);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader
          user={updatedUser}
          userStats={userStats}
          userAchievements={userAchievements}
          isUploadingAvatar={isUploadingAvatar}
          onAvatarUpload={handleAvatarUpload}
        />

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="history"
          className="animate-in slide-in-from-bottom-6 duration-700"
        >
          <TabsList className="mb-6 bg-white shadow-sm border">
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600"
            >
              Quiz History
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-700 data-[state=active]:to-gray-800"
            >
              Account Settings
            </TabsTrigger>
          </TabsList>

          {/* Quiz History Tab */}
          <TabsContent
            value="history"
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <QuizHistory
              participations={participations}
              getRankColor={getRankColor}
            />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent
            value="settings"
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="space-y-6">
              {/* Profile Settings */}
              <ProfileSettings
                user={updatedUser}
                isEditingProfile={isEditingProfile}
                editedProfile={editedProfile}
                isUpdatingProfile={isUpdatingProfile}
                onEditProfile={handleEditProfile}
                onSaveProfile={handleSaveProfile}
                onCancelEdit={handleCancelEdit}
                onProfileChange={handleProfileChange}
              />

              {/* Password Settings */}
              <PasswordSettings
                isChangingPassword={isChangingPassword}
                passwordData={passwordData}
                showPasswords={showPasswords}
                isUpdatingPassword={isUpdatingPassword}
                onStartPasswordChange={handleStartPasswordChange}
                onPasswordChange={handlePasswordDataChange}
                onSavePassword={handlePasswordChange}
                onCancelPasswordChange={handleCancelPasswordChange}
                onTogglePasswordVisibility={handleTogglePasswordVisibility}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
