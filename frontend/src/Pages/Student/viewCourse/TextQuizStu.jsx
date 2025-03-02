import { useState, useEffect } from "react";
import apiClient from "../../../api/Api";

const TextQuizStu = ({ type, lectureId, examId, onFinishQuiz }) => {
  
  const [quizData, setQuizData] = useState([]); // Always initialize as an array
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Timer logic
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, quizSubmitted]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Fetch quiz questions
  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.giveExamBystudent(examId);
      console.log("API Response:", response); 

      if (!Array.isArray(response)) {
        throw new Error("Invalid quiz data format");
      }

      setQuizData(response);
      setQuizStarted(true);
    } catch (err) {
      setError("Failed to fetch quiz questions.");
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  // Navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    if (onFinishQuiz) {
      onFinishQuiz({ quizData, selectedAnswers });
    }
  };

  // Safely compute total marks
  const totalMarks = Array.isArray(quizData)
    ? quizData.reduce((total, question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          return total + (question.marks || 0);
        }
        return total;
      }, 0)
    : 0;

  const totalPossibleMarks = Array.isArray(quizData)
    ? quizData.reduce((total, q) => total + (q.marks || 0), 0)
    : 0;

  // Reset quiz
  const handleBackToStartQuiz = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setViewAnswers(false);
    setTimeLeft(600);
  };

  // Render loading and error states
  if (type === "quiz" && !quizStarted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-900 text-center p-8 rounded-lg shadow-lg w-96 max-w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Quiz</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {loading ? (
            <p>Loading quiz questions...</p>
          ) : (
            <>
              <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
                Are you sure you want to start the quiz?
              </p>
              <button
                onClick={handleStartQuiz}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              >
                Start Quiz
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Quiz question display
  if (type === "quiz" && quizStarted && !quizSubmitted) {
    if (quizData.length === 0) {
      return <p>No quiz questions available.</p>;
    }
    const currentQuestion = quizData[currentQuestionIndex];

    return (
      <div>
        <div className="flex justify-end mb-4">
          <p className="p-4 border mr-4">Time Left: {formatTime(timeLeft)}</p>
          <p className="p-4 border">Total Marks: {totalPossibleMarks}</p>
        </div>

        <h1 className="text-xl font-bold mb-4">{currentQuestion.question}</h1>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer dark:hover:text-black ${
                selectedAnswers[currentQuestionIndex] === option
                  ? "bg-blue-400 text-black"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-300"
          >
            Previous
          </button>
          {currentQuestionIndex < quizData.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz results
  if (type === "quiz" && quizSubmitted) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold text-center mb-4">Quiz Results</h1>
        <p className="mb-4 text-lg">
          <span className="p-4 border rounded-full w-24 h-24 flex items-center justify-center text-lg font-semibold bg-blue-500 text-white">
            {totalMarks}/{totalPossibleMarks}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>{type === "text" ? "Text Content" : "Quiz Content"}</h1>
      <p>
        {type === "text"
          ? `This is the text content for Lecture ${lectureId}.`
          : `This is the quiz content for Lecture ${lectureId}.`}
      </p>
    </div>
  );
};

export default TextQuizStu;
