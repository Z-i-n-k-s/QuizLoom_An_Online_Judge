import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../api/Api";

const ViewCourse = () => {
  const { id: courseId } = useParams(); // Using "id" to match route definition
  
  const navigate = useNavigate();

  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [examDetails, setExamDetails] = useState({
    name: "",
    date: "",
    duration: "",
    total_marks: "",
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lectures, setLectures] = useState([
    {
      title: "Lecture 1: Introduction to React",
      type: "Text",
    },
    {
      title: "Lecture 2: Advanced React Topics",
      type: "Quiz",
    },
  ]);
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);

  const handleUploadClick = () => {
    setShowUploadOptions(true);
  };

  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({ ...examDetails, [name]: value });
  };

  // Handle the click of Add Question button and navigate to QuizUpload
  const handleAddQuestionClick = async () => {
    try {
      const teacherInfo = await apiClient.getUserById(
        localStorage.getItem("user_id")
      );

      const teacherId = teacherInfo.teacher.id;

      const examData = {
        ...examDetails,
        teacher_id: teacherId,
        course_id: courseId,
      };
      // Check if any field is empty
      if (
        !examDetails.name ||
        !examDetails.date ||
        !examDetails.duration ||
        !examDetails.total_marks
      ) {
        Swal.fire({
          title: "Error",
          text: "Please fill all the fields before proceeding.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      const response = await apiClient.addExam(examData);

      if (response) {
        console.log("exam added successfully:", response);
      const examId=response.id;
     // localStorage.setItem("exam_id", examId);

        // Reset the input fields and close the modal
        setExamDetails({
          name: "",
          date: "",
          duration: "",
          total_marks: "",
        });

        setShowUploadOptions(false);
        // Pass exam details to QuizUpload page using navigate
        navigate("/teacher-panel/teachers-quizupload", {
          state: { examId,examDetails,courseId },
        });
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const toggleLectureContents = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLectureClick = (lectureIndex) => {
    setExpandedLectureIndex(
      expandedLectureIndex === lectureIndex ? null : lectureIndex
    );
  };

  return (
    <div className="mt-20 ml-10">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Course ID: Example Course</h2>
          <div className="flex gap-4">
            <button
              onClick={handleUploadClick}
              className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
            >
              Upload
            </button>
            <button
              onClick={toggleLectureContents}
              className="btn border-none bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              {drawerOpen ? "Hide Lectures" : "Show Lectures"}
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-400 mb-10 h-[500px] overflow-auto">
            <div>
              {expandedLectureIndex !== null ? (
                <>
                  <h3 className="text-lg font-bold border-b pb-4">
                    {lectures[expandedLectureIndex].title}
                  </h3>
                  <p className="text-md mt-4 border p-4">
                    {lectures[expandedLectureIndex].type} Lecture
                  </p>
                </>
              ) : (
                <p className="text-md text-gray-500">
                  Select a lecture to view its content.
                </p>
              )}
            </div>
          </div>

          {drawerOpen && (
            <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4">
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">
                Lectures
              </h2>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => (
                  <div
                    key={index}
                    className="mb-4 pb-4 border-b cursor-pointer"
                    onClick={() => handleLectureClick(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{lecture.title}</h3>
                      <button
                        className="text-sm text-blue-500"
                        onClick={() => handleLectureClick(index)}
                      >
                        {expandedLectureIndex === index ? "Collapse" : "Expand"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-md text-gray-500">
                  No lectures uploaded yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {showUploadOptions && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
              Enter Exam Details
            </h3>
            <input
              type="text"
              name="name"
              value={examDetails.name}
              onChange={handleExamDetailsChange}
              placeholder="Exam Name"
              className="w-full mb-4 p-2 border rounded-md bg-gray-300 dark:bg-gray-600 dark:text-black"
            />
            <input
              type="date"
              name="date"
              value={examDetails.date}
              onChange={handleExamDetailsChange}
              className="w-full mb-4 p-2 border rounded-md bg-gray-300 dark:bg-gray-600 dark:text-black"
            />
            <input
              type="number"
              name="duration"
              value={examDetails.duration}
              onChange={handleExamDetailsChange}
              placeholder="Duration (mins)"
              className="w-full mb-4 p-2 border rounded-md bg-gray-300 dark:bg-gray-600 dark:text-black"
            />
            <input
              type="number"
              name="total_marks"
              value={examDetails.total_marks}
              onChange={handleExamDetailsChange}
              placeholder="Total marks"
              className="w-full mb-4 p-2 border rounded-md bg-gray-300 dark:bg-gray-600 dark:text-black"
            />
            <button
              onClick={handleAddQuestionClick}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
            >
              Add Question
            </button>
            <button
              onClick={() => setShowUploadOptions(false)}
              className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
