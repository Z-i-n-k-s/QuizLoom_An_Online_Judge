import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../api/Api";

const Courses = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    completion_time: "",
    number_of_lectures: "",
    course_code: "",
  });

  useEffect(() => {
    fetchCourses();
    
  }, []);

  const fetchCourses = async () => {
    try {
      
      const teacherInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      console.log("Teacher Info:", teacherInfo);
      const teacherId = teacherInfo.teacher.id;

     
      const response = await apiClient.getCourses(teacherId);
      console.log("Response from fetchCourses:", response);

      
      const fetchedCourses = Array.isArray(response) ? response : response?.courses || [];
      setCourses(fetchedCourses);
      console.log("Fetched Courses Data:", fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleViewCourse = (id,name) => {
    navigate(`/teacher-panel/teachers-courses/${id}`, { state: { cou: id,name } });
  };

  const handleAddCourse = async () => {
    try {
      const teacherInfo = await apiClient.getUserById(localStorage.getItem("user_id"));
      
      const teacherId = teacherInfo.teacher.id;
      
      const courseData = {
        ...newCourse,
        teacher_id: teacherId,
      };

      const response = await apiClient.addCourse(courseData);

      if (response) {
        console.log("Course added successfully:", response);
        
        setCourses((prevCourses) => [
          ...prevCourses,
          {
            id: response.id || prevCourses.length + 1,
            name: newCourse.name,
            
            enroll: response.enroll || 0,
         
            lectures: response.number_of_lectures || newCourse.number_of_lectures,
           
            duration: response.completion_time || newCourse.completion_time,
            status: response.status || "Ongoing",
          },
        ]);

        // Reset the input fields and close the modal
        setNewCourse({
          name: "",
          completion_time: "",
          number_of_lectures: "",
          course_code: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="bg-white">
      {/* Dashboard Cards */}
      <div className="flex flex-wrap justify-center mt-20">
        {/* Card 1 */}
        <div className="card-container m-4">
          <div className="card w-80 h-60 shadow-xl m-4 flex items-center justify-center">
            <div className="card-inner">
              <div className="card-front bg-green-200 dark:bg-green-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Total Courses Created</h2>
                <p className="text-md dark:text-black">{courses.length} Courses</p>
              </div>
              {/* Back Side */}
              <div className="card-back bg-green-300 dark:bg-green-300 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-lg font-semibold dark:text-black">Manage Courses</h2>
                <p className="text-sm dark:text-black">View, update, or delete existing courses.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-container m-4">
          <div className="card w-80 h-60 shadow-xl m-4 flex items-center justify-center">
            <div className="card-inner">
              <div className="card-front bg-yellow-200 dark:bg-yellow-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Upcoming Classes</h2>
                <p className="text-md dark:text-black">3 Courses Scheduled</p>
              </div>
               {/* Back Side */}
      <div className="card-back bg-yellow-300 dark:bg-yellow-300 flex flex-col items-center justify-center text-center p-4 py-8">
        <h2 className="text-lg font-semibold dark:text-black">Class Schedule</h2>
        <ul className="text-sm dark:text-black">
          <li><strong>Course:</strong> Math 101</li>
          <li><strong>Date:</strong> Jan 25, 2025</li>
          <li><strong>Time:</strong> 10:00 AM - 11:00 AM</li>
          <li><strong>Course:</strong> Science 201</li>
          <li><strong>Date:</strong> Jan 26, 2025</li>
          <li><strong>Time:</strong> 1:00 PM - 2:30 PM</li>
          <li><strong>Course:</strong> History 301</li>
          <li><strong>Date:</strong> Jan 27, 2025</li>
          <li><strong>Time:</strong> 9:00 AM - 10:30 AM</li>
        </ul>
      </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-container m-4">
          <div className="card w-80 h-60 shadow-xl m-4 flex items-center justify-center">
            <div className="card-inner">
              <div className="card-front bg-purple-200 dark:bg-purple-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Pending Assignments</h2>
                <p className="text-md dark:text-black">4 Assignments</p>
              </div>
                 {/* Back Side */}
                 <div className="card-back bg-purple-300 dark:bg-purple-300 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-lg font-semibold dark:text-black">Review Assignments</h2>
                <p className="text-sm dark:text-black">Check pending assignments submitted by students.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Header */}
      <div className="flex justify-between items-center ml-10 mt-10 p-4 rounded-lg">
        <h3 className="text-2xl font-bold">Courses</h3>
        <button
          className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto mt-8 ml-8">
        <table className="table w-full border rounded-lg mb-20">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              <th className="px-4 py-2 text-center">Sl No</th>
              <th className="px-4 py-2 text-center">Course Name</th>
              <th className="px-4 py-2 text-center">Total Enroll</th>
              <th className="px-4 py-2 text-center">Number of Lectures</th>
              <th className="px-4 py-2 text-center">Course Duration</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{course.name}</td>
                <td className="px-4 py-2 text-center">{course.enroll ?? 0}</td>
                <td className="px-4 py-2 text-center">
                  {course.number_of_lectures || course.lectures || "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {course.completion_time || course.duration || "N/A"}
                </td>
                <td className="px-4 py-2 text-center">{course.status || "Ongoing"}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewCourse(course.id,course.name)}
                    className="btn btn-sm bg-btnbg text-white mr-2"
                  >
                    View
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => { /* delete logic here */ }}>
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding New Course */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Course</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleInputChange}
                placeholder="Course Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="course_code"
                value={newCourse.course_code}
                onChange={handleInputChange}
                placeholder="Course Code"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="completion_time"
                value={newCourse.completion_time}
                onChange={handleInputChange}
                placeholder="Completion Time (in days)"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="number_of_lectures"
                value={newCourse.number_of_lectures}
                onChange={handleInputChange}
                placeholder="Number of Lectures"
                className="input input-bordered w-full"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn bg-gray-300 text-black dark:bg-gray-600 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="btn bg-btnbg text-white dark:bg-btnbg dark:text-white"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
