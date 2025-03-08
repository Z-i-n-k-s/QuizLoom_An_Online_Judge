import  { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import apiClient from "../../api/Api";

const TeacherAnnouncements = () => {
  const user = useSelector((state) => state?.user?.user);
  // console.log("Teacher ID:", user);

  // Announcements will be fetched from the backend.
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // For filtering, we use the course name.
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Fetched teacher courses
  const [courses, setCourses] = useState([]);

  // Modal state for new announcement.
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    course: "",
    title: "",
    message: "",
  });

  // State for editing an announcement.
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Fetch teacher courses from backend.
  useEffect(() => {
    const fetchTeacherCourses = async () => {
      try {
        const response = await apiClient.getTeacherCourses(user.teacher.id);
        // Adjust based on your response structure.
        setCourses(response.courses || response);
      } catch (error) {
        console.error("Error fetching teacher courses", error);
      }
    };

    if (user && user.teacher && user.teacher.id) {
      fetchTeacherCourses();
    }
  }, [user]);

  // Fetch teacher announcements from backend.
  useEffect(() => {
    const fetchTeacherAnnouncements = async () => {
      try {
        const response = await apiClient.getTeacherAnnouncements(user.teacher.id);
        console.log("Fetched Announcements:", response);
        // Adjust based on your response structure.
        const fetchedAnnouncements = response.announcements || response;
        // Sort announcements by created_at in descending order.
        fetchedAnnouncements.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error fetching teacher announcements", error);
      }
    };

    if (user && user.teacher && user.teacher.id) {
      fetchTeacherAnnouncements();
    }
  }, [user]);

  // Filter announcements based on search, course and date range.
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase());
    // Use course_id from the announcement to get its corresponding course name.
    const announcementCourseName =
      courses.find((course) => course.id === announcement.course_id)?.name || "";
    const matchesCourse = selectedCourse ? announcementCourseName === selectedCourse : true;
    const announcementDate = new Date(announcement.created_at);
    const matchesStartDate = startDate ? announcementDate >= startDate : true;
    const matchesEndDate = endDate ? announcementDate <= endDate : true;
    return matchesSearch && matchesCourse && matchesStartDate && matchesEndDate;
  });

  // Handler for submitting a new announcement.
  const handleNewAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      // newAnnouncement.course holds the course id.
      const courseId = newAnnouncement.course;
      const announcementData = {
        teacher_id: user.teacher.id,
        title: newAnnouncement.title,
        message: newAnnouncement.message,
      };

      // Post the announcement using the API client.
      const response = await apiClient.addAnnouncements(courseId, announcementData);

      // If the response doesn't include a created_at, default to today's date.
      if (!response.created_at) {
        response.created_at = new Date().toISOString().split("T")[0];
      }

      // Prepend the newly created announcement to the announcements list.
      setAnnouncements((prev) => [response, ...prev]);

      // Reset the form fields and close the modal.
      setNewAnnouncement({ course: "", title: "", message: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating announcement", error);
    }
  };

  // Handler for deleting an announcement.
  const handleDeleteAnnouncement = async (id) => {
    try {
      await apiClient.deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
    } catch (error) {
      console.error("Error deleting announcement", error);
    }
  };

  // Handler for submitting an edit.
  const handleEditAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        title: editingAnnouncement.title,
        message: editingAnnouncement.message,
      };

      const response = await apiClient.updateAnnouncement(editingAnnouncement.id, updateData);

      // Update the announcements state with the updated announcement.
      setAnnouncements((prev) =>
        prev.map((ann) => (ann.id === editingAnnouncement.id ? response : ann))
      );

      // Clear editing state.
      setEditingAnnouncement(null);
    } catch (error) {
      console.error("Error updating announcement", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full p-10 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between mt-16">
          <h1 className="text-3xl font-bold mb-6">Teacher Announcements</h1>
          <button
            className="bg-btnbg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded dark:bg-secondary"
            onClick={() => setShowModal(true)}
          >
            Add New Announcement
          </button>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or body..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md bg-gray-200 border-gray-300 dark:bg-gray-800"
          />

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-2 border rounded-md bg-gray-200 border-gray-300 dark:bg-gray-800"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 dark:bg-gray-800"
            isClearable
            clearIcon={
              <span className="text-red-500 font-bold text-xl cursor-pointer hover:text-red-700">×</span>
            }
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 dark:bg-gray-800"
            isClearable
            clearIcon={
              <span className="text-red-500 font-bold text-xl cursor-pointer hover:text-red-700">×</span>
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
                <th className="p-4 text-center">Announcement</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.map((announcement) => {
                const courseName =
                  courses.find((course) => course.id === announcement.course_id)?.name ||
                  "Unknown";
                return (
                  <tr key={announcement.id} className="text-gray-800 dark:text-gray-200 border-b">
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
                    <td className="p-7">
                      <div className="bg-blue-100 text-black py-2 px-2 rounded-lg">
                        <h4 className="font-bold">{announcement.title}</h4>
                        <p>{announcement.message}</p>
                      </div>
                    </td>
                    <td className="p-2 flex flex-col gap-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => setEditingAnnouncement(announcement)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                      >
                        Delete
                      </button>
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

      {/* Modal for Adding a New Announcement */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Announcement</h2>
            <form onSubmit={handleNewAnnouncementSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Course</label>
                <select
                  value={newAnnouncement.course}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, course: e.target.value })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Message</label>
                <textarea
                  value={newAnnouncement.message}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, message: e.target.value })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Editing an Announcement */}
      {editingAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Announcement</h2>
            <form onSubmit={handleEditAnnouncementSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) =>
                    setEditingAnnouncement({
                      ...editingAnnouncement,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Message</label>
                <textarea
                  value={editingAnnouncement.message}
                  onChange={(e) =>
                    setEditingAnnouncement({
                      ...editingAnnouncement,
                      message: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAnnouncements;
