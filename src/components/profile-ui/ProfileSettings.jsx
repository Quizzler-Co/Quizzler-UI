import React from "react";
import { User, Edit2, Save, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";

const ProfileSettings = ({
  user,
  isEditingProfile,
  editedProfile,
  isUpdatingProfile,
  onEditProfile,
  onSaveProfile,
  onCancelEdit,
  onProfileChange,
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <User className="h-5 w-5" />
            Profile Information
          </span>
          {!isEditingProfile && (
            <Button
              onClick={onEditProfile}
              size="sm"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            {isEditingProfile ? (
              <Input
                value={editedProfile.name}
                onChange={(e) => onProfileChange("name", e.target.value)}
                placeholder="Enter your name"
                disabled={isUpdatingProfile}
              />
            ) : (
              <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
                {user.name}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            {isEditingProfile ? (
              <Input
                type="email"
                value={editedProfile.email}
                onChange={(e) => onProfileChange("email", e.target.value)}
                placeholder="Enter your email"
                disabled={isUpdatingProfile}
              />
            ) : (
              <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
                {user.email}
              </div>
            )}
          </div>
          {isEditingProfile && (
            <div className="flex gap-2">
              <Button onClick={onSaveProfile} disabled={isUpdatingProfile}>
                {isUpdatingProfile ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                onClick={onCancelEdit}
                variant="outline"
                disabled={isUpdatingProfile}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
