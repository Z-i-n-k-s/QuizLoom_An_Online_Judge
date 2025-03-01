import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import apiClient from "../../../api/Api";

const ViewCourse = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);

  // If you still need the courseName from location.state
  const courseName = location.state?.courseName  ||"undifined";
console.log("courseName",courseName)
  // Fetch lectures on mount or course change
  useEffect(() => {
    const fetchLecturesFromBackend = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getLectureId(courseId);
        // Expecting response as an array of { id, title, lecture_data, type }
        if (response && Array.isArray(response)) {
          const mappedLectures = response.map((lecture) => ({
            id: lecture.id,
            title: lecture.title || "Untitled Lecture",
            type: lecture.type || "Text",
            content: lecture.lecture_data || "",
          }));
          setLectures(mappedLectures);
        } else {
          setLectures([]);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
        setLectures([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLecturesFromBackend();
  }, [courseId]);

  // Toggles the entire drawer
  const toggleLectureContents = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Toggle expand/collapse for a specific lecture
  const handleLectureClick = (lectureIndex) => {
    setExpandedLectureIndex(
      expandedLectureIndex === lectureIndex ? null : lectureIndex
    );
  };

  // Show the "Text" tab in the main panel
  const handleShowText = (lectureIndex) => {
    setExpandedLectureIndex(lectureIndex);
  };

  // Show the "Quiz" tab in the main panel
  const handleShowQuiz = (lectureIndex) => {
    setExpandedLectureIndex(lectureIndex);
  };

  return (
    <div className="mt-20 ml-10">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-gray-500 bg-opacity-30 z-50">
          <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Course Name: {courseName}</h2>
          <button
            onClick={toggleLectureContents}
            className="btn border-none bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
          >
            {drawerOpen ? "Hide Lectures" : "Show Lectures"}
          </button>
        </div>

        <div className="flex">
          {/* Main content area (left side) */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-400 mb-10 h-[500px] overflow-auto">
            {expandedLectureIndex !== null ? (
              <>
                <h3 className="text-lg font-bold border-b pb-4">
                  {lectures[expandedLectureIndex].title}
                </h3>
                <p className="text-md mt-4 border p-4">
                  {lectures[expandedLectureIndex].type} Lecture
                </p>
                <p className="text-md mt-4 border p-4 whitespace-pre-wrap">
                  {lectures[expandedLectureIndex].content}
                </p>
              </>
            ) : (
              <p className="text-md text-gray-500">
                Select a lecture to view its content.
              </p>
            )}
          </div>

          {/* Side drawer for lectures */}
          {drawerOpen && (
            <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4">
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">
                Lectures
              </h2>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => {
                  const isExpanded = expandedLectureIndex === index;
                  return (
                    <div key={lecture.id || index} className="mb-4 pb-4 border-b">
                      <div className="flex justify-between items-center">
                        <span className="font-bold mr-2">
                          Lecture {index + 1}:
                        </span>
                        <span
                          className="cursor-pointer font-semibold"
                          onClick={() => handleLectureClick(index)}
                        >
                          {lecture.title}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLectureClick(index);
                          }}
                          className="text-sm text-blue-500 ml-auto"
                        >
                          {isExpanded ? "Collapse" : "Expand"}
                        </button>
                      </div>

                      {/* If expanded, show the sub-items (Text, Quiz) */}
                      {isExpanded && (
                        <div className="mt-2 ml-8 space-y-2">
                          <button
                            className="flex items-center space-x-2 px-4 py-2 border rounded-md"
                            onClick={() => handleShowText(index)}
                          >
                            <span role="img" aria-label="text">
                              📄
                            </span>
                            <span>Text</span>
                          </button>
                          <button
                            className="flex items-center space-x-2 px-4 py-2 border rounded-md"
                            onClick={() => handleShowQuiz(index)}
                          >
                            <span role="img" aria-label="quiz">
                              ❓
                            </span>
                            <span>Quiz</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-md text-gray-500">
                  No lectures found for this course.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
