import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../api/Api";
import { useSelector } from "react-redux";

const ViewCourse = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isQuizViewActive, setIsQuizViewActive] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState("");


  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [QuizUploadOptions, setQuizUploadOptions] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const courseName = location.state?.name;

  const [examDetails, setExamDetails] = useState({
    name: "",
    date: "",
    duration: "",
    total_marks: "",
  });
  // Set initial state of drawer to open
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Initialize with one empty lecture slot
  const [lectures, setLectures] = useState([
    { title: "", type: "Text", content: "", isEditing: false, selected: false },
  ]);

  // State for expansion and selection in the side drawer
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);
  // Track which lecture is active so we can fetch questions for that lecture
  const [activeLectureIndex, setActiveLectureIndex] = useState(0);
  // Show the text of the first lecture by default (if available)
  const [selectedLectureIndexForContent, setSelectedLectureIndexForContent] =
    useState(0);

  // State for fetched questions
  const [questions, setQuestions] = useState([]);
  // Track which question reply UI is active
  const [activeReplyQuestionId, setActiveReplyQuestionId] = useState(null);

  // Ref to prevent double-processing location.state in Strict Mode
  const processedRef = useRef(false);

  // Derived current lecture based on activeLectureIndex
  const currentLecture = lectures[activeLectureIndex];

  // 1) FETCH EXISTING LECTURES FROM BACKEND ON MOUNT (OR COURSE CHANGE)
  useEffect(() => {
    const fetchLecturesFromBackend = async () => {
      try {
        const response = await apiClient.getLectureId(courseId);
        console.log("Lectures fetched:", response);
        if (response && response.length > 0) {
          const mappedLectures = response.map((lecture) => ({
            id: lecture.id,
            title: lecture.title,
            type: lecture.type || "Text",
            content: lecture.lecture_data || "",
            exam: lecture.exam, // include exam data with quiz_questions
            isEditing: false,
            selected: true,
          }));
          // Add an extra blank slot if needed
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
          setLectures([
            {
              title: "",
              type: "Text",
              content: "",
              isEditing: false,
              selected: false,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching lectures: ", error);
      }
    };

    fetchLecturesFromBackend();
  }, [courseId]);
  const handleShowQuiz = (lectureIndex) => {
    setSelectedLectureIndexForContent(lectureIndex);
    setIsQuizViewActive(true);
  };

  const handleUploadOptionClick = (type) => {
    setSelectedUploadType(type);
    setQuizUploadOptions(true); // Open the "Enter Exam Details" modal
    setShowUploadOptions(false); // Close the current upload options popup
  };
  

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
    const preservedState = { name: location.state?.name };
    navigate(location.pathname, { replace: true, state: preservedState });
  }, [location, navigate]);

  // -------------------------------
  // FETCH QUESTIONS LOGIC
  // -------------------------------
  // Function to fetch all questions for the active lecture
  // Function to fetch all questions for the active lecture
  const fetchQuestions = async () => {
    if (!currentLecture) return;
    try {
      const response = await apiClient.getAllQustions(currentLecture.id);
      if (response && Array.isArray(response)) {
        // Transform response to extract required fields
        const formattedQuestions = response.map((question) => ({
          id: question.id,
          text: question.question, // The question text
          authorName: question.student?.name || "Unknown",
          authorId: question.student?.id,
          // Map answers to include both teacher name and answer text
          answers: (question.answers || []).map((ans) => ({
            text: ans.answer,
            teacherName: ans.teacher?.name || "Unknown",
          })),
        }));
        setQuestions(formattedQuestions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Call fetchQuestions when the active lecture changes
  useEffect(() => {
    if (activeLectureIndex !== null && currentLecture) {
      fetchQuestions();
    }
  }, [activeLectureIndex, currentLecture]);

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

  const handleAddCodingQuestionClick = () => {
    navigate("/teacher-panel/teacher-codeupload");
  };
  // 1. Add state for the answer text
  const [answer, setAnswer] = useState("");

  // 2. The submit handler for answering a question
  const handleAnsQuestionSubmit = async (e, question_id) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const data = {
      question_id: question_id,
      teacher_id: user.teacher.id,
      answer: answer,
    };

    try {
      const response = await apiClient.ansQustions(data);
      console.log(response);
      // Refresh questions automatically after submission
      fetchQuestions();
      // Clear the answer input and hide the reply UI
      setAnswer("");
      setActiveReplyQuestionId(null);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
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
      const teacherInfo = await apiClient.getUserById(user?.id);
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
  
        // Redirect based on the previously selected upload type
        if (selectedUploadType === "quiz") {
          navigate("/teacher-panel/teachers-quizupload", {
            state: { examId, examDetails, courseId, courseName },
          });
        } else if (selectedUploadType === "coding") {
          navigate("/teacher-panel/teacher-codeupload", {
            state: { examId, examDetails, courseId, courseName },
          });
        }
  
        // Reset exam details and any loading state as needed
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

  const handleLectureClick = (lectureIndex) => {
    if (!lectures[lectureIndex].isEditing) {
      setExpandedLectureIndex(
        expandedLectureIndex === lectureIndex ? null : lectureIndex
      );
      // When a lecture is clicked, set it as active so questions can be fetched/displayed.
      setActiveLectureIndex(lectureIndex);
      setSelectedLectureIndexForContent(lectureIndex);
    }
  };

  const handleShowText = (lectureIndex) => {
    setSelectedLectureIndexForContent(lectureIndex);
  };

  const handleTextLectureClick = () => {
    navigate("/teacher-panel/teacher-textupload", {
      state: { courseId, courseName },
    });
  };

  // Toggle reply UI for a question
  const toggleReplyUI = (questionId) => {
    if (activeReplyQuestionId === questionId) {
      setActiveReplyQuestionId(null);
    } else {
      setActiveReplyQuestionId(questionId);
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
          <h2 className="text-2xl font-semibold">Course Name: {courseName}</h2>
          <div className="flex gap-4">
            <button
              onClick={toggleLectureContents}
              className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 dark:bg-secondary"
            >
              {drawerOpen ? "Hide Lectures" : "Show Lectures"}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main content area */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-400 mb-10 h-[500px] overflow-auto">
            {isQuizViewActive &&
            currentLecture?.exam &&
            currentLecture.exam.quiz_questions ? (
              <div>
                <h3 className="text-lg font-bold border-b pb-4">
                  {currentLecture.exam.name}
                </h3>
                <ol className="list-decimal ml-6">
                  {currentLecture.exam.quiz_questions.map((q) => (
                    <li key={q.id} className="mb-4">
                      <p className="font-medium">{q.question}</p>
                      <ul className="list-disc ml-4">
                        <li>A: {q.option_a}</li>
                        <li>B: {q.option_b}</li>
                        <li>C: {q.option_c}</li>
                        <li>D: {q.option_d}</li>
                      </ul>
                      <p className="text-sm text-green-600">
                        <strong>Correct Answer:</strong> {q.correct_option}
                      </p>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={() => setIsQuizViewActive(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Back to Text
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold border-b pb-4">
                  {lectures[selectedLectureIndexForContent].title ||
                    "Untitled Lecture"}
                </h3>
                <div
                  className="text-md mt-4 border p-4 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: lectures[selectedLectureIndexForContent].content,
                  }}
                ></div>
              </>
            )}
          </div>

          {/* Side drawer for lectures with same height as main content */}
          {drawerOpen && (
            <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4 h-[500px] overflow-auto">
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">
                Lectures
              </h2>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => {
                  const isExpanded = expandedLectureIndex === index;
                  return (
                    <div key={index} className="mb-4 pb-4 border-b">
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
                                  handleLectureTitleChange(
                                    index,
                                    e.target.value
                                  )
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
                                    className="text-2xl font-bold text-btnbg dark:text-secondary ml-5"
                                  >
                                    +
                                  </button>
                                )
                              ) : (
                                <span
                                  className="cursor-pointer font-semibold"
                                  onClick={() => handleLectureClick(index)}
                                >
                                  {lecture.title}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        {!lecture.isEditing && lecture.title.trim() !== "" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedLectureId(lecture.id);
                                handleUploadClick();
                              }}
                              className="text-sm text-white p-2 rounded-xl ml-4 bg-btnbg dark:bg-secondary dark:text-black"
                            >
                              Upload Ques
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLectureClick(index);
                              }}
                              className="text-sm text-blue-500 ml-auto dark:text-secondary"
                            >
                              {isExpanded ? "Collapse" : "Expand"}
                            </button>
                          </>
                        )}
                      </div>
                      {isExpanded &&
                        !lecture.isEditing &&
                        lecture.title.trim() !== "" && (
                          <div className="mt-2 ml-8 space-y-2">
                            <button
                              className="flex items-center space-x-2 px-4 py-2 border rounded-md"
                              onClick={() => setIsQuizViewActive(false)}
                            >
                              <span role="img" aria-label="text">
                                📄
                              </span>
                              <span>Text</span>
                            </button>
                            {lecture.exam &&
                              lecture.exam.quiz_questions &&
                              lecture.exam.quiz_questions.length > 0 && (
                                <button
                                  className="flex items-center space-x-2 px-4 py-2 border rounded-md"
                                  onClick={() => handleShowQuiz(index)}
                                >
                                  <span role="img" aria-label="quiz">
                                    ❓
                                  </span>
                                  <span>Quiz</span>
                                </button>
                              )}
                          </div>
                        )}
                    </div>
                  );
                })
              ) : (
                <p className="text-md text-gray-500">
                  No lectures uploaded yet.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Questions Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Questions</h2>
          {questions.length > 0 ? (
            questions.map((q) => (
              <div
                key={q.id}
                className="mb-4 p-4 border rounded-md bg-white dark:bg-gray-700"
              >
                <p className="font-medium">{q.text}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Asked by: {q.authorName}
                </p>

                {/* Render answers if available */}
                {q.answers.length > 0 && (
                  <div className="mt-2 pl-4 border-l-2">
                    {q.answers.map((ans, index) => (
                      <div key={index} className="mb-1">
                        <span className="font-semibold">
                          {ans.teacherName}:
                        </span>{" "}
                        {ans.text}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => toggleReplyUI(q.id)}
                  className="mt-2 text-sm text-blue-500 underline"
                >
                  Answer the question
                </button>
                {activeReplyQuestionId === q.id && (
                  <div className="mt-2">
                    <textarea
                      placeholder="Type your answer..."
                      className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-600"
                      rows="3"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex space-x-4">
                      <button
                        onClick={(e) => handleAnsQuestionSubmit(e, q.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Answer
                      </button>
                      <button
                        onClick={() => {
                          setActiveReplyQuestionId(null);
                          setAnswer("");
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-md text-gray-500">
              No questions available for this lecture.
            </p>
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
    onClick={() => handleUploadOptionClick("quiz")}
    className="w-full px-4 py-2 border hover:bg-btnbg text-black hover:text-white dark:hover:bg-secondary dark:text-white rounded-md"
  >
    Quiz
  </button>
  <button
    onClick={() => handleUploadOptionClick("coding")}
    className="w-full px-4 py-2 mt-2 border hover:bg-btnbg hover:text-white text-black dark:hover:bg-secondary dark:text-white rounded-md"
  >
    Coding
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
