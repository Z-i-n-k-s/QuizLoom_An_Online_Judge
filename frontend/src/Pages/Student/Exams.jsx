import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Exams = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Math 101",
      enroll: 120,
      lectures: 20,
      duration: "130 days",
      totalMark: 100,
      status: "Finished",
    },
    {
      id: 2,
      name: "Database",
      enroll: 120,
      lectures: 20,
      duration: "130 days",
      totalMark: 100,
      status: "On Going",
    },
    {
      id: 3,
      name: "Mth 102",
      enroll: 120,
      lectures: 20,
      duration: "130 days",
      totalMark: 100,
      status: "Upcoming",
    },
  ]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
  });

  // Handle input changes for the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    
  };

  const handleViewCourse = (id) => {
    navigate(`/teacher-panel/teachers-courses/${id}`);
  };

  // Add course and update the course list
  const handleAddCourse = async () => {
   

    try {
      // POST request to the backend
      const response = await fetch("http://127.0.0.1:8000/api/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const result = await response.json();
   

      // Update the courses state
      setCourses((prevCourses) => {
        const updatedCourses = [
          ...prevCourses,
          {
            id: result.id || prevCourses.length + 1, // Fallback for ID if not returned by API
            name: newCourse.name,
            enroll: 0,
            lectures: 0,
            duration: newCourse.duration,
            status: "Ongoing",
          },
        ];
       
        return updatedCourses;
      });

      // Reset the form and close the modal
      setNewCourse({ name: "", duration: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <>
      <style>
        {`
          .card {
            perspective: 1000px;
          }
          .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s;
            transform-style: preserve-3d;
          }
          .card:hover .card-inner {
            transform: rotateY(180deg);
          }
          .card-front,
          .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .card-back {
            transform: rotateY(180deg);
          }
        `}
      </style>
      <div className="p-8">
        <div className="flex flex-wrap justify-center mt-10 gap-8">
          {/* Card 1 */}
          <div className="card w-80 h-60 bg-green-200 shadow-xl flex items-center justify-center p-4 py-8">
            <div className="card-inner">
              <div className="card-front bg-green-200 dark:bg-green-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Total Courses taken</h2>
                <p className="text-md dark:text-black">15 Courses</p>
              </div>
              <div className="card-back bg-green-300 dark:bg-green-300 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-lg font-semibold dark:text-black">Manage Courses</h2>
                <p className="text-sm dark:text-black">View, update, or delete existing courses.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card w-80 h-60 bg-yellow-200 shadow-xl flex items-center justify-center p-4 py-8">
            <div className="card-inner">
              <div className="card-front bg-yellow-200 dark:bg-yellow-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Exams given</h2>
                <p className="text-md dark:text-black">3 Courses</p>
              </div>
              <div className="card-back bg-yellow-300 dark:bg-yellow-300 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-lg font-semibold dark:text-black">Exam Schedule</h2>
                <ul className="text-sm dark:text-black">
                  <li><strong>Course:</strong> Math 101</li>
                  <li><strong>Course:</strong> Physics 232</li>
                  <li><strong>Course:</strong> Database 566</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card w-80 h-60 bg-purple-200 shadow-xl flex items-center justify-center p-4 py-8">
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
          </div>
        </div>

        {/* Button Section */}
        <div className="flex justify-between items-center ml-10 mt-10 p-4 rounded-lg">
          <h3 className="text-2xl font-bold">All Exams</h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-8 ml-8">
          <table className="table w-full border rounded-lg mb-20">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                <th className="px-4 py-2 text-center">SL no</th>
                <th className="px-4 py-2 text-center">Course Name</th>
                <th className="px-4 py-2 text-center">Exam Name</th>
                <th className="px-4 py-2 text-center">Exam Date</th>
                <th className="px-4 py-2 text-center">Exam Duration</th>
                <th className="px-4 py-2 text-center">Total Mark</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{course.name}</td>
                  <td className="px-4 py-2 text-center">{course.examName}</td>
                  <td className="px-4 py-2 text-center">{course.examDate}</td>
                  <td className="px-4 py-2 text-center">{course.duration}</td>
                  <td className="px-4 py-2 text-center">{course.totalMark}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`text-sm font-medium ${
                        course.status === "Finished"
                          ? "text-red-500"
                          : course.status === "Upcoming"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {course.status === "On Going" && (
                      <button
                        onClick={() => handleViewCourse(course.id)}
                        className="btn btn-sm bg-btnbg text-white rounded-md px-4 py-1 dark:bg-secondary dark:hover:bg-btnbg"
                      >
                        Join
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Exams;
