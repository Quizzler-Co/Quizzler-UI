import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui-components/Card";
import { SimpleBadge } from "./ui-components/SimpleBadge";

const SubmissionResult = ({ result }) => {
  if (!result) return null;

  const { verdict, message, expectedOutput, actualOutput } = result;
  
  // Debug logging
  console.log("SubmissionResult received:", result);

  // Determine verdict styling
  const getVerdictConfig = () => {
    switch (verdict) {
      case "ACCEPTED":
        return {
          icon: CheckCircle2,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          badgeVariant: "success",
          label: "Accepted",
        };
      case "WRONG_ANSWER":
        return {
          icon: XCircle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          badgeVariant: "warning",
          label: "Wrong Answer",
        };
      case "COMPILATION_ERROR":
      case "RUNTIME_ERROR":
      case "ERROR":
        return {
          icon: AlertCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          badgeVariant: "danger",
          label: verdict.replace("_", " "),
        };
      default:
        return {
          icon: Code2,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          badgeVariant: "outline",
          label: verdict || "Unknown",
        };
    }
  };

  const config = getVerdictConfig();
  const Icon = config.icon;

  const formatOutput = (output) => {
    if (output === null || output === undefined) return "null";
    if (typeof output === "object") {
      try {
        return JSON.stringify(output, null, 2);
      } catch {
        return String(output);
      }
    }
    return String(output);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <span>Submission Result</span>
            <SimpleBadge variant={config.badgeVariant} className="ml-auto">
              {config.label}
            </SimpleBadge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Always show verdict and message */}
          <div className={`p-3 rounded-lg ${config.bgColor}`}>
            <p className={`text-sm ${config.color} font-medium`}>
              {message || `Execution completed with verdict: ${verdict || "UNKNOWN"}`}
            </p>
          </div>
          
          {/* Output Comparison (for WRONG_ANSWER) */}
          {verdict === "WRONG_ANSWER" && (expectedOutput !== undefined || actualOutput !== undefined) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Expected Output */}
              {expectedOutput !== undefined && expectedOutput !== null && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Expected Output
                  </h4>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap text-green-700">
                      {formatOutput(expectedOutput)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Actual Output */}
              {actualOutput !== undefined && actualOutput !== null && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Your Output
                  </h4>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap text-red-700">
                      {formatOutput(actualOutput)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Compilation Error Details */}
          {verdict === "COMPILATION_ERROR" && (
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Compilation Error
              </h4>
              <div className="font-mono text-sm text-red-600 whitespace-pre-wrap bg-red-50 p-3 rounded border border-red-100">
                {message || "Your code failed to compile. Please check for syntax errors."}
              </div>
              {actualOutput && (
                <div className="mt-3">
                  <h5 className="text-xs font-semibold text-red-600 mb-1">Compiler Output:</h5>
                  <div className="font-mono text-xs text-red-700 whitespace-pre-wrap bg-red-50 p-2 rounded border border-red-100">
                    {formatOutput(actualOutput)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Runtime Error Details */}
          {verdict === "RUNTIME_ERROR" && (
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Runtime Error
              </h4>
              <div className="font-mono text-sm text-red-600 whitespace-pre-wrap bg-red-50 p-3 rounded border border-red-100">
                {message || "An error occurred while running your code."}
              </div>
              {actualOutput && (
                <div className="mt-3">
                  <h5 className="text-xs font-semibold text-red-600 mb-1">Error Details:</h5>
                  <div className="font-mono text-xs text-red-700 whitespace-pre-wrap bg-red-50 p-2 rounded border border-red-100">
                    {formatOutput(actualOutput)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Generic Error Details */}
          {verdict === "ERROR" && (
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Error Details
              </h4>
              <div className="font-mono text-sm text-red-600 whitespace-pre-wrap bg-red-50 p-3 rounded border border-red-100">
                {message || "An error occurred during execution"}
              </div>
              {/* Show troubleshooting for service unavailable errors */}
              {message && message.includes("unavailable") && (
                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 font-semibold mb-2">Troubleshooting:</p>
                  <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                    <li>Check if the Judge Service is running</li>
                    <li>Verify the service is registered in Eureka</li>
                    <li>Check API Gateway connectivity</li>
                    <li>Try again in a few moments</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Success Message (for ACCEPTED) */}
          {verdict === "ACCEPTED" && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-4 rounded-lg border border-green-200"
            >
              <p className="text-green-700 font-medium flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                All test cases passed! Your solution is correct.
              </p>
            </motion.div>
          )}

          {/* Fallback: Show raw result data if verdict is unknown or missing */}
          {(!verdict || (verdict !== "ACCEPTED" && verdict !== "WRONG_ANSWER" && verdict !== "COMPILATION_ERROR" && verdict !== "RUNTIME_ERROR" && verdict !== "ERROR")) && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Raw Result Data:</h4>
              <pre className="text-xs font-mono text-gray-600 whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubmissionResult;

