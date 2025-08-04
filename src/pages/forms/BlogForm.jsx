import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Image } from "lucide-react";
import { Card } from "../../components/ui-components/Card";
import Button from "../../components/ui-components/Button";
import Input from "../../components/ui-components/Input";
import Label from "../../components/ui-components/Label";

const BlogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    status: "draft",
    featuredImage: "",
    tags: "",
    excerpt: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Check if we're editing an existing blog post
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    if (blogId) {
      setIsEdit(true);
      // In a real app, you'd fetch the blog data here
      // For now, we'll just show it's in edit mode
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
      isEdit
        ? "Blog post updated successfully!"
        : "Blog post created successfully!"
    );
    setTimeout(() => navigate("/admin"), 1500); // Navigate back after showing toast
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  const handlePublish = () => {
    setFormData((prev) => ({ ...prev, status: "published" }));
    handleSubmit(new Event("submit"));
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
                {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-gray-600">
                {isEdit
                  ? "Update blog post content and settings"
                  : "Write a new blog post for the platform"}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-black mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                  >
                    <option value="">Select category</option>
                    <option value="tips">Tips</option>
                    <option value="education">Education</option>
                    <option value="guide">Guide</option>
                    <option value="news">News</option>
                    <option value="tutorial">Tutorial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Author name"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief description of the blog post"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Enter tags separated by commas"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-gray-500">
                  Separate tags with commas (e.g., quiz, learning, tips)
                </p>
              </div>
            </div>
          </Card>

          {/* Featured Image */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-black mb-4">
              Featured Image
            </h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="featuredImage" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload featured image
                    </span>
                    <input
                      id="featuredImage"
                      name="featuredImage"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleInputChange}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Content */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-black mb-4">Content *</h2>
            <div className="space-y-2">
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
              />
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-black mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  placeholder="SEO title for search engines"
                  maxLength={60}
                />
                <p className="text-sm text-gray-500">
                  Recommended: 50-60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  placeholder="SEO description for search engines"
                  rows={2}
                  maxLength={160}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                />
                <p className="text-sm text-gray-500">
                  Recommended: 150-160 characters
                </p>
              </div>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button
                type="button"
                onClick={handlePublish}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isEdit ? "Update & Publish" : "Publish"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
