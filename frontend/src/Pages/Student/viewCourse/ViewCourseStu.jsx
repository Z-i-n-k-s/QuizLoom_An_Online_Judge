import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import apiClient from "../../../api/Api";
import TextQuizStu from "./TextQuizStu";

const ViewCourse = () => {
  const { id: courseId } = useParams();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);

  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lectures, setLectures] = useState([]);
  // Controls which lecture slot is expanded in the side drawer
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);
  // Controls which lecture is active in the main panel
  const [activeLectureIndex, setActiveLectureIndex] = useState(null);
  // Determines whether to show "Text" or "Quiz" in the main panel
  const [activeTab, setActiveTab] = useState("Text");
  // Flag for displaying the quiz info popup
  const [showQuizPopup, setShowQuizPopup] = useState(false);

  const courseName = location.state?.courseName || "undefined";
  const fetchLecturesFromBackend = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getLectureId(courseId);
      console.log(response);
      // Map each lecture and include exam details (and results) if available.
      if (response && Array.isArray(response)) {
        const mappedLectures = response.map((lecture) => ({
          id: lecture.id,
          title: lecture.title || "Untitled Lecture",
          type: lecture.type || "Text",
          content: lecture.lecture_data || "",
          examDetails: lecture.exam
            ? {
                id: lecture.exam.id, // Include exam id here
                duration: lecture.exam.duration, // in minutes
                totalMarks: lecture.exam.total_marks, // e.g., 60
                name: lecture.exam.name,
                quizQuestions:
                  lecture.exam.quiz_questions &&
                  Array.isArray(lecture.exam.quiz_questions)
                    ? lecture.exam.quiz_questions
                    : [],
                results: lecture.exam.results || [], // previous quiz results, if any
              }
            : null,
        }));
        setLectures(mappedLectures);
        // Set first lecture as active by default if available.
        if (mappedLectures.length > 0) {
          setActiveLectureIndex(0);
          setActiveTab("Text");
        }
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
  useEffect(() => {
    

    fetchLecturesFromBackend();
  }, [courseId]);

  // Toggle the side drawer for lectures.
  const toggleLectureContents = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Toggle expansion of a lecture slot in the drawer.
  const handleLectureClick = (lectureIndex) => {
    setExpandedLectureIndex(
      expandedLectureIndex === lectureIndex ? null : lectureIndex
    );
  };

  // Set active lecture and show text content.
  const handleShowText = (lectureIndex) => {
    setActiveLectureIndex(lectureIndex);
    setActiveTab("Text");
    setShowQuizPopup(false);
  };

  // For lectures with quiz questions, trigger the quiz popup (if quiz not taken yet).
  const handleQuizButton = (lectureIndex) => {
    setActiveLectureIndex(lectureIndex);
    setShowQuizPopup(true);
  };

  // When clicking on a quiz (completed or not) from side drawer or bottom nav,
  // show the quiz view (TextQuizStu). A "View Text" button inside that component will let you switch back.
  const handleShowQuiz = (lectureIndex) => {
    setActiveLectureIndex(lectureIndex);
    setActiveTab("Quiz");
    setShowQuizPopup(false);
  };

  // Navigation handlers always set view to "Text".
  const handlePrevious = () => {
    if (activeLectureIndex > 0) {
      setActiveLectureIndex(activeLectureIndex - 1);
      setActiveTab("Text");
      setShowQuizPopup(false);
    }
  };

  const handleNext = () => {
    if (activeLectureIndex < lectures.length - 1) {
      setActiveLectureIndex(activeLectureIndex + 1);
      setActiveTab("Text");
      setShowQuizPopup(false);
    }
  };

  const currentLecture =
    activeLectureIndex !== null ? lectures[activeLectureIndex] : null;

  // Determine if the current lecture has quiz questions.
  const hasQuiz =
    currentLecture &&
    currentLecture.examDetails &&
    currentLecture.examDetails.quizQuestions &&
    currentLecture.examDetails.quizQuestions.length > 0;

  // Check if the current user has already taken the quiz for the active lecture.
  const examResult =
    currentLecture?.examDetails?.results?.find(
      (result) => result.student_id === user?.student.id
    ) || null;

  // Bottom navigation: if there's a next lecture, show Next button instead of Quiz Completed.
  const showNextButton = activeLectureIndex < lectures.length - 1;

  const handleQustionSubmit =async()=>{
    const response = await apiClient.askQustions(data);
  }
 
  const handleEditQustionSubmit =async()=>{
    const response = await apiClient.editQustions(id);
  }
  const handleDeleteQustionSubmit =async()=>{
    const response = await apiClient.deleteQustions(id);
  }

  return (
    <div className="mt-20 ml-10 relative">
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
          {/* Main content area */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg h-[500px] overflow-auto">
            {activeLectureIndex !== null && currentLecture ? (
              <>
                <h3 className="text-lg font-bold border-b pb-4">
                  {currentLecture.title}
                </h3>
                {activeTab === "Text" && (
                  <p className="text-md mt-4 border p-4 whitespace-pre-wrap">
                    {currentLecture.content}
                  </p>
                )}
                {activeTab === "Quiz" && (
                 <TextQuizStu
                 type="quiz"
                 lectureId={currentLecture.id}
                 examId={currentLecture.examDetails?.id}
                 quizQuestions={currentLecture.examDetails?.quizQuestions}
                 examDuration={currentLecture.examDetails ? currentLecture.examDetails.duration * 60 : 600}
                 examTotalMarks={currentLecture.examDetails ? currentLecture.examDetails.totalMarks : 0}
                 onFinishQuiz={async () => {
                  console.log("Quiz finished");
                
                  // Store the current lecture index before refreshing data
                  const currentIndex = activeLectureIndex;
                
                  await fetchLecturesFromBackend(); // Fetch updated lecture data
                
                  // Restore the active lecture after data updates
                  setTimeout(() => {
                    setLectures((prevLectures) => {
                      const updatedLecture = prevLectures[currentIndex]; // Keep the same lecture
                      const updatedExamResult = updatedLecture?.examDetails?.results?.find(
                        (result) => result.student_id === user?.student.id
                      );
                
                      console.log("Updated Exam Result:", updatedExamResult);
                
                      // Restore previous lecture and show the quiz results
                      setActiveLectureIndex(currentIndex);
                      if (updatedExamResult) {
                        setActiveTab("Quiz"); // Stay on quiz to show results
                      }
                
                      return prevLectures;
                    });
                  }, 500); // Delay to ensure state update
                }}
                
                
                 user={user}
                 examResult={examResult}
               />
               
                
                )}
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
                  // Check if the quiz for this lecture was already taken.
                  const alreadyTaken =
                    lecture.examDetails &&
                    lecture.examDetails.results &&
                    lecture.examDetails.results.some(
                      (result) => result.student_id === user?.student.id
                    );
                  return (
                    <div
                      key={lecture.id || index}
                      className="mb-4 pb-4 border-b"
                    >
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

                      {/* Expanded lecture options */}
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
                          {lecture.examDetails &&
                            lecture.examDetails.quizQuestions &&
                            lecture.examDetails.quizQuestions.length > 0 && (
                              <>
                                {alreadyTaken ? (
                                  <button
                                    onClick={() => handleShowQuiz(index)}
                                    className="flex items-center space-x-2 px-4 py-2 border rounded-md bg-gray-300 text-gray-600"
                                  >
                                    <span role="img" aria-label="quiz">
                                      ✔️
                                    </span>
                                    <span>Quiz Completed</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleQuizButton(index)}
                                    className="flex items-center space-x-2 px-4 py-2 border rounded-md"
                                  >
                                    <span role="img" aria-label="quiz">
                                      ❓
                                    </span>
                                    <span>Quiz</span>
                                  </button>
                                )}
                              </>
                            )}
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

        {/* Bottom Navigation */}
        {activeLectureIndex !== null && lectures.length > 0 && (
          <div className="mt-4 flex justify-between">
            {activeLectureIndex > 0 ? (
              <button
                onClick={handlePrevious}
                className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            {hasQuiz ? (
              examResult ? (
                showNextButton ? (
                  <button
                    onClick={handleNext}
                    className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn bg-gray-300 text-gray-600 px-4 py-2 rounded-lg shadow-md cursor-not-allowed"
                  >
                    Quiz Completed
                  </button>
                )
              ) : (
                <button
                  onClick={() => setShowQuizPopup(true)}
                  className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Quiz Info
                </button>
              )
            ) : (
              showNextButton && (
                <button
                  onClick={handleNext}
                  className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Next
                </button>
              )
            )}
          </div>
        )}
      </div>

      

{/* Quiz Info Popup */}
{showQuizPopup && currentLecture && currentLecture.examDetails && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="relative bg-white dark:bg-gray-900 text-center p-8 rounded-lg shadow-lg w-96 max-w-full">
      
      {/* Close Button (Icon) */}
      <button
        onClick={() => setShowQuizPopup(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {currentLecture.examDetails.name}
      </h1>
      <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
        Duration: {currentLecture.examDetails.duration} minutes
      </p>
      <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
        Total Marks: {currentLecture.examDetails.totalMarks}
      </p>

      {/* Start Quiz Button */}
      <button
        onClick={() => {
          setActiveTab("Quiz"); // Switch to quiz
          setShowQuizPopup(false); // Close the modal
        }}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Start Quiz
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewCourse;
