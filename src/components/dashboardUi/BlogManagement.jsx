import {
  AlertTriangle,
  Edit3,
  Filter,
  Plus,
  Search,
  Trash2,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../../utils/auth";
import { API_BASE_URL } from "../../config/api";
import Button from "../ui-components/Button";
import { Card } from "../ui-components/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui-components/Dialog";
import Input from "../ui-components/Input";

const BlogItem = ({ blog, onBlogDeleted }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/blog-form?id=${blog.id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // TODO: Replace with actual blog API endpoint when available
      const response = await authenticatedFetch(
        `${API_BASE_URL}/blog/${blog.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success || data.operation === "deleted") {
        const message = data.message || `Blog "${blog.title}" deleted successfully`;
        toast.success(message);
        if (onBlogDeleted) {
          onBlogDeleted(blog.id);
        }
        setShowDeleteModal(false);
      } else {
        throw new Error(data.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Failed to delete blog. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500 text-white";
      case "draft":
        return "bg-yellow-500 text-white";
      case "archived":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-gray-400" />
            <h4 className="font-semibold text-black text-lg">{blog.title}</h4>
          </div>
          {blog.content && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {blog.content.substring(0, 150)}...
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {blog.category && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 border border-gray-200 rounded text-xs">
                {blog.category}
              </span>
            )}
            {blog.status && (
              <span
                className={`px-2 py-1 rounded text-xs ${getStatusColor(
                  blog.status
                )}`}
              >
                {blog.status}
              </span>
            )}
            {blog.tags && blog.tags.length > 0 && (
              <>
                {blog.tags.split(",").slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded text-xs"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </>
            )}
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {formatDate(blog.createdAt || blog.createdDate)}
            </span>
            {blog.author && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">By: {blog.author}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeleteClick}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <div className="p-6">
            <DialogHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle>Delete Blog</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{blog.title}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDeleteCancel}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-slate-700"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Replace with actual blog API endpoint when available
        const response = await authenticatedFetch(
          `${API_BASE_URL}/blog/`
        );

        if (!response.ok) {
          // If endpoint doesn't exist yet, just show empty state
          if (response.status === 404) {
            setBlogs([]);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        // Don't show error if endpoint doesn't exist yet
        if (err.message.includes("404") || err.message.includes("Failed to fetch")) {
          setBlogs([]);
        } else {
          setError("Failed to fetch blogs. Please try again.");
          toast.error("Failed to fetch blogs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = () => {
    navigate("/blog-form");
  };

  const handleBlogDeleted = (deletedBlogId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== deletedBlogId)
    );
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.content &&
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.category &&
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-black">Blog Management</h2>
          <p className="text-gray-600">Create, edit, and manage blog posts</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleAddBlog}>
          <Plus className="h-4 w-4" />
          Add Blog
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blogs..."
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
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No blogs found matching your search."
                : "No blogs available. Create your first blog post!"}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddBlog}>
                <Plus className="h-4 w-4 mr-2" />
                Create Blog
              </Button>
            )}
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <BlogItem
              key={blog.id}
              blog={blog}
              onBlogDeleted={handleBlogDeleted}
            />
          ))
        )}
      </div>
    </Card>
  );
};

export default BlogManagement;

