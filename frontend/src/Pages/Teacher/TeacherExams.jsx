import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherExams = () => {
  // Dummy data for demo
  const navigate = useNavigate();
  const [studentExamList, setStudentExamList] = useState([
    {
      id: 1,
      studentName: "John Doe",
      courseName: "Computer Science",
      examDetails: "Coding Exam 1 - 2025-03-01",
      marks: 85,
      evaluated: false,
    },
    {
      id: 2,
      studentName: "Jane Smith",
      courseName: "Mathematics",
      examDetails: "Math Exam 1 - 2025-03-02",
      marks: 92,
      evaluated: true,
    },
    {
      id: 3,
      studentName: "Alice Johnson",
      courseName: "Computer Science",
      examDetails: "Coding Exam 1 - 2025-03-01",
      marks: 78,
      evaluated: false,
    },
  ]);

  // Filter states
  const [filterStudentName, setFilterStudentName] = useState("");
  const [filterCourseName, setFilterCourseName] = useState("");

  // Filter the list based on input values
  const filteredExamList = studentExamList.filter((exam) => {
    return (
      exam.studentName.toLowerCase().includes(filterStudentName.toLowerCase()) &&
      exam.courseName.toLowerCase().includes(filterCourseName.toLowerCase())
    );
  });

  return (
    <div className="px-4 ml-10">
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-4 pt-4 text-center">
          Student Evaluation
        </h2>

        {/* Filter Section */}
        <form className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Student Name</label>
            <input
              type="text"
              value={filterStudentName}
              onChange={(e) => setFilterStudentName(e.target.value)}
              placeholder="Enter student name"
              className="p-2 border rounded-md bg-white dark:bg-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Course Name</label>
            <input
              type="text"
              value={filterCourseName}
              onChange={(e) => setFilterCourseName(e.target.value)}
              placeholder="Enter course name"
              className="p-2 border rounded-md bg-white dark:bg-gray-600"
            />
          </div>
        </form>

        {/* Table for Student Coding Exam List */}
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg mb-20">
            <thead className="bg-gray-600  dark:bg-gray-700">
              <tr className="text-white">
                <th className="px-4 py-2 text-center">Si No</th>
                <th className="px-4 py-2 text-center">Student Name</th>
                <th className="px-4 py-2 text-center">Course Name</th>
                <th className="px-4 py-2 text-center">Exam Details</th>
                <th className="px-4 py-2 text-center">Marks</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExamList.length > 0 ? (
                filteredExamList.map((exam, index) => (
                  <tr
                    key={exam.id}
                    className="transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{exam.studentName}</td>
                    <td className="px-4 py-2 text-center">{exam.courseName}</td>
                    <td className="px-4 py-2 text-center">{exam.examDetails}</td>
                    <td className="px-4 py-2 text-center">{exam.marks}</td>
                    <td className="px-4 py-2 text-center">
                      {exam.evaluated ? (
                        <button className="px-4 py-2 text-green-800 font-bold rounded-md">
                          Evaluated
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/teacher-panel/evaluate-code")}
                          className="px-4 py-2 bg-btnbg text-white dark:bg-secondary dark:text-black rounded-md"
                        >
                          Evaluate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">
                    No exams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherExams;
