import { useState } from "react";
import TextQuizStu from "./TextQuizStu"; // Import the TextQuizStu component

const ViewCourse = () => {
  const [drawerOpen, setDrawerOpen] = useState(true); // Initially show the lectures
  const [lectures, setLectures] = useState([
    {
      id: 1, // Unique ID for each lecture
      title: "Lecture 1: Introduction to React",
      type: "Text",
      content: {
        text: "This is the text content for Lecture 1.",
        quiz: "Quiz 1: What is React?",
      },
    },
    {
      id: 2, // Unique ID for each lecture
      title: "Lecture 2: Advanced React Topics",
      type: "Quiz",
      content: {
        text: "This is the text content for Lecture 2.",
        quiz: "Quiz 2: What are React Hooks?",
      },
    },
  ]);
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);
  const [activeContent, setActiveContent] = useState(null); // Track active content (text or quiz)

  const toggleLectureContents = () => {
    setDrawerOpen((prev) => !prev); // Toggle visibility of the lecture list
  };

  const handleLectureClick = (lectureIndex) => {
    setExpandedLectureIndex(
      expandedLectureIndex === lectureIndex ? null : lectureIndex
    );
    setActiveContent(null); // Reset active content when collapsing or switching lectures
  };

  const handleTextClick = (lectureId) => {
    setActiveContent({ type: "text", lectureId }); // Set active content to "text"
  };

  const handleQuizClick = (lectureId) => {
    setActiveContent({ type: "quiz", lectureId }); // Set active content to "quiz"
  };

  return (
    <div className="mt-20 ml-10">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Course ID: Example Course</h2>
          <div className="flex gap-4">
            {/* Button to Show/Hide the lectures list */}
            <button
              onClick={toggleLectureContents}
              className="btn border-none bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              {drawerOpen ? "Hide Lectures" : "Show Lectures"}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Left side content: Display selected lecture content */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-400 mb-10 h-[500px] overflow-auto">
            <div>
              {activeContent ? (
                // Render TextQuizStu component if activeContent is set
                <TextQuizStu type={activeContent.type} lectureId={activeContent.lectureId} />
              ) : expandedLectureIndex !== null ? (
                // Default lecture content if no activeContent
                <>
                  <h3 className="text-lg font-bold border-b pb-4">
                    {lectures[expandedLectureIndex].title}
                  </h3>
                  <p className="text-md mt-4 border p-4">
                    {lectures[expandedLectureIndex].content.text}
                  </p>
                </>
              ) : (
                // Placeholder if no lecture is selected
                <p className="text-md text-gray-500">
                  Select a lecture to view its content.
                </p>
              )}
            </div>
          </div>

          {/* Right side: Lectures list */}
          {drawerOpen && (
            <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4">
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">Lectures</h2>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => (
                  <div key={lecture.id} className="mb-4 pb-4 border-b">
                    {/* Lecture Title */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleLectureClick(index)}
                    >
                      <h3 className="text-lg font-semibold">{lecture.title}</h3>
                      <button
                        className="text-sm text-blue-500"
                        onClick={() => handleLectureClick(index)}
                      >
                        {expandedLectureIndex === index ? "Collapse" : "Expand"}
                      </button>
                    </div>

                    {/* Expanded Content: Text and Quiz Buttons */}
                    {expandedLectureIndex === index && (
                      <div className="mt-2 pl-4">
                        <button
                          className="w-full text-md text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded border border-gray-300 mb-2 text-left"
                          onClick={() => handleTextClick(lecture.id)} // Set active content to "text"
                        >
                          📝 Text
                        </button>
                        <button
                          className="w-full text-md text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded border border-gray-300 text-left"
                          onClick={() => handleQuizClick(lecture.id)} // Set active content to "quiz"
                        >
                          ❓ Quiz
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-md text-gray-500">No lectures uploaded yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;