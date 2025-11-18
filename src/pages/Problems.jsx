import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Filter, Search, Loader2, AlertCircle, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui-components/Card";
import Button from "../components/ui-components/Button";
import Input from "../components/ui-components/Input";
import { SimpleBadge } from "../components/ui-components/SimpleBadge";
import { JudgeService } from "../services/JudgeService";
import { UserService } from "../services/UserService";
import toast from "react-hot-toast";

const Problems = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");

  useEffect(() => {
    if (!UserService.isAuthenticated()) {
      toast.error("Please log in to view coding problems");
      navigate("/");
      return;
    }
    loadProblems();
  }, [navigate]);

  useEffect(() => {
    filterProblems();
  }, [searchTerm, selectedDifficulty, problems]);

  const loadProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await JudgeService.getAllProblems();
      setProblems(response.data || []);
    } catch (err) {
      console.error("Error loading problems:", err);
      setError(err.message || "Failed to load problems");
      toast.error(err.message || "Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  const filterProblems = () => {
    let filtered = [...problems];

    // Filter by difficulty
    if (selectedDifficulty !== "ALL") {
      filtered = filtered.filter(
        (p) => p.difficulty?.toUpperCase() === selectedDifficulty
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.methodName?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProblems(filtered);
  };

  const handleProblemClick = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "success";
      case "MEDIUM":
        return "warning";
      case "HARD":
        return "danger";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading problems...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isConnectionError = error.includes("Unable to connect") || error.includes("Failed to fetch");
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center max-w-md">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isConnectionError ? "Connection Error" : "Error Loading Problems"}
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                {isConnectionError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-left">
                    <p className="text-sm text-yellow-800 font-semibold mb-2">Troubleshooting Steps:</p>
                    <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                      <li>Ensure the API Gateway is running on port 8086</li>
                      <li>Check if the Judge Service is registered in Eureka</li>
                      <li>Verify network connectivity</li>
                      <li>Check browser console for detailed error logs</li>
                    </ul>
                  </div>
                )}
                <div className="flex gap-3 justify-center">
                  <Button onClick={loadProblems}>Try Again</Button>
                  <Button onClick={() => navigate("/")} variant="outline">
                    Go Home
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Coding Problems</h1>
          </div>
          <p className="text-gray-600">
            Practice coding problems and improve your Java skills
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search problems by title, description, or method name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="ALL">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProblems.length} of {problems.length} problems
          </div>
        </Card>

        {/* Problems Grid */}
        {filteredProblems.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <Code2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Problems Found
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedDifficulty !== "ALL"
                  ? "Try adjusting your search or filter criteria."
                  : "No coding problems available at the moment."}
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <Card
                key={problem.id}
                onClick={() => handleProblemClick(problem.id)}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                      {problem.title || "Untitled Problem"}
                    </CardTitle>
                    <SimpleBadge variant={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty || "N/A"}
                    </SimpleBadge>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  {problem.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {problem.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {problem.methodName && (
                      <div className="flex items-center gap-1">
                        <Code2 className="h-3 w-3" />
                        <code className="font-mono">{problem.methodName}</code>
                      </div>
                    )}
                    {problem.returnType && (
                      <div>
                        Returns: <code className="font-mono">{problem.returnType}</code>
                      </div>
                    )}
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Solve Problem
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;

