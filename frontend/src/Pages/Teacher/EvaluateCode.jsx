import { useState } from "react";
import Editor from "@monaco-editor/react";

const EvaluateCode = () => {
  const [examQuestion, setExamQuestion] = useState(
    "Write a function to find the factorial of a number."
  );

  const [studentAnswer, setStudentAnswer] = useState(
    `def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n-1)`
  );

  const [marks, setMarks] = useState("");

  return (
    <div className="mt-10 ml-10 flex flex-col lg:flex-row h-screen p-6 bg-gray-100 dark:bg-gray-900">
      {/* Left Section - Exam Question */}
      <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Exam Question
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow">
          {examQuestion}
        </p>
      </div>

      {/* Right Section - Student Answer */}
      <div className="w-full lg:w-1/2 p-6 mt-6 lg:mt-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Student's Answer
        </h2>
        <div className="border rounded-md overflow-hidden shadow-md">
          <Editor
            height="300px"
            defaultLanguage="python"
            value={studentAnswer}
            theme="vs-dark"
            options={{ readOnly: true }}
          />
        </div>

        {/* Marks Input Section */}
        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            placeholder="Enter Marks"
            className="px-4 py-2 w-24 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <button className="px-6 py-2 bg-btnbg text-white dark:bg-secondary dark:text-black rounded-md shadow-md hover:shadow-lg transition-all">
            Submit Marks
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluateCode;
