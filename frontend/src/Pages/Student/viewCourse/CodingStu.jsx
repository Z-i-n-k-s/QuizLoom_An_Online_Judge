import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../../api/Api";

const CodingStu = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  // Destructure the passed coding questions from navigation state
  const { codingQuestions } = location.state || {};

  // State for code, language, and loading
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);

  // Log coding questions on mount/update
  useEffect(() => {
    console.log("Received coding questions:", codingQuestions);
  }, [codingQuestions]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate that a student id exists
      if (!user?.student.id) {
        throw new Error("Missing student id.");
      }
      // Validate that a coding question exists
      if (!codingQuestions || codingQuestions.length === 0) {
        throw new Error("No coding question available for submission.");
      }
      // Use the first coding question as the one being answered
      const codeExamQuestionId = parseInt(codingQuestions[0].id, 10);
      if (!codeExamQuestionId) {
        throw new Error("Missing coding question id.");
      }
      // Prepare submission data including the selected language
      const ansData = {
        student_id: parseInt(user.student.id, 10),
        code_exam_question_id: codeExamQuestionId,
        submitted_code: code,
        language: language,
      };

      const response = await apiClient.codingAnswer(ansData);
      console.log("Result saved:", response);
      
      // Resolve the course id: try codingQuestions first, fallback to URL param.
      const resolvedCourseId =
        codingQuestions?.[0]?.exam?.lecture?.course_id || courseId;
      
      // Navigate back to the view page and pass an indicator that the code was submitted.
      navigate(`/student-panel/view-courses-stu/${resolvedCourseId}`, {
        state: { codeSubmitted: true }
      });
    } catch (error) {
      console.error("Error during submission", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-10 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Panel: Coding Problem */}
          <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Coding Problem</h2>
            {/* Display received coding question(s) with marks */}
            {codingQuestions && codingQuestions.length > 0 ? (
              codingQuestions.map((q) => (
                <div
                  key={q.id}
                  className="mb-4 p-4 border rounded bg-gray-100 dark:bg-gray-700"
                >
                  <div dangerouslySetInnerHTML={{ __html: q.question }} />
                  <p className="mt-2 text-sm text-gray-500">Marks: {q.max_marks}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-white">
                No coding questions received.
              </p>
            )}
          </div>

          {/* Right Panel: Code Submission */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">Submit Your Solution</h2>
            <div className="mb-4">
              <label htmlFor="language" className="block text-lg font-semibold mb-2">
                Select Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 rounded dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="solution" className="block text-lg font-semibold mb-2">
                Your Code
              </label>
              <textarea
                id="solution"
                rows="10"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 bg-gray-200 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your code here..."
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-btnbg dark:bg-secondary dark:text-black font-bold text-white p-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingStu;
