import { useState, useEffect } from "react";
import apiClient from "../../../api/Api";

const TextQuizStu = ({
  type,
  lectureId,
  examId,
  quizQuestions,
  examDuration,
  examTotalMarks,
  onFinishQuiz,
  user,
  examResult, // New prop for existing result
}) => {
  console.log("results ",examResult)
  // Mapping from letter to numeric index.
  const letterToIndex = { A: 0, B: 1, C: 2, D: 3 };

  // If a result already exists, show it immediately.
  if (type === "quiz" && examResult) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold text-center mb-4">Quiz Results</h1>
        <p className="mb-4 text-lg">
          <span className="p-4 border rounded-full w-24 h-24 flex items-center justify-center text-lg font-semibold bg-blue-500 text-white">
            {examResult.obtained_marks}/{examTotalMarks}
          </span>
        </p>
      </div>
    );
  }

  // Initialize timer with examDuration (in seconds) or default to 600.
  const [timeLeft, setTimeLeft] = useState(examDuration || 600);
  const [quizData, setQuizData] = useState([]); // Always initialize as an array
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Instead of saving the option text, we store the numeric index (0 to 3).
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
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

  // Fetch or load quiz questions automatically when component mounts
  useEffect(() => {
    const startQuizAutomatically = async () => {
      setLoading(true);
      setError(null);
      try {
        if (
          quizQuestions &&
          Array.isArray(quizQuestions) &&
          quizQuestions.length > 0
        ) {
          setQuizData(quizQuestions);
        } else {
          const response = await apiClient.giveExamBystudent(examId);
          console.log("API Response:", response);
          if (!Array.isArray(response)) {
            throw new Error("Invalid quiz data format");
          }
          setQuizData(response);
        }
        setQuizStarted(true);
      } catch (err) {
        setError("Failed to fetch quiz questions.");
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (type === "quiz" && !quizStarted) {
      startQuizAutomatically();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, quizQuestions, examId]);

  // Handle answer selection and store the numeric index (0, 1, 2, or 3)
  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // Navigation within quiz
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

  // Function to call the API and save the result.
  // It takes finalScore as a parameter.
  const handleSubmit = async (finalScore) => {
    setLoading(true);
    try {
      // Ensure student_id and exam_id are provided and cast to integers.
      if (!user?.student.id || !examId) {
        throw new Error("Missing student id or exam id.");
      }
      // Determine status based on 40% passing threshold.
      const passingThreshold = 0.4 * examTotalMarks;
      const status = finalScore < passingThreshold ? "failed" : "passed";
      // Prepare data for submission.
      const resultData = {
        student_id: parseInt(user.student.id, 10),
        exam_id: parseInt(examId, 10),
        obtained_marks: finalScore,
        status: status,
      };
      console.log("Submitting result data:", resultData);
      // Submit the result.
      const response = await apiClient.saveResult(resultData);
      console.log("Result saved:", response);
    } catch (error) {
      console.error("Error during submission", error);
    } finally {
      setLoading(false);
    }
  };

  // Submit quiz, calculate score, and call the handleSubmit function.
  const handleSubmitQuiz = async () => {
    const marksEach = quizData.length
      ? parseFloat((examTotalMarks / quizData.length).toFixed(2))
      : 0;
    console.log(`Marks per question: ${marksEach}`);

    const obtainedMarks = quizData.reduce((score, question, index) => {
      const correctAnswerIndex = letterToIndex[question.correct_option];
      if (selectedAnswers[index] === correctAnswerIndex) {
        return score + marksEach;
      }
      return score;
    }, 0);
    const finalScore = Math.ceil(obtainedMarks);
    console.log(`Final Score: ${finalScore}/${examTotalMarks}`);

    await handleSubmit(finalScore);
    setQuizSubmitted(true);
    if (onFinishQuiz) {
      onFinishQuiz({ quizData, selectedAnswers, finalScore });
    }
  };

  // Quiz question display
  if (type === "quiz" && quizStarted && !quizSubmitted) {
    if (quizData.length === 0) {
      return <p>No quiz questions available.</p>;
    }
    const currentQuestion = quizData[currentQuestionIndex];
    const options = [
      currentQuestion.option_a,
      currentQuestion.option_b,
      currentQuestion.option_c,
      currentQuestion.option_d,
    ];

    return (
      <div>
        <div className="flex justify-end mb-4">
          <p className="p-4 border mr-4">Time Left: {formatTime(timeLeft)}</p>
          <p className="p-4 border">Total Marks: {examTotalMarks}</p>
        </div>

        <h1 className="text-xl font-bold mb-4">{currentQuestion.question}</h1>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer dark:hover:text-black ${
                selectedAnswers[currentQuestionIndex] === index
                  ? "bg-blue-400 text-black"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleAnswerSelect(index)}
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

  // Display quiz results after submission
  if (type === "quiz" && quizSubmitted) {
    console.log('submit ',type === "quiz" && quizSubmitted)
    const marksEach = quizData.length
      ? parseFloat((examTotalMarks / quizData.length).toFixed(2))
      : 0;
    const obtainedMarks = quizData.reduce((score, question, index) => {
      const correctAnswerIndex = letterToIndex[question.correct_option];
      if (selectedAnswers[index] === correctAnswerIndex) {
        return score + marksEach;
      }
      return score;
    }, 0);
    const finalScore = Math.ceil(obtainedMarks);

    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold text-center mb-4">Quiz Results</h1>
        <p className="mb-4 text-lg">
          <span className="p-4 border rounded-full w-24 h-24 flex items-center justify-center text-lg font-semibold bg-blue-500 text-white">
            {finalScore}/{examTotalMarks}
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
