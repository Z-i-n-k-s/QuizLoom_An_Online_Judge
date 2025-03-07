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
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);
  const [activeLectureIndex, setActiveLectureIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Text");
  const [showQuizPopup, setShowQuizPopup] = useState(false);

  const courseName = location.state?.courseName || "undefined";

  const fetchLecturesFromBackend = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getLectureId(courseId);
      if (response && Array.isArray(response)) {
        const mappedLectures = response.map((lecture) => ({
          id: lecture.id,
          title: lecture.title || "Untitled Lecture",
          type: lecture.type || "Text",
          content: lecture.lecture_data || "",
          examDetails: lecture.exam
            ? {
                id: lecture.exam.id,
                duration: lecture.exam.duration,
                totalMarks: lecture.exam.total_marks,
                name: lecture.exam.name,
                quizQuestions: Array.isArray(lecture.exam.quiz_questions)
                  ? lecture.exam.quiz_questions
                  : [],
                results: lecture.exam.results || [],
              }
            : null,
        }));
        setLectures(mappedLectures);
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

  const toggleLectureContents = () => setDrawerOpen((prev) => !prev);

  const handleLectureClick = (lectureIndex) => {
    setExpandedLectureIndex((prev) => (prev === lectureIndex ? null : lectureIndex));
  };

  const handleShowText = (lectureIndex) => {
    setActiveLectureIndex(lectureIndex);
    setActiveTab("Text");
    setShowQuizPopup(false);
  };

  const handleQuizButton = (lectureIndex) => {
    setActiveLectureIndex(lectureIndex);
    setShowQuizPopup(true);
  };

  const handleShowQuiz = (lectureIndex) => {
    setActiveLectureIndex(lectureIndex);
    setActiveTab("Quiz");
    setShowQuizPopup(false);
  };

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

  const currentLecture = activeLectureIndex !== null ? lectures[activeLectureIndex] : null;

  const hasQuiz = currentLecture && currentLecture.examDetails?.quizQuestions.length > 0;

  const examResult = currentLecture?.examDetails?.results?.find(
    (result) => result.student_id === user?.id
  ) || null;

  const showNextButton = activeLectureIndex < lectures.length - 1;

  const handleQustionSubmit = async () => {
    const response = await apiClient.askQustions(data);
  };

  const handleEditQustionSubmit = async () => {
    const response = await apiClient.editQustions(id);
  };

  const handleDeleteQustionSubmit = async () => {
    const response = await apiClient.deleteQustions(id);
  };

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
                <h3 className="text-lg font-bold border-b pb-4">{currentLecture.title}</h3>
                {activeTab === "Text" && (
                  <div
                    className="text-md mt-4 border p-4"
                    // Render the content with HTML formatting preserved.
                    dangerouslySetInnerHTML={{ __html: currentLecture.content }}
                  />
                )}
                {activeTab === "Quiz" && (
                  <TextQuizStu
                    type="quiz"
                    lectureId={currentLecture.id}
                    examId={currentLecture.examDetails?.id}
                    quizQuestions={currentLecture.examDetails?.quizQuestions}
                    examDuration={currentLecture.examDetails?.duration * 60}
                    examTotalMarks={currentLecture.examDetails?.totalMarks}
                    onFinishQuiz={async () => {
                      await fetchLecturesFromBackend();
                      setActiveLectureIndex(activeLectureIndex);
                    }}
                    user={user}
                    examResult={examResult}
                  />
                )}
              </>
            ) : (
              <p className="text-md text-gray-500">Select a lecture to view its content.</p>
            )}
          </div>

          {/* Side drawer for lectures */}
          {drawerOpen && (
            <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4">
              <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">Lectures</h2>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => {
                  const isExpanded = expandedLectureIndex === index;
                  const alreadyTaken = lecture.examDetails?.results?.some(
                    (result) => result.student_id === user?.id
                  );
                  return (
                    <div key={lecture.id || index} className="mb-4 pb-4 border-b">
                      <div className="flex justify-between items-center">
                        <span className="font-bold mr-2">Lecture {index + 1}:</span>
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
                            <span role="img" aria-label="text">📄</span>
                            <span>Text</span>
                          </button>
                          {lecture.examDetails?.quizQuestions?.length > 0 && (
                            <button
                              onClick={() => handleQuizButton(index)}
                              className="flex items-center space-x-2 px-4 py-2 border rounded-md"
                            >
                              <span role="img" aria-label="quiz">❓</span>
                              <span>Quiz</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No lectures available for this course.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className={`btn ${activeLectureIndex > 0 ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={activeLectureIndex <= 0}
          >
            Previous
          </button>
          {showNextButton && (
            <button
              onClick={handleNext}
              className={`btn ${activeLectureIndex < lectures.length - 1 ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
