import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../api/Api";

const ViewCourse = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [QuizUploadOptions, setQuizUploadOptions] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const courseName =location.state?.name ;
  console.log("Course Name:", courseName);
  const [examDetails, setExamDetails] = useState({
    name: "",
    date: "",
    duration: "",
    total_marks: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Initialize with one empty lecture slot
  const [lectures, setLectures] = useState([
    { title: "", type: "Text", isEditing: false, selected: false }
  ]);
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);

  // Ref to prevent double-processing location.state in Strict Mode
  const processedRef = useRef(false);

  // 1) FETCH EXISTING LECTURES FROM BACKEND ON MOUNT (OR COURSE CHANGE)
  useEffect(() => {
    const fetchLecturesFromBackend = async () => {
      try {
        // Make sure your backend returns { title, content, type, ... }
        const response = await apiClient.getLectureId(courseId);
        console.log("Lectures fetched:", response);
        if (response && response.length > 0) {
          const mappedLectures = response.map((lecture) => ({
            id: lecture.id,
            title: lecture.title,
            type: lecture.type || "Text",
            content: lecture.lecture_data || "",
            isEditing: false,
            selected: true,
          }));

          // Ensure an extra blank slot at the end
          if (mappedLectures[mappedLectures.length - 1]?.title?.trim() !== "") {
            mappedLectures.push({
              title: "",
              type: "Text",
              content: "",
              isEditing: false,
              selected: false,
            });
          }

          setLectures(mappedLectures);
        } else {
          // If no lectures in backend, default to one empty slot
          setLectures([
            { title: "", type: "Text", content: "", isEditing: false, selected: false },
          ]);
        }
      } catch (error) {
        console.error("Error fetching lectures: ", error);
      }
    };

    fetchLecturesFromBackend();
  }, [courseId]);

  // 2) PROCESS LECTURE(S) PASSED IN location.state EXACTLY ONCE
  useEffect(() => {
    if (processedRef.current || !location.state?.lectureResponse) return;
    processedRef.current = true;

    let lectureResponses = Array.isArray(location.state.lectureResponse)
      ? location.state.lectureResponse
      : [location.state.lectureResponse];

    setLectures((prevLectures) => {
      const newLectures = [...prevLectures];

      lectureResponses.forEach((lectureData) => {
        if (
          newLectures.length > 0 &&
          newLectures[newLectures.length - 1].title.trim() === "" &&
          !newLectures[newLectures.length - 1].selected
        ) {
          newLectures[newLectures.length - 1] = {
            ...newLectures[newLectures.length - 1],
            title: lectureData.title || "Untitled Lecture",
            type: lectureData.type || "Text",
            content: lectureData.content || "",
            selected: true,
          };
        } else {
          newLectures.push({
            title: lectureData.title || "Untitled Lecture",
            type: lectureData.type || "Text",
            content: lectureData.content || "",
            isEditing: false,
            selected: true,
          });
        }
      });

      // Ensure an extra blank slot at the end
      if (
        newLectures.length === 0 ||
        newLectures[newLectures.length - 1].title.trim() !== ""
      ) {
        newLectures.push({
          title: "",
          type: "Text",
          content: "",
          isEditing: false,
          selected: false,
        });
      }
      return newLectures;
    });

     // Preserve course name when clearing location.state
  const preservedState = { name: location.state?.name };
  navigate(location.pathname, { replace: true, state: preservedState });
  }, [location, navigate]);

  // -------------------------------
  // LECTURE EDIT / SAVE LOGIC
  // -------------------------------
  

  const handleLectureTitleChange = (index, newValue) => {
    setLectures((prev) => {
      const newLectures = [...prev];
      newLectures[index] = { ...newLectures[index], tempTitle: newValue };
      return newLectures;
    });
  };

 

  // -------------------------------
  // QUIZ & UPLOAD LOGIC
  // -------------------------------
  const handleUploadClick = () => {
    setShowUploadOptions(true);
  };

  const handleQuizUploadClick = () => {
    
    setQuizUploadOptions(true);
    setShowUploadOptions(false);
  };

  // -------------------------------
  // EXAM DETAILS LOGIC
  // -------------------------------
  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({ ...examDetails, [name]: value });
  };

  const handleAddQuestionClick = async () => {
    setQuizUploadOptions(false);
    setShowUploadOptions(false);
    setIsLoading(true);
    try {
      const teacherInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      const teacherId = teacherInfo.teacher.id;
      
      const examData = {
        ...examDetails,
        teacher_id: teacherId,
        course_id: courseId,
        lecture_id: selectedLectureId, 
      };

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
        console.log("Exam added successfully:", response);
        const examId = response.id;

        navigate("/teacher-panel/teachers-quizupload", {
          state: { examId, examDetails, courseId, courseName },
        });

        setExamDetails({
          name: "",
          date: "",
          duration: "",
          total_marks: "",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------
  // UI INTERACTION
  // -------------------------------
  const toggleLectureContents = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Toggle expand/collapse for the entire lecture
  const handleLectureClick = (lectureIndex) => {
    if (!lectures[lectureIndex].isEditing) {
      setExpandedLectureIndex(
        expandedLectureIndex === lectureIndex ? null : lectureIndex
      );
    }
  };

  // Show the "Text" content in left panel
  const handleShowText = (lectureIndex) => {
    setExpandedLectureIndex(lectureIndex);
  };

  // Show the "Quiz" content in left panel
  const handleShowQuiz = (lectureIndex) => {
    setExpandedLectureIndex(lectureIndex);
  };

  // For adding a new text lecture
  const handleTextLectureClick = () => {
    navigate("/teacher-panel/teacher-textupload", { state: { courseId ,courseName} });
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
          <div className="flex gap-4">
            <button
              onClick={toggleLectureContents}
              className="btn border-none bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              {drawerOpen ? "Hide Lectures" : "Show Lectures"}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main content area (left side) */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-400 mb-10 h-[500px] overflow-auto">
            {expandedLectureIndex !== null ? (
              <>
                <h3 className="text-lg font-bold border-b pb-4">
                  {lectures[expandedLectureIndex].title || "Untitled Lecture"}
                </h3>
                {/* Show the type and content of this lecture */}
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
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">Lectures</h2>

              {lectures.length > 0 ? (
                lectures.map((lecture, index) => {
                  const isExpanded = expandedLectureIndex === index;
                  return (
                    <div key={index} className="mb-4 pb-4 border-b">
                      {/* Lecture Header Row */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-bold mr-2">
                            Lecture {index + 1}:
                          </span>

                          {lecture.isEditing ? (
                            <div className="flex flex-col">
                              <input
                                type="text"
                                value={
                                  lecture.tempTitle !== undefined
                                    ? lecture.tempTitle
                                    : lecture.title
                                }
                                onChange={(e) =>
                                  handleLectureTitleChange(index, e.target.value)
                                }
                                placeholder="Enter Lecture Title"
                                className="w-full mb-2 p-2 border rounded-md bg-gray-300 dark:bg-gray-600 dark:text-black"
                              />
                              
                            </div>
                          ) : (
                            <>
                              {lecture.title.trim() === "" ? (
                                lecture.selected ? (
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => handleLectureClick(index)}
                                  >
                                    {lecture.type} Lecture
                                  </span>
                                ) : (
                                  <button
                                    onClick={handleTextLectureClick}
                                    className="text-sm text-blue-500 ml-20"
                                  >
                                    + Add Content
                                  </button>
                                )
                              ) : (
                                <span className="cursor-pointer font-semibold">
                                  {lecture.title}
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        {/* Right-side buttons */}
                        {!lecture.isEditing && lecture.title.trim() !== "" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedLectureId(lecture.id);
                                handleUploadClick();
                              }}
                              className="text-sm text-blue-500 ml-4"
                            >
                              Add quiz
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLectureClick(index);
                              }}
                              className="text-sm text-blue-500 ml-auto"
                            >
                              {isExpanded ? "Collapse" : "Expand"}
                            </button>
                          </>
                        )}
                      </div>

                      {/* If expanded, show the sub-items (Text, Quiz) */}
                      {isExpanded && !lecture.isEditing && lecture.title.trim() !== "" && (
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
                <p className="text-md text-gray-500">No lectures uploaded yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for selecting lecture type */}
      {showUploadOptions && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Select Lecture Type To Upload
            </h3>
           
            <button
              onClick={handleQuizUploadClick}
              className="w-full px-4 py-2 border hover:bg-btnbg text-black dark:hover:bg-secondary dark:text-white rounded-md"
            >
              Quiz
            </button>
            <button
              onClick={() => setShowUploadOptions(false)}
              className="w-full mt-4 px-4 py-2 bg-red-500 text-white dark:hover:bg-secondary rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for entering exam details */}
      {QuizUploadOptions && (
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
              onClick={() => setQuizUploadOptions(false)}
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
