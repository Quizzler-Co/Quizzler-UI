import { useState } from "react";
import { Eye, Shield, Ban, Search, Filter } from "lucide-react";
import { Card } from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";

const UserAvatar = ({ name, email }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
        {initials}
      </div>
      <div>
        <h4 className="font-semibold text-black">{name}</h4>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
    </div>
  );
};

const UserItem = ({ user }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "suspended":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "moderator":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <UserAvatar name={user.name} email={user.email} />
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-1 rounded text-xs ${getRoleColor(user.role)}`}
          >
            {user.role}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs ${getStatusColor(
              user.status
            )}`}
          >
            {user.status}
          </span>
          <span className="text-sm text-gray-600">
            {user.quizzesCompleted} quizzes
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Shield className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Ban className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      quizzesCompleted: 45,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      quizzesCompleted: 32,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "moderator",
      status: "suspended",
      quizzesCompleted: 78,
    },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-black">User Management</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Users
          </Button>
          <Button variant="outline" size="sm">
            Bulk Actions
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </Card>
  );
};

export default UserManagement;
