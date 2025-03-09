import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiClient from "../../../api/Api";

const TextUpload = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureContent, setLectureContent] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lectureResponse, setLectureResponse] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const courseName = location.state?.courseName;
  console.log("Course ID from storage:", courseId);
  console.log("Course Name from storages:", courseName);

  const handleTitleChange = (e) => {
    setLectureTitle(e.target.value);
  };

  // ReactQuill returns content as an HTML string
  const handleContentChange = (content) => {
    setLectureContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lectureTitle || !lectureContent) {
      alert("Please fill in both the lecture title and content.");
      return;
    }

    const lectureData = {
      title: lectureTitle,
      lecture_data: lectureContent,
    };

    try {
      await apiClient.addLecture(courseId, lectureData);
      const response1 = await apiClient.getLectureId(courseId);
      console.log("Response1:", response1);
      console.log("Lecture submitted:", lectureData);
      setLectureResponse(response1);
      setLectureTitle("");
      setLectureContent("");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error uploading lecture:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/teacher-panel/teachers-courses/${courseId}`, {
      state: { lectureResponse, name: courseName },
    });
  };

  // ReactQuill toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
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
    "link",
    "image",
  ];

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-800 flex justify-center items-center mt-10">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload Lecture</h2>
        <form onSubmit={handleSubmit}>
          {/* Lecture Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Lecture Title:
            </label>
            <input
              type="text"
              value={lectureTitle}
              onChange={handleTitleChange}
              placeholder="Enter the lecture title"
              className="w-full p-4 border rounded-md bg-gray-200 dark:bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Rich Text Editor for Lecture Content */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Lecture Content:
            </label>
            <ReactQuill
              value={lectureContent}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="Enter the lecture content"
              className="bg-gray-200 dark:text-black" // Applies the bg-gray-200 styling
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-btnbg dark:bg-secondary text-white dark:text-black p-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Lecture
          </button>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Lecture Submitted Successfully!
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

export default TextUpload;
