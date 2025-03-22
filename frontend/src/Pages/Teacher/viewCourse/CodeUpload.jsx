import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiClient from "../../../api/Api";

const CodeUpload = () => {
const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const courseName = location.state?.courseName;
  
    const examDetails = location.state?.examDetails;
  
    // Load saved data from localStorage
    const savedQuizSettings = JSON.parse(localStorage.getItem("quizSettings")) || { totalQuestions: "" };
    const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [{ question: "", options: ["", "", "", ""], correctAnswer: "" }];
  
    const [quizSettings, setQuizSettings] = useState(savedQuizSettings);
    const [questions, setQuestions] = useState(savedQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    //const examId = localStorage.getItem("exam_id");
    const examId = location.state?.examId;
   
    // Save to localStorage whenever quizSettings or questions change
    useEffect(() => {
      localStorage.setItem("quizSettings", JSON.stringify(quizSettings));
    }, [quizSettings]);
  
    
  
    const handleSettingsChange = (e) => {
      setQuizSettings({ ...quizSettings, [e.target.name]: e.target.value });
    };
  



  const [codeQuestion, setCodeQuestion] = useState("");
  const [marks, setMarks] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const questionData = {
        exam_id: examId, // must exist in exams table per your validation
        question: codeQuestion, // the coding question string from ReactQuill
        max_marks: parseInt(marks, 10), // converting marks to an integer
      };
  
      await apiClient.codingQustions(questionData);
  
      // Remove any stored quiz settings and questions after successful submission
      localStorage.removeItem("quizSettings");
      localStorage.removeItem("questions");
  
      // Optionally, show a success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error uploading quiz:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while uploading the quiz.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
  

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/teacher-panel/teachers-courses/${courseId}`, {
      state: { name: courseName },
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "code-block",
  ];

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-800 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center py-4">Upload Code Question</h2>
        <form onSubmit={handleSubmit}>
          {/* Marks Input */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Marks:
            </label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Enter marks"
              className="w-full p-4 border rounded-md bg-gray-200 dark:bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Code Question Input (Rich Text Editor) */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Code Question:
            </label>
            <ReactQuill
              value={codeQuestion}
              onChange={setCodeQuestion}
              modules={modules}
              formats={formats}
              placeholder="Enter your coding question here..."
              className="bg-gray-200 dark:text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-btnbg dark:bg-secondary dark:text-black font-bold text-white p-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Code Question Submitted Successfully!
              </h3>
              <button
                onClick={handleCloseModal}
                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeUpload;
