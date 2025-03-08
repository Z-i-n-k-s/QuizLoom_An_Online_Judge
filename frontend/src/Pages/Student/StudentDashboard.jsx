import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import apiClient from "../../api/Api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const StudentDashboard = () => {
  // State to store exam results for the current student
  const [examResults, setExamResults] = useState([]);
  // State to store student announcements
  const [announcements, setAnnouncements] = useState([]);
  // State to store enrolled courses
  const [courses, setCourses] = useState([]);
  // Loading state for spinner
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch student info to obtain the student id
      const studentInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      const studentId = studentInfo.student.id;
      console.log("Student info:", studentInfo);
      
      // Fetch student announcements 
      const annData = await apiClient.getStudentAnnouncements(studentId);
      console.log("student ann data ", annData);
      // Sort announcements descending by created_at date (newest first)
      const sortedAnnouncements = annData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setAnnouncements(sortedAnnouncements);

      // Fetch all exam results
      const resultsResponse = await apiClient.getallResult();
      
      // Fetch all courses enrolled by the student
      const enrolledCourses = await apiClient.getEnrolledCourses(studentId);
      
      
      // Filter exam results based on the student id
      const studentResults = resultsResponse.filter(result => result.student_id === studentId);
      setExamResults(studentResults);

      // Store enrolled courses
      setCourses(enrolledCourses);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Build chart data from examResults
  const barChartData = {
    labels: examResults.map(result => result.exam.name), // Use exam names as labels
    datasets: [
      {
        label: "Exam Scores",
        data: examResults.map(result => result.obtained_marks), // Use obtained marks as data
        backgroundColor: "#007BFF",
        barThickness: 15,
      },
    ],
  };

  // Chart options with tooltip callback to display obtained_marks/total_marks
  const options = {
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const result = examResults[index];
            if (result && result.exam) {
              const obtained = result.obtained_marks;
              const total = result.exam.total_marks;
              return `${obtained} / ${total}`;
            }
            return '';
          },
        },
      },
    },
  };

  const handleSeeAll = () => {
    navigate("/student-panel/announcements");
  };

  // Show spinner until loading is complete
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 ">
      {/* Dashboard Cards Section */}
      <div className="flex flex-wrap justify-center mt-10 gap-8">
        {/* Card 1 */}
        <div className="card w-80 h-60 bg-green-200 shadow-xl flex items-center justify-center p-4 py-8">
          <div className="card-inner">
            {/* Front Side */}
            <div className="card-front bg-green-200 dark:bg-green-200 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold dark:text-black">Total Courses taken</h2>
              <p className="text-md dark:text-black">{courses.length} Courses</p>
            </div>
            {/* Back Side */}
            <div className="card-back bg-green-300 dark:bg-green-300 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-lg font-bold dark:text-black">Enrolled Courses</h2>
              <ul className="text-sm font-semibold dark:text-black">
                {courses.map((course, index) => (
                  <li key={index}>{course.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card w-80 h-60 bg-yellow-200 shadow-xl flex items-center justify-center p-4 py-8">
          <div className="card-inner">
            {/* Front Side */}
            <div className="card-front bg-yellow-200 dark:bg-yellow-200 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold dark:text-black">Exams given</h2>
              <p className="text-md dark:text-black">{examResults.length} Exams</p>
            </div>
            {/* Back Side */}
            <div className="card-back bg-yellow-300 dark:bg-yellow-300 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-lg font-bold dark:text-black">Exam Names</h2>
              <ul className="text-sm font-semibold dark:text-black">
                {examResults.map((result, index) => (
                  <li key={index}>{result.exam.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        {/* Card 3 can be uncommented or updated as needed */}
        {/* <div className="card w-80 h-60 bg-purple-200 shadow-xl flex items-center justify-center p-4 py-8">
          <div className="card-inner">
            <div className="card-front bg-purple-200 dark:bg-purple-200 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold dark:text-black">Upcoming Exams</h2>
              <p className="text-md dark:text-black">4 Courses</p>
            </div>
            <div className="card-back bg-purple-300 dark:bg-purple-300 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-lg font-semibold dark:text-black">Exam Schedule</h2>
              <ul className="text-sm dark:text-black">
                <li>
                  <strong>Course:</strong> Math 101 <strong>Date: 25 January</strong>
                </li>
                <li>
                  <strong>Course:</strong> Physics 232 <strong>Date: 26 January</strong>
                </li>
                <li>
                  <strong>Course:</strong> Database 566 <strong>Date: 27 January</strong>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>

      {/* Chart, and Notifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 ml-20">
        {/* Bar Chart for Exam Performance */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold dark:text-white">Exam Performance</h2>
          <Bar data={barChartData} options={options} />
        </div>

        {/* Notification List */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl overflow-y-auto max-h-80">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Notifications</h2>
            <button 
              className="text-blue-600 dark:text-blue-300 text-sm" 
              onClick={handleSeeAll}
            >
              See All
            </button>
          </div>
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <div key={index} className="bg-blue-100 dark:bg-blue-300 p-3 mb-2 rounded-lg">
                <p className="text-xl">
                  By {announcement.teacher?.name || announcement.teacher_name}
                </p>
                <p className="text-lg font-semibold">
                  {announcement.message || announcement.announcement}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm dark:text-white">No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
