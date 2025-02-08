
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const StudentDashboard = () => {
  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Quiz Scores",
        data: [3, 4, 2, 5, 4],
        backgroundColor: "#007BFF",
        barThickness: 15,
      },
    ],
  };

  return (
    <div className="p-8">
      {/* Dashboard Cards Section */}
      <div className="flex flex-wrap justify-center mt-10 gap-8">
        {/* Card 1 */}
        <div className="card w-80 h-60 bg-green-200 shadow-xl flex items-center justify-center p-4 py-8">
        <div className="card-inner">
              {/* Front Side */}
              <div className="card-front bg-green-200 dark:bg-green-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Total Courses taken</h2>
                <p className="text-md dark:text-black">15 Courses</p>
              </div>
              {/* Back Side */}
              <div className="card-back bg-green-300 dark:bg-green-300 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-lg font-semibold dark:text-black">Manage Courses</h2>
                <p className="text-sm dark:text-black">View, update, or delete existing courses.</p>
              </div>
              </div>
        </div>

        {/* Card 2 */}
        <div className="card w-80 h-60 bg-yellow-200 shadow-xl flex items-center justify-center p-4 py-8">
        <div className="card-inner">
      {/* Front Side */}
      <div className="card-front bg-yellow-200 dark:bg-yellow-200 flex flex-col items-center justify-center text-center p-4 py-8">
        <h2 className="text-xl font-bold dark:text-black">Exams given</h2>
        <p className="text-md dark:text-black">3 Courses</p>
      </div>
      {/* Back Side */}
      <div className="card-back bg-yellow-300 dark:bg-yellow-300 flex flex-col items-center justify-center text-center p-4 py-8">
        <h2 className="text-lg font-semibold dark:text-black">Exam Schedule</h2>
        <ul className="text-sm dark:text-black">
          <li><strong>Course:</strong> Math 101</li>
          <li><strong>Course:</strong> Physics 232</li>
          <li><strong>Course:</strong>  Database 566</li>
          
        </ul>
      </div>
    </div>
        </div>

        {/* Card 3 */}
        <div className="card w-80 h-60 bg-purple-200 shadow-xl flex items-center justify-center p-4 py-8">
        <div className="card-inner">
              {/* Front Side */}
              <div className="card-front bg-purple-200 dark:bg-purple-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Upcoming Exams</h2>
                <p className="text-md dark:text-black">4 Courses</p>
              </div>
              {/* Back Side */}
              <div className="card-back bg-purple-300 dark:bg-purple-300 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-lg font-semibold dark:text-black">Exam Schedule</h2>
                <ul className="text-sm dark:text-black">
          <li><strong>Course:</strong> Math 101 <strong>Date: 25 january</strong></li>
          <li><strong>Course:</strong> Physics 232 <strong>Date: 26 january</strong></li>
          <li><strong>Course:</strong>  Database 566 <strong>Date: 27 january</strong></li>
          
        </ul>
              </div>
            </div>
        </div>
      </div>

      {/* Calendar, Chart, and Notifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Calendar */}
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
            Class Schedule
          </h2>
          
          <div className="flex flex-col items-center justify-center h-full">
  <Calendar />
  <div className="mt-4">
    <p>8:30 PM - Quiz 1</p>
    <p>9:30 PM - Quiz 2</p>
  </div>
</div>
        </div>
        

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
            Quiz Performance
          </h2>
          <Bar data={barChartData} options={{ maintainAspectRatio: true }} />
        </div>

        {/* Notification List */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Notifications</h2>
            <button className="text-blue-600 dark:text-blue-300 text-sm">See All</button>
          </div>
          <div className="bg-blue-100 dark:bg-blue-300 p-3 mb-2 rounded-lg">
            <p className="text-sm">By Teacher</p>
            <p className="text-xs">Your assignment deadline is approaching.</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-300 p-3 rounded-lg">
            <p className="text-sm">By Teacher</p>
            <p className="text-xs">Dont forget to attend your math class today.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
