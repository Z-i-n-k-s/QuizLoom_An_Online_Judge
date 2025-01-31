import { useState } from "react";
import "./TeacherExams.css";

const TeacherExams = () => {
  const [examList, setExamList] = useState([]);

  const handleAddExam = (newExam) => {
    setExamList([...examList, newExam]);
  };

  return (
    <div className="px-4">
      {/* Cards */}
      <div className="flex justify-center mt-20">
        {/* Card 1 */}
        <div className="card-container m-4">
          <div className="card w-96 shadow-xl m-4 flex items-center justify-center">
            <div className="card-inner">
              {/* Front Side */}
              <div className="card-front bg-pink-200 dark:bg-pink-200 flex flex-col items-center justify-center text-center p-6 py-10">
                <h2 className="text-2xl font-bold dark:text-black">Total Exams Created</h2>
                <p className="text-lg dark:text-black">12 Exams</p>
              </div>
              {/* Back Side */}
              <div className="card-back bg-pink-300 dark:bg-pink-300 flex flex-col items-center justify-center text-center p-6 py-10">
                <h2 className="text-xl font-semibold dark:text-black">Manage Exams</h2>
                <p className="text-sm dark:text-black">View, edit, or delete existing exams.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-container m-4">
          <div className="card w-96 shadow-xl m-4 flex items-center justify-center">
            <div className="card-inner">
              {/* Front Side */}
              <div className="card-front bg-blue-200 dark:bg-blue-200 flex flex-col items-center justify-center text-center p-6 py-10">
                <h2 className="text-2xl font-bold dark:text-black">Upcoming Exams</h2>
                <p className="text-lg dark:text-black">5 Scheduled</p>
              </div>
              {/* Back Side */}
              <div className="card-back bg-blue-300 dark:bg-blue-300 flex flex-col items-center justify-center text-center p-6 py-10">
                <h2 className="text-xl font-semibold dark:text-black">Prepare for Exams</h2>
                <p className="text-sm dark:text-black">View details and prepare for upcoming exams.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-between items-center mt-10 p-4 rounded-lg">
        <h3 className="text-2xl font-bold">Exam List</h3>
        <button
          className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
          onClick={() => {
          }}
        >
          Add New Exam
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-8 ml-8">
        <table className="table w-full border rounded-lg">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              <th className="px-4 py-2">Sl No</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Exam Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Questions</th>
              <th className="px-4 py-2">Total Marks</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examList.map((exam, index) => (
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-600" key={index}>
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{exam.courseName}</td>
                <td className="px-4 py-2 text-center">{exam.examName}</td>
                <td className="px-4 py-2 text-center">{exam.date}</td>
                <td className="px-4 py-2 text-center">{exam.questions}</td>
                <td className="px-4 py-2 text-center">{exam.totalMarks}</td>
                <td className="px-4 py-2 text-center">{exam.status}</td>
                <td className="px-4 py-2 text-center">
                  <button className="btn btn-sm bg-btnbg text-white mr-2 borded-none dark:bg-secondary dark:hover:bg-btnbg">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-error">Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherExams;
