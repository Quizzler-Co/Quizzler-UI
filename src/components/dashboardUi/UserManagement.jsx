import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Shield,
  Ban,
  Search,
  Filter,
  Plus,
  Edit,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import { UserService } from "../../services/UserService";

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

const UserItem = ({ user, navigate }) => {
  const handleEdit = () => {
    navigate(`/admin/forms/user?id=${user.id}`);
  };

  const handleView = () => {
    toast.success(`Viewing user: ${user.name}`);
  };

  const handleBan = () => {
    if (window.confirm(`Are you sure you want to ban "${user.name}"?`)) {
      toast.success(`User "${user.name}" banned successfully`);
    }
  };

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
          {user.userName && user.userName !== user.name && (
            <span className="text-sm text-gray-500">@{user.userName}</span>
          )}
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
          <span className="text-sm text-gray-600">ID: {user.id}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleView}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleBan}>
          <Ban className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await UserService.getAllUsers();

        // Transform API data to match component expectations
        const transformedUsers = response.data.map((user) => ({
          id: user.id.toString(),
          name: user.name || "Unknown",
          email: user.email || "No email",
          userName: user.userName || user.name || "Unknown",
          role: "user", // Default role since API doesn't provide this
          status: "active", // Default status since API doesn't provide this
          quizzesCompleted: 0, // Default value since API doesn't provide this
          totalScore: 0, // Default value since API doesn't provide this
        }));

        setUsers(transformedUsers);
        console.log("Users loaded successfully:", transformedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
        toast.error(`Failed to load users: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-black">User Management</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name, email, or username..."
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

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-gray-600">Loading users...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">Error: {error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {searchTerm
                  ? "No users found matching your search."
                  : "No users found."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <UserItem key={user.id} user={user} navigate={navigate} />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      )}
    </Card>
  );
};

export default UserManagement;
