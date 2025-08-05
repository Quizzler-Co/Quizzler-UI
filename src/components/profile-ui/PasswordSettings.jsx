import React from "react";
import { Lock, Save, X, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";

const PasswordSettings = ({
  isChangingPassword,
  passwordData,
  showPasswords,
  isUpdatingPassword,
  onStartPasswordChange,
  onPasswordChange,
  onSavePassword,
  onCancelPasswordChange,
  onTogglePasswordVisibility,
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <Lock className="h-5 w-5" />
            Password Settings
          </span>
          {!isChangingPassword && (
            <Button
              onClick={onStartPasswordChange}
              size="sm"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isChangingPassword ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    onPasswordChange("currentPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                  disabled={isUpdatingPassword}
                />
                <button
                  type="button"
                  onClick={() => onTogglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    onPasswordChange("newPassword", e.target.value)
                  }
                  placeholder="Enter new password"
                  disabled={isUpdatingPassword}
                />
                <button
                  type="button"
                  onClick={() => onTogglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    onPasswordChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm new password"
                  disabled={isUpdatingPassword}
                />
                <button
                  type="button"
                  onClick={() => onTogglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={onSavePassword} disabled={isUpdatingPassword}>
                {isUpdatingPassword ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </>
                )}
              </Button>
              <Button
                onClick={onCancelPasswordChange}
                variant="outline"
                disabled={isUpdatingPassword}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            Password was last updated on {new Date().toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordSettings;
