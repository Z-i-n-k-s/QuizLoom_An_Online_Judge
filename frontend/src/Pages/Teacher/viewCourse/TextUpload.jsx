import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TextUpload = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureContent, setLectureContent] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // This hook will allow us to navigate

  const handleTitleChange = (e) => {
    setLectureTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setLectureContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lectureTitle || !lectureContent) {
      alert("Please fill in both the lecture title and content.");
      return;
    }

    // Submit lecture data (you can call an API or save locally here)
    const lectureData = {
      title: lectureTitle,
      content: lectureContent,
    };

    console.log("Lecture submitted:", lectureData);

    // Reset the form after submission
    setLectureTitle("");
    setLectureContent("");

    // Show the success modal
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(-1, { replace: true }); // This ensures we replace the current entry in history
  };
  
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
              className="w-full p-4 border rounded-md  bg-gray-200 dark:bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Lecture Content Textarea */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Lecture Content:
            </label>
            <textarea
              value={lectureContent}
              onChange={handleContentChange}
              placeholder="Enter the lecture content"
              rows="10"
              className="w-full p-4 border rounded-md bg-gray-200 dark:bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
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
