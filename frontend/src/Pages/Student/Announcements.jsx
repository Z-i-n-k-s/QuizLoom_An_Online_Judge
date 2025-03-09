import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import apiClient from "../../api/Api";

const Announcements = () => {
  // Get the student information from Redux.
  const user = useSelector((state) => state?.user?.user);
  // Assuming that student information is stored under user.student
  const studentId = user?.student?.id;

  // State for announcements and enrolled courses.
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);

  // Filtering states.
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch student announcements.
  useEffect(() => {
    const fetchStudentAnnouncements = async () => {
      try {
        const data = await apiClient.getStudentAnnouncements(studentId);
        
        // Assuming data is an array of announcements, sort descending by created_at.
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching student announcements:", error);
      }
    };

    if (studentId) {
      fetchStudentAnnouncements();
    }
  }, [studentId]);

  // Fetch enrolled courses to map course_id to course name.
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const enrolled = await apiClient.getEnrolledCourses(studentId);
        // Assuming enrolled is an array of courses.
        setCourses(enrolled);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    if (studentId) {
      fetchEnrolledCourses();
    }
  }, [studentId]);

  // Filter announcements based on search, course, and date range.
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase());
    // Get the course name using course_id.
    const courseName =
      courses.find((course) => course.id === announcement.course_id)?.name ||
      "";
    const matchesCourse = selectedCourse ? courseName === selectedCourse : true;
    const annDate = new Date(announcement.created_at);
    const matchesStartDate = startDate ? annDate >= startDate : true;
    const matchesEndDate = endDate ? annDate <= endDate : true;
    return matchesSearch && matchesCourse && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full p-10 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between mt-16">
          <h1 className="text-3xl font-bold mb-6">Announcements</h1>
        </div>

        {/* Filtering Options */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
          />
          {/* Course Filter Dropdown */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-2 border rounded-md bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          {/* Date Filters */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded-md bg-gray-200  dark:bg-gray-800 dark:border-gray-700"
            isClearable
            clearIcon={
              <span className="text-red-500 font-bold text-xl cursor-pointer hover:text-red-700">
                ×
              </span>
            }
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded-md bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
            isClearable
            clearIcon={
              <span className="text-red-500 font-bold text-xl cursor-pointer hover:text-red-700">
                ×
              </span>
            }
          />
        </div>

        {/* Announcements Table */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-left border-b">
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Course Name</th>
                <th className="p-2 text-center">Teacher Name</th>
                <th className="p-4 text-center">Announcement</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.map((announcement) => {
                // Map course_id to course name.
                const courseName =
                  courses.find((course) => course.id === announcement.course_id)?.name ||
                  "Unknown";
                // Assuming the announcement object includes a teacher object with a name.
                const teacherName = announcement.teacher?.name || "Unknown";
                return (
                  <tr
                    key={announcement.id}
                    className="text-gray-800 dark:text-gray-200 border-b"
                  >
                    <td className="p-2">
                      <div className="bg-blue-300 text-center text-black font-bold py-2 px-4 rounded-full">
                        {new Date(announcement.created_at).toLocaleDateString("en-GB")}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="bg-blue-200 text-center text-black font-bold py-2 px-4 rounded-full">
                        {courseName}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="bg-orange-300 text-center text-black font-bold py-2 px-4 rounded-full">
                        {teacherName}
                      </div>
                    </td>
                    <td className="p-7">
                      <div className="bg-blue-100 text-black py-2 px-2 rounded-lg">
                        <h4 className="font-bold">{announcement.title}</h4>
                        <p>{announcement.message}</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredAnnouncements.length === 0 && (
            <div className="text-center p-4 text-gray-600 dark:text-gray-400">
              No announcements found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
