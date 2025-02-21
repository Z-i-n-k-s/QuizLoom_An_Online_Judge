import { useState, useEffect } from "react";

const TextQuizStu = ({ type, lectureId, onFinishQuiz }) => {
  // State to manage quiz flow
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers for each question
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10-minute timer (in seconds)
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false); // Whether to show all answers

  // Mock quiz data (replace with data from props or API)
  const quizData = [
    {
      question: "What is React?",
      options: ["A library", "A framework", "A programming language", "A database"],
      correctAnswer: "A library",
      marks: 5,
    },
    {
      question: "What is JSX?",
      options: [
        "A syntax extension for JavaScript",
        "A CSS framework",
        "A database query language",
        "A state management library",
      ],
      correctAnswer: "A syntax extension for JavaScript",
      marks: 5,
    },
  ];

  // Timer logic
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, quizSubmitted]);

  // Format time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handle starting the quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // Handle selecting an answer
  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle moving to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle submitting the quiz
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  // Calculate total marks
  const totalMarks = quizData.reduce((total, question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      return total + question.marks;
    }
    return total;
  }, 0);

  // Handle going back to the Start Quiz page
  const handleBackToStartQuiz = () => {
    setQuizStarted(false); // Reset quiz state
    setQuizSubmitted(false); // Reset submission state
    setCurrentQuestionIndex(0); // Reset to the first question
    setSelectedAnswers({}); // Clear selected answers
    setViewAnswers(false); // Hide answers
    setTimeLeft(600); // Reset timer
  };

  // Render quiz confirmation
  if (type === "quiz" && !quizStarted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-900 text-center p-8 rounded-lg shadow-lg w-96 max-w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Quiz</h1>
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
            Are you sure you want to start the quiz?
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Render quiz questions
  if (type === "quiz" && quizStarted && !quizSubmitted) {
    const currentQuestion = quizData[currentQuestionIndex];

    return (
      <div>
        {/* Timer and Total Marks */}
        <div className="flex justify-end mb-4">
          <p className="p-4 border mr-4">Time Left: {formatTime(timeLeft)}</p>
          <p className="p-4 border">Total Marks: {quizData.reduce((total, q) => total + q.marks, 0)}</p>
        </div>

        {/* Question */}
        <h1 className="text-xl font-bold mb-4">{currentQuestion.question}</h1>

        {/* Options (2 per line) */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer dark:hover:text-black ${
                selectedAnswers[currentQuestionIndex] === option
                  ? "bg-blue-400 text-black"
                  : "hover:bg-gray-100 "
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
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

  // Render quiz results with answers
  if (type === "quiz" && quizSubmitted) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold text-center mb-4">Quiz Results</h1>

        {/* Marks Circle */}
        <p className="mb-4 text-lg">
          <span className="p-4 border rounded-full w-24 h-24 flex items-center justify-center text-lg font-semibold bg-blue-500 text-white">
            {totalMarks}/{quizData.reduce((total, q) => total + q.marks, 0)}
          </span>
        </p>

        {/* View Answers and Back Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setViewAnswers((prev) => !prev)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {viewAnswers ? 'Hide Answers' : 'View Answers'}
          </button>
          <button
            onClick={handleBackToStartQuiz} // Call the handleBackToStartQuiz function
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Back 
          </button>
        </div>

        {/* View answers content */}
        {viewAnswers && (
          <div className="mt-6">
            {quizData.map((question, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-lg font-semibold">{question.question}</h2>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-4 border rounded-lg ${
                        option === question.correctAnswer
                          ? "bg-green-400"
                          : selectedAnswers[index] === option
                          ? "bg-red-400"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <p className="mt-2">
                  Your Answer:{" "}
                  <span className="font-semibold">
                    {selectedAnswers[index] || "Not answered"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default text content
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