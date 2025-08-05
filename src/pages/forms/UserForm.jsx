import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Card } from "../../components/ui-components/Card";
import Button from "../../components/ui-components/Button";
import Input from "../../components/ui-components/Input";
import Label from "../../components/ui-components/Label";
import Avatar from "../../components/ui-components/Avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui-components/Select";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    avatar: "",
    quizzesCompleted: 0,
    totalScore: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Check if we're editing an existing user
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (userId) {
      setIsEdit(true);
      // In a real app, you'd fetch the user data here
      // For demo purposes, let's load some sample data
      const mockUserData = {
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
        avatar: "",
        quizzesCompleted: 45,
        totalScore: 3850,
      };
      setFormData(mockUserData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically send the data to your backend
    toast.success(
      isEdit ? "User updated successfully!" : "User created successfully!"
    );
    setTimeout(() => navigate("/admin"), 1500); // Navigate back after showing toast
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black">
                {isEdit ? "Edit User" : "Create New User"}
              </h1>
              <p className="text-gray-600">
                {isEdit
                  ? "Update user details and permissions"
                  : "Add a new user to the platform"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-black mb-6">User Details</h2>

            {isEdit && formData.name ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={formData.avatar || "/placeholder.svg"}
                    alt={formData.name}
                    size="lg"
                    className="ring-2 ring-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{formData.name}</h3>
                    <p className="text-gray-600">{formData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      {formData.quizzesCompleted}
                    </p>
                    <p className="text-sm text-gray-600">Quizzes Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{formData.totalScore}</p>
                    <p className="text-sm text-gray-600">Total Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      {formData.quizzesCompleted > 0
                        ? Math.round(
                            formData.totalScore / formData.quizzesCompleted
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleGoBack}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>Save Changes</Button>
                </div>
              </div>
            ) : (
              // New user form
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoBack}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create User</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
