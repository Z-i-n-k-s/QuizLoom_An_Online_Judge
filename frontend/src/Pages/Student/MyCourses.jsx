import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/Api";

const MyCourses = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({
    course_code: "",
  });

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    setLoading(true);
    try {
      const studentInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      const studentId = studentInfo.student.id;
      const enrolledCourses = await apiClient.getEnrolledCourses(studentId);
      
       // Fetch all exam results
       const resultsResponse = await apiClient.getallResult();
       const studentResults = resultsResponse.filter(result => result.student_id === studentId);
       setExamResults(studentResults);
      setCourses(enrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }finally {
      setLoading(false);
    }
  };
 const handleunenroll = async (course) => {
  setLoading(true); 
    try {
      const courseId=course.id;
      console.log(courseId);
      const studentInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      const studentId = studentInfo.student.id;
       // Fetch all enrollments
    const allEnrollments = await apiClient.getallenrollments();

    // Find the enrollment ID where course_id matches the selected course
    const enrollment = allEnrollments.find(enrollment => 
      enrollment.course_id === courseId && enrollment.student_id === studentId
    );

    if (!enrollment) {
      console.error("Enrollment not found for the given course.");
      return;
    }

    const enrollmentId = enrollment.id;
    await apiClient.unenrollfromcourse(enrollmentId);
    } catch (error) {
      console.error("Error unenrolling in course:", error);
    }finally {
      setLoading(false); 
    }

  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleViewCourse = (course) => {
    navigate(`/student-panel/view-courses-stu/${course.id}`, { state: { courseName: course.name } });
  };
  

  const handleAddCourse = async () => {
    try {
      const studentInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      const studentId = studentInfo.student.id;
      const courseCode = newCourse.course_code;
      if (!courseCode) {
        console.error("Course code is missing!");
        return;
      }
      await apiClient.enrollByCourseCode(studentId, { course_code: courseCode });
      await fetchEnrolledCourses();
      setNewCourse({ course_code: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-center mt-10 gap-8">
        {/* Card 1 */}
        <div className="card w-80 h-60 bg-green-200 shadow-xl flex items-center justify-center p-4 py-8">
          <div className="card-inner">
            <div className="card-front bg-green-200 dark:bg-green-200 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold dark:text-black">Total Courses taken</h2>
              <p className="text-md dark:text-black">{courses.length} courses</p>
            </div>
            <div className="card-back bg-green-300 dark:bg-green-300 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-lg font-semibold dark:text-black">Manage Courses</h2>
              <p className="text-sm dark:text-black">
                {courses.map((course, index) => (
                  <li key={index}>{course.name}</li>
                ))}</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card w-80 h-60 bg-yellow-200 shadow-xl flex items-center justify-center p-4 py-8">
          <div className="card-inner">
            <div className="card-front bg-yellow-200 dark:bg-yellow-200 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold dark:text-black">Exams given</h2>
              <p className="text-md dark:text-black">{examResults.length} Courses</p>
            </div>
            <div className="card-back bg-yellow-300 dark:bg-yellow-300 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-lg font-semibold dark:text-black">Exam Schedule</h2>
              <ul className="text-sm dark:text-black">
              {examResults.map((result, index) => (
                  <li key={index}>{result.exam.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        {/* <div className="card w-80 h-60 bg-purple-200 shadow-xl flex items-center justify-center p-4 py-8">
          <div className="card-inner">
            <div className="card-front bg-purple-200 dark:bg-purple-200 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold dark:text-black">Upcoming Exams</h2>
              <p className="text-md dark:text-black">4 Courses</p>
            </div>
            <div className="card-back bg-purple-300 dark:bg-purple-300 flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-lg font-semibold dark:text-black">Exam Schedule</h2>
              <ul className="text-sm dark:text-black">
                <li><strong>Course:</strong> Math 101 <strong>Date: 25 January</strong></li>
                <li><strong>Course:</strong> Physics 232 <strong>Date: 26 January</strong></li>
                <li><strong>Course:</strong> Database 566 <strong>Date: 27 January</strong></li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>

      {/* Button Section */}
      <div className="flex justify-between items-center ml-10 mt-10 p-4 rounded-lg">
        <h3 className="text-2xl font-bold">Courses</h3>
        <button
          className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
          onClick={() => setIsModalOpen(true)}
        >
          Enroll in course
        </button>
      </div>

      {/* Table */}
      

      <div className="overflow-x-auto mt-8 ml-8">
        <table className="table w-full border rounded-lg mb-20">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              <th className="px-4 py-2 text-center">Sl No</th>
              <th className="px-4 py-2 text-center">Course Code</th>
              <th className="px-4 py-2 text-center">Course Name</th>
              <th className="px-4 py-2 text-center">Number of Lectures</th>
              <th className="px-4 py-2 text-center">Completion Time</th>
              <th className="px-4 py-2 text-center">Enrolled on</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{course.course_code}</td>
                <td className="px-4 py-2 text-center">{course.name}</td>
                <td className="px-4 py-2 text-center">{course.number_of_lectures}</td>
                <td className="px-4 py-2 text-center">{course.completion_time} hrs</td>
                <td className="px-4 py-2 text-center">{new Date(course.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">
                  <button 
                    onClick={() => handleViewCourse(course)}
                    className="btn btn-sm bg-btnbg text-white mr-2 dark:bg-secondary dark:hover:bg-btnbg"
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={()=>handleunenroll(course)}
                  >
                    Unenroll
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* enroll in New Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-600 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Enroll In  New Course
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="course_code"
                value={newCourse.course_code}
                onChange={handleInputChange}
                placeholder="Course code"
                className="input input-bordered  w-full text-white"
              />
              
              <div className="flex justify-end space-x-4">
                <button
                  className="btn bg-gray-700 text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-btnbg text-white"
                  onClick={handleAddCourse}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
