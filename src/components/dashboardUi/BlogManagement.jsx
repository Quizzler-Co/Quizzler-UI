import { useState } from "react";
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { Card } from "../ui-components/Card";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";

const BlogItem = ({ blog }) => {
  const handleEdit = () => {
    window.open(`/blog-form?id=${blog.id}`, "_blank");
  };

  const handleView = () => {
    alert(`View blog: ${blog.title}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      alert(`Blog "${blog.title}" deleted`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500 text-white";
      case "draft":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Tips":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Education":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Guide":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h4 className="font-semibold text-black text-lg">{blog.title}</h4>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-sm text-gray-600">by {blog.author}</span>
          <span
            className={`px-2 py-1 rounded text-xs ${getCategoryColor(
              blog.category
            )}`}
          >
            {blog.category}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs ${getStatusColor(
              blog.status
            )}`}
          >
            {blog.status}
          </span>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="h-3 w-3" />
            <span>{blog.publishDate}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Eye className="h-3 w-3" />
            <span>{blog.views} views</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleView}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockBlogs = [
    {
      id: "1",
      title: "10 Tips to Improve Your Quiz Performance",
      author: "Admin",
      status: "published",
      publishDate: "2024-03-15",
      views: 1250,
      category: "Tips",
    },
    {
      id: "2",
      title: "The Science Behind Memory and Learning",
      author: "Dr. Sarah Wilson",
      status: "draft",
      publishDate: "2024-03-10",
      views: 0,
      category: "Education",
    },
    {
      id: "3",
      title: "Quiz Categories Explained",
      author: "Admin",
      status: "published",
      publishDate: "2024-03-08",
      views: 890,
      category: "Guide",
    },
  ];

  const filteredBlogs = mockBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-black">Blog Management</h2>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => window.open("/blog-form", "_blank")}
        >
          <Plus className="h-4 w-4" />
          Add Blog Post
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blog posts..."
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
        {filteredBlogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </Card>
  );
};

export default BlogManagement;
