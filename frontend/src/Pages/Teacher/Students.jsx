import { useEffect, useState } from "react";
import apiClient from "../../api/Api";

const Students = () => {
  const [query, setQuery] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true); // added loading state

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const teacherInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      const teacherId = teacherInfo.teacher.id;

      // Fetch courses for the teacher
      const coursesResponse = await apiClient.getCourses(teacherId);
      
     
      // Fetch all exam results
      const resultsResponse = await apiClient.getallResult();
     

      // Prepare an array to hold combined student data
      const combinedStudentData = [];

      // For each course, fetch enrolled students and combine with course data
      for (const course of coursesResponse) {
        try {
          const enrolledStudents = await apiClient.getenrollStudentinCourse(course.id);
         

          enrolledStudents.forEach((student) => {
            // Count the number of exam results matching the student id
            const examCount = resultsResponse.filter(
              (result) => result.student_id === student.id
            ).length;

            combinedStudentData.push({
              course: course.name, 
              id: student.id,     
              student: student.name, 
              exam: examCount,     
              gender: student.gender,
            });
          });
        } catch (error) {
          console.error(`Error fetching students for course ${course.id}:`, error);
        }
      }
      // Update state with the combined data
      setStudentData(combinedStudentData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); // Data fetching complete, remove loader
    }
  };

  // Filter the combined student data based on the query (by course name or student name)
  const filteredResults = studentData.filter((item) =>
    item.course.toLowerCase().includes(query.toLowerCase()) ||
    item.student.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex ml-8 h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full p-10 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between mt-16 ">
          <h1 className="text-3xl font-bold mb-0 ml-5">Students</h1>
          <div className="flex items-center justify-end mb-3 ">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-2 py-2 w-60 border border-gray-200 dark:border-gray-200 rounded-md bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 icon"
            />
          </div>
        </div>

        {loading ? (
          // Loader Spinner
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
                  <th className="p-2 text-center">Student Id</th>
                  <th className="p-2 text-center">Student Name</th>
                  <th className="p-2 text-center">Exam Attended</th>
                  <th className="p-2 text-center">Gender</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item, index) => (
                  <tr key={index} className="text-gray-800 dark:text-gray-200 border-b">
                    <td className="p-2 text-center">{item.course}</td>
                    <td className="p-2 text-center">{item.id}</td>
                    <td className="p-2 text-center">{item.student}</td>
                    <td className="p-2 text-center">{item.exam}</td>
                    <td className="p-2 text-center">{item.gender}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="btn btn-sm bg-btnbg text-white rounded-md px-4 py-1 dark:bg-secondary dark:hover:bg-btnbg">
                        Remove
                      </button>
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

export default Students;
