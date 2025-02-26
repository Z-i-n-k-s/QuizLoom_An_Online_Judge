import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../api/Api";

const ViewCourse = () => {
  const { id: courseId } = useParams(); // Using "id" to match route definition
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [QuizUploadOptions, setQuizUploadOptions] = useState(false);
  const [examDetails, setExamDetails] = useState({
    name: "",
    date: "",
    duration: "",
    total_marks: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Initialize with one empty lecture slot. Note: we add a "selected" flag.
  const [lectures, setLectures] = useState([
    { title: "", type: "Text", isEditing: false, selected: false }
  ]);
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);

  // Start editing a lecture title
  const handleStartEditing = (index) => {
    setLectures((prev) => {
      const newLectures = [...prev];
      newLectures[index] = {
        ...newLectures[index],
        isEditing: true,
        tempTitle: newLectures[index].title || "",
      };
      return newLectures;
    });
  };

  // Update the temporary title value
  const handleLectureTitleChange = (index, newValue) => {
    setLectures((prev) => {
      const newLectures = [...prev];
      newLectures[index] = { ...newLectures[index], tempTitle: newValue };
      return newLectures;
    });
  };

  // Save the lecture title and, if it's the last lecture and now has a title, add a new blank slot.
  const handleSaveLecture = (index) => {
    setLectures((prev) => {
      const newLectures = [...prev];
      const newTitle = newLectures[index].tempTitle || "";
      newLectures[index] = {
        ...newLectures[index],
        title: newTitle,
        isEditing: false
      };
      delete newLectures[index].tempTitle;

      if (index === newLectures.length - 1 && newTitle.trim() !== "") {
        newLectures.push({ title: "", type: "Text", isEditing: false, selected: false });
      }
      return newLectures;
    });
  };

  // Show the modal for selecting lecture type
  const handleUploadClick = () => {
    setShowUploadOptions(true);
  };

  // When a text lecture is selected update the lecture with the chosen type and add a new blank slot.
  const handleLectureTypeSelect = (type) => {
    setLectures((prev) => {
      const newLectures = [...prev];
      if (
        newLectures.length > 0 &&
        newLectures[newLectures.length - 1].title.trim() === "" &&
        !newLectures[newLectures.length - 1].selected
      ) {
        newLectures[newLectures.length - 1] = {
          ...newLectures[newLectures.length - 1],
          type: type,
          selected: true,
        };
        newLectures.push({ title: "", type: "Text", isEditing: false, selected: false });
      } else {
        newLectures.push({ title: "", type: type, isEditing: false, selected: true });
        newLectures.push({ title: "", type: "Text", isEditing: false, selected: false });
      }
      return newLectures;
    });
    setShowUploadOptions(false);
  };

  // When a quiz lecture is selected, update the lecture with type "Quiz",
  // open the exam details modal, and add a new blank lecture slot.
  const handleQuizUploadClick = () => {
    setLectures((prev) => {
      const newLectures = [...prev];
      if (
        newLectures.length > 0 &&
        newLectures[newLectures.length - 1].title.trim() === "" &&
        !newLectures[newLectures.length - 1].selected
      ) {
        newLectures[newLectures.length - 1] = {
          ...newLectures[newLectures.length - 1],
          type: "Quiz",
          selected: true,
        };
        newLectures.push({ title: "", type: "Text", isEditing: false, selected: false });
      } else {
        newLectures.push({ title: "", type: "Quiz", isEditing: false, selected: true });
        newLectures.push({ title: "", type: "Text", isEditing: false, selected: false });
      }
      return newLectures;
    });
    setQuizUploadOptions(true);
    setShowUploadOptions(false);
  };

  // Handle changes in exam details
  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({ ...examDetails, [name]: value });
  };

  // Add question and navigate to QuizUpload page after exam details are provided.
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
        console.log("exam added successfully:", response);
        const examId = response.id;

        navigate("/teacher-panel/teachers-quizupload", {
          state: { examId, examDetails, courseId },
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

  // Toggle the side drawer for lectures.
  const toggleLectureContents = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Toggle expanding a lecture if not in editing mode.
  const handleLectureClick = (lectureIndex) => {
    if (!lectures[lectureIndex].isEditing) {
      setExpandedLectureIndex(expandedLectureIndex === lectureIndex ? null : lectureIndex);
    }
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
          <h2 className="text-2xl font-semibold">Course ID: Example Course</h2>
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
          {/* Main content area */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-400 mb-10 h-[500px] overflow-auto">
            {expandedLectureIndex !== null ? (
              <>
                <h3 className="text-lg font-bold border-b pb-4">
                  {lectures[expandedLectureIndex].title || "Untitled Lecture"}
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

          {/* Side drawer for lectures */}
          {drawerOpen && (
            <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4">
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">Lectures</h2>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => (
                  <div key={index} className="mb-4 pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-bold mr-2">Lecture {index + 1}:</span>
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
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveLecture(index);
                              }}
                              className="text-sm text-green-500"
                            >
                              Save
                            </button>
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
                                  onClick={handleUploadClick}
                                  className="text-sm text-blue-500"
                                >
                                  + Add Content
                                </button>
                              )
                            ) : (
                              <span
                                className="cursor-pointer"
                                onClick={() => handleLectureClick(index)}
                              >
                                {lecture.title}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {!lecture.isEditing && lecture.title.trim() !== "" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEditing(index);
                          }}
                          className="text-sm text-blue-500 ml-4"
                        >
                          Edit
                        </button>
                      )}

                      {!lecture.isEditing && lecture.title.trim() !== "" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLectureClick(index);
                          }}
                          className="text-sm text-blue-500 ml-auto"
                        >
                          {expandedLectureIndex === index ? "Collapse" : "Expand"}
                        </button>
                      )}
                    </div>
                  </div>
                ))
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
              onClick={() => handleLectureTypeSelect("Text")}
              className="w-full mb-2 px-4 py-2 border hover:bg-btnbg text-black dark:hover:bg-secondary dark:text-white rounded-md"
            >
              Text Lecture
            </button>
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
