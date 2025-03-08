import { useEffect, useState } from "react";
import apiClient from "../../api/Api";

const TeacherResult = () => {
  const [query, setQuery] = useState("");
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Get teacher info and teacher id
      const teacherInfo = await apiClient.getUserById(
        localStorage.getItem("user_id")
      );
      const teacherId = teacherInfo.teacher.id;

      // Fetch courses for the teacher
      const coursesResponse = await apiClient.getCourses(teacherId);
      console.log("Response from fetchCourses:", coursesResponse);

      // Fetch all exam results
      const resultsResponse = await apiClient.getallResult();
      console.log("Results response:", resultsResponse);

      // Prepare an array to hold the combined exam result data
      const combinedResultData = [];

      // For each course, filter exam results matching the course id
      for (const course of coursesResponse) {
        const resultsForCourse = resultsResponse.filter(
          (result) => result.student_id === course.id
        );

        resultsForCourse.forEach((result) => {
          combinedResultData.push({
            course: course.name,
            exam: result.exam?.name || "N/A",
            studentId: result.student?.id || "N/A",
            studentName: result.student?.name || "N/A",
            totalMarks: result.exam?.total_marks || "N/A",
            obtainedMarks: result.obtained_marks,
            status: result.status,
          });
        });
      }
      setResultData(combinedResultData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter combined results based on the exam name query
  const filteredResults = resultData.filter((item) =>
    item.exam.toLowerCase().includes(query.toLowerCase()) ||
    item.course.toLowerCase().includes(query.toLowerCase()) ||
    item.studentName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full p-10">
        <div className="flex items-center justify-between mt-16">
          <h1 className="text-3xl font-bold mb-0">Exam Results</h1>
          <div className="flex items-center justify-end mb-3">
            <input
              type="text"
              placeholder="Search by Exam Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-2 py-2 w-60 border border-gray-200 rounded-md bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        ) : (
          // Table
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-left border-b">
                  <th className="p-2 text-center">Course Name</th>
                  <th className="p-2 text-center">Exam Name</th>
                  <th className="p-2 text-center">Student Id</th>
                  <th className="p-2 text-center">Student Name</th>
                  <th className="p-2 text-center">Total Mark</th>
                  <th className="p-2 text-center">Obtained Mark</th>
                  <th className="p-2 text-center">Pass/Fail Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b text-gray-800 dark:text-gray-200"
                  >
                    <td className="p-2 text-center">{item.course}</td>
                    <td className="p-2 text-center">{item.exam}</td>
                    <td className="p-2 text-center">{item.studentId}</td>
                    <td className="p-2 text-center">{item.studentName}</td>
                    <td className="p-2 text-center">{item.totalMarks}</td>
                    <td className="p-2 text-center">{item.obtainedMarks}</td>
                    <td className="p-2 text-center">
                      <span
                        className={`font-medium ${
                          item.status.toLowerCase() === "passed"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherResult;
