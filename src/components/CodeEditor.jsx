import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, Loader2, Code2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./ui-components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui-components/Card";
import SubmissionResult from "./SubmissionResult";
import { JudgeService } from "../services/JudgeService";
import toast from "react-hot-toast";

const CodeEditor = ({
  question,
  code,
  onChange,
  onSubmit,
  isSubmitting = false,
  submissionResult = null,
  readOnly = false,
}) => {
  const [localCode, setLocalCode] = useState(code || "");
  const [isRunning, setIsRunning] = useState(false);
  const [problemDetails, setProblemDetails] = useState(null);
  const [loadingProblem, setLoadingProblem] = useState(false);
  const [localSubmissionResult, setLocalSubmissionResult] = useState(submissionResult);

  // Load problem details if problemId exists
  useEffect(() => {
    if (question?.problemId && !problemDetails) {
      loadProblemDetails();
    }
  }, [question?.problemId]);

  // Update local code when prop changes
  useEffect(() => {
    if (code !== undefined) {
      setLocalCode(code || "");
    }
  }, [code]);

  // Update local submission result when prop changes
  useEffect(() => {
    setLocalSubmissionResult(submissionResult);
  }, [submissionResult]);

  // Generate method template
  const getMethodTemplate = () => {
    if (!question) return "// Your code here";
    
    const { methodName, returnType, parameterTypes } = question;
    if (!methodName || !returnType) return "// Your code here";

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

    const params = generateParameters(parameterTypes) || "input";
    const defaultReturn = returnType === "void" 
      ? "" 
      : returnType.includes("[]") 
        ? "return null;" 
        : returnType === "int" 
          ? "return 0;" 
          : returnType === "String" 
            ? "return null;" 
            : "return null;";

    return `public ${returnType} ${methodName}(${params}) {
    // Your code here
    ${defaultReturn}
}`;
  };

  const loadProblemDetails = async () => {
    if (!question?.problemId) return;
    
    setLoadingProblem(true);
    try {
      const response = await JudgeService.getProblem(question.problemId);
      setProblemDetails(response.data);
    } catch (error) {
      toast.error(error.message || "Failed to load problem details");
    } finally {
      setLoadingProblem(false);
    }
  };

  const handleCodeChange = (value) => {
    setLocalCode(value || "");
    if (onChange) {
      onChange(value || "");
    }
  };

  const handleReset = () => {
    const template = getMethodTemplate();
    setLocalCode(template);
    setLocalSubmissionResult(null);
    if (onChange) {
      onChange(template);
    }
    toast.success("Code reset to template");
  };

  const handleRunCode = async () => {
    if (!question?.problemId || !localCode.trim()) {
      toast.error("Please write some code before submitting");
      return;
    }

    setIsRunning(true);
    setLocalSubmissionResult(null); // Clear previous result
    
    try {
      console.log("Submitting code for problem:", question.problemId);
      const response = await JudgeService.submitCode(question.problemId, localCode);
      console.log("Submission response:", response);
      console.log("Response keys:", Object.keys(response));
      
      const result = response.data;
      console.log("Submission result data:", result);
      console.log("Result keys:", result ? Object.keys(result) : "null");
      console.log("Result verdict:", result?.verdict);
      console.log("Result status:", result?.status);
      console.log("Result result:", result?.result);
      
      // Check if result is valid - if it has a verdict, it's a valid submission result
      if (!result) {
        console.error("No result data received from JudgeService");
        setLocalSubmissionResult({
          verdict: "ERROR",
          message: "No response data received from server",
        });
        return;
      }
      
      // Ensure verdict exists (should be normalized by JudgeService, but double-check)
      if (!result.verdict && !result.status && !result.result) {
        console.error("Result received but no verdict/status field found:", result);
        setLocalSubmissionResult({
          verdict: "ERROR",
          message: result.message || "Unexpected response format from server",
          ...result,
        });
        return;
      }
      
      // Normalize verdict if needed
      const normalizedResult = {
        ...result,
        verdict: result.verdict || result.status || result.result,
      };
      
      console.log("Normalized result:", normalizedResult);
      
      // Always set the result locally so it displays
      setLocalSubmissionResult(normalizedResult);
      
      if (onSubmit) {
        onSubmit({
          code: localCode,
          submissionResult: normalizedResult,
        });
      }

      // Only show toast for success - errors are shown in SubmissionResult component
      if (normalizedResult.verdict === "ACCEPTED") {
        toast.success("Code accepted! All test cases passed.", { duration: 3000 });
      }
      // Don't show toast for WRONG_ANSWER, COMPILATION_ERROR, RUNTIME_ERROR
      // These are expected results and will be displayed in SubmissionResult component
    } catch (error) {
      console.error("Code execution error:", error);
      
      // Only treat as service unavailable if it's a network/connection error
      // NOT if it's a compilation/runtime error from the backend
      const isServiceUnavailable = error.message && (
        (error.message.includes("Service is unavailable") || 
         error.message.includes("unavailable")) &&
        !error.message.includes("COMPILATION") &&
        !error.message.includes("RUNTIME")
      ) || (
        error.message.includes("503") || 
        error.message.includes("502")
      ) && !error.message.includes("COMPILATION") && !error.message.includes("RUNTIME");
      
      // Create an error result object to display
      const errorResult = {
        verdict: "ERROR",
        message: error.message || "Failed to execute code. Please check your connection and try again.",
        expectedOutput: null,
        actualOutput: null,
        isServiceError: isServiceUnavailable,
      };
      
      setLocalSubmissionResult(errorResult);
      
      // Show toast ONLY for actual service connectivity issues, not for compilation/runtime errors
      if (isServiceUnavailable) {
        toast.error("Judge Service is currently unavailable. Please try again later.", { duration: 5000 });
      } else if (error.message && (
        error.message.includes("Unable to connect") ||
        error.message.includes("Network error") ||
        error.message.includes("Failed to fetch")
      )) {
        toast.error(error.message || "Failed to connect to server. Please check your connection.");
      }
      // Don't show toast for compilation/runtime errors - they're shown in SubmissionResult
    } finally {
      setIsRunning(false);
    }
  };

  const displayProblem = problemDetails || question;
  const methodSignature = question?.methodName && question?.returnType
    ? `public ${question.returnType} ${question.methodName}(${question.parameterTypes || "input"} input)`
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: '600px' }}>
      {/* Left Side: Problem Description */}
      <div className="flex flex-col h-full">
        {displayProblem && (
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                {displayProblem.title || "Coding Problem"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {displayProblem.description && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {displayProblem.description}
                  </p>
                </div>
              )}

              {methodSignature && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Method Signature:
                  </p>
                  <code className="text-sm text-blue-600 font-mono break-all">
                    {methodSignature}
                  </code>
                </div>
              )}

              {displayProblem.inputType && displayProblem.outputType && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Input Type: </span>
                    <code className="text-blue-600">{displayProblem.inputType}</code>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Output Type: </span>
                    <code className="text-blue-600">{displayProblem.outputType}</code>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Side: Code Editor */}
      <div className="flex flex-col h-full">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle>Code Editor</CardTitle>
              {/* Action Buttons in Header */}
              {!readOnly && (
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleReset}
                      disabled={isRunning || isSubmitting}
                      className="flex items-center gap-2"
                      size="sm"
                      variant="outline"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning || isSubmitting || !localCode.trim()}
                      className="flex items-center gap-2"
                      size="sm"
                    >
                      {(isRunning || isSubmitting) ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Running...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Run Code</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
            <div className="border border-gray-300 rounded-lg overflow-hidden flex-1" style={{ height: '450px', minHeight: '450px' }}>
              <Editor
                height="450px"
                language="java"
                value={localCode || getMethodTemplate()}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  readOnly: readOnly,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submission Result - Always visible below editor */}
        {(localSubmissionResult || submissionResult) && (
          <div className="mt-4">
            <SubmissionResult result={localSubmissionResult || submissionResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;

