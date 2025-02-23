import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import apiClient from "../../../api/Api";

const QuizUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examDetails = location.state?.examDetails;

  // Load saved data from localStorage
  const savedQuizSettings = JSON.parse(localStorage.getItem("quizSettings")) || { totalQuestions: "" };
  const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [{ question: "", options: ["", "", "", ""], correctAnswer: "" }];

  const [quizSettings, setQuizSettings] = useState(savedQuizSettings);
  const [questions, setQuestions] = useState(savedQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //const examId = localStorage.getItem("exam_id");
  const examId = location.state?.examId;
  const courseId = location.state?.courseId;
  console.log("Exam ID from storage:", examId);
  // Save to localStorage whenever quizSettings or questions change
  useEffect(() => {
    localStorage.setItem("quizSettings", JSON.stringify(quizSettings));
  }, [quizSettings]);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleSettingsChange = (e) => {
    setQuizSettings({ ...quizSettings, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].options[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (["A", "B", "C", "D"].includes(value) || value === "") {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].correctAnswer = value;
      setQuestions(updatedQuestions);
    } else {
      Swal.fire({
        title: "Invalid Input",
        text: "Please enter only A, B, C, or D as the correct answer.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
  

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try{

    console.log("Submitting quiz:", { quizSettings, questions });
  // Loop through all questions and add each one using the API
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionData = {
      question: String(question.question),
      option_a: String(question.options[0]),
      option_b: String(question.options[1]),
      option_c: String(question.options[2]),
      option_d: String(question.options[3]),
      correct_option: question.correctAnswer , 
    };
    await apiClient.addQuestionToExam(examId, questionData);
  }
    Swal.fire({
      title: "Quiz Submitted!",
      text: "Your quiz has been successfully uploaded.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    },
    navigate(`/teacher-panel/teachers-courses/${courseId}`)
  );

    localStorage.removeItem("quizSettings");
    localStorage.removeItem("questions");
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "An error occurred while uploading the quiz.",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });    
  };
  };
  const isLastQuestion = currentQuestionIndex + 1 === Number(quizSettings.totalQuestions);

  return (
    <div className="mt-20 ml-10 min-h-screen flex justify-center items-center p-6 dark:bg-gray-900">
      <div className="w-[90%] dark:bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-btnbg dark:text-secondary mb-6">
          Upload Quiz Questions for {examDetails?.examName}
        </h1>

        {/* Quiz Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Total Questions:
            </label>
            <input
              type="number"
              name="totalQuestions"
              value={quizSettings.totalQuestions}
              onChange={handleSettingsChange}
              className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter total questions"
            />
          </div>
        </div>

        {/* Question and Options Section */}
        <div className="p-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
          <label className="block text-2xl text-center font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Question {currentQuestionIndex + 1}:
          </label>
          <input
            type="text"
            value={questions[currentQuestionIndex].question}
            onChange={handleQuestionChange}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter your question"
          />

          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
            Options:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
               <div key={index} className="flex items-center space-x-2">
                <span className="font-bold">{String.fromCharCode(65 + index)}.</span>
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder={`Option `}
              />
            </div>
            ))}
          </div>
        </div>

        <label className="block text-lg font-semibold text-white dark:text-gray-200 mt-4">
          Correct Answer:
        </label>
        <input
          type="text"
          value={questions[currentQuestionIndex].correctAnswer}
          onChange={handleCorrectAnswerChange}
          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Enter correct answer"
        />

        {/* Navigation Buttons */}
        <div className="flex justify-start mt-6 space-x-4">
          <button
            onClick={handlePrev}
            className={`px-5 py-2 font-semibold rounded-lg transition duration-300 shadow-md ${
              currentQuestionIndex === 0
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-gray-400 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            }`}
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 font-semibold rounded-lg transition duration-300 shadow-md bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2 font-semibold rounded-lg transition duration-300 shadow-md bg-gray-400 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizUpload;
