import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Code2, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui-components/Card";
import Button from "../components/ui-components/Button";
import CodeEditor from "../components/CodeEditor";
import { JudgeService } from "../services/JudgeService";
import { UserService } from "../services/UserService";
import toast from "react-hot-toast";

const ProblemDetail = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    if (!UserService.isAuthenticated()) {
      toast.error("Please log in to solve problems");
      navigate("/");
      return;
    }
    loadProblem();
  }, [problemId, navigate]);

  const loadProblem = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await JudgeService.getProblem(problemId);
      const problemData = response.data;
      setProblem(problemData);
      
      // Generate method template
      if (problemData.methodName && problemData.returnType) {
        // Parse parameter types and generate parameter names
        const generateParameters = (paramTypes) => {
          if (!paramTypes || paramTypes.trim() === "") return "";
          
          // Split by comma and clean up
          const types = paramTypes.split(",").map(t => t.trim()).filter(t => t);
          
          if (types.length === 0) return "";
          
          // Generate parameter names based on type
          const paramNames = types.map((type, index) => {
            // Remove array brackets for name generation
            const baseType = type.replace(/\[\]/g, "").trim();
            
            // Generate a meaningful parameter name
            let paramName;
            if (baseType === "int") {
              paramName = `num${index > 0 ? index + 1 : ""}`;
            } else if (baseType === "String") {
              paramName = `str${index > 0 ? index + 1 : ""}`;
            } else if (baseType === "boolean") {
              paramName = `flag${index > 0 ? index + 1 : ""}`;
            } else if (baseType === "double" || baseType === "float") {
              paramName = `value${index > 0 ? index + 1 : ""}`;
            } else if (baseType === "long") {
              paramName = `num${index > 0 ? index + 1 : ""}`;
            } else {
              // For custom types, use lowercase first letter + rest
              paramName = baseType.charAt(0).toLowerCase() + baseType.slice(1) + (index > 0 ? index + 1 : "");
            }
            
            // Restore array brackets if they were present
            const fullType = type.includes("[]") ? baseType + "[]" : baseType;
            return `${fullType} ${paramName}`;
          });
          
          return paramNames.join(", ");
        };

        const params = generateParameters(problemData.parameterTypes) || "input";
        const defaultReturn = problemData.returnType === "void" 
          ? "" 
          : problemData.returnType.includes("[]") 
            ? "return null;" 
            : problemData.returnType === "int" 
              ? "return 0;" 
              : problemData.returnType === "String" 
                ? "return null;" 
                : "return null;";

        const template = `public ${problemData.returnType} ${problemData.methodName}(${params}) {
    // Your code here
    ${defaultReturn}
}`;
        setCode(template);
      }
    } catch (err) {
      console.error("Error loading problem:", err);
      setError(err.message || "Failed to load problem");
      toast.error(err.message || "Failed to load problem");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = async (solution) => {
    setSubmissionResult(solution.submissionResult);
    
    if (solution.submissionResult?.verdict === "ACCEPTED") {
      toast.success("Congratulations! Your solution is correct!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading problem...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">
                  {error || "Problem not found"}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate("/problems")} variant="outline">
                    Back to Problems
                  </Button>
                  <Button onClick={loadProblem}>Try Again</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Convert problem to question format for CodeEditor
  const questionForEditor = {
    id: problem.id,
    type: "CODING",
    problemId: problem.id,
    title: problem.title,
    description: problem.description,
    methodName: problem.methodName,
    parameterTypes: problem.parameterTypes,
    returnType: problem.returnType,
    inputType: problem.inputType,
    outputType: problem.outputType,
    difficulty: problem.difficulty?.toLowerCase() || "medium",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => navigate("/problems")}
            variant="outline"
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Problems
          </Button>
          <div className="flex items-center gap-3">
            <Code2 className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
          </div>
        </div>

        {/* Code Editor */}
        <CodeEditor
          question={questionForEditor}
          code={code}
          onChange={handleCodeChange}
          onSubmit={handleSubmit}
          submissionResult={submissionResult}
        />
      </div>
    </div>
  );
};

export default ProblemDetail;

