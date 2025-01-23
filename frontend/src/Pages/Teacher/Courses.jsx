import ViewCourse from "./viewCourse/ViewCourse";

const Courses = () => {
  return (
    <div>
      {/* Cards */}
      <div className="flex flex-wrap justify-center mt-20">
        {/* Card 1 */}
        <div className="card-container m-4">
          <div className="card w-80 h-60 shadow-xl m-4 flex items-center justify-center">
            <div className="card-inner">
              {/* Front Side */}
              <div className="card-front bg-green-200 dark:bg-green-200 flex flex-col items-center justify-center text-center p-4 py-8">
                <h2 className="text-xl font-bold dark:text-black">Total Courses Created</h2>
                <p className="text-md dark:text-black">15 Courses</p>
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
      {/* Front Side */}
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
              {/* Front Side */}
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

        {/* Button Section */}
        <div className="flex justify-between items-center ml-10 mt-10 p-4 rounded-lg">
        <h3 className="text-2xl font-bold">Courses</h3>
        <button
          className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
         
        >
          Add New Course
        </button>
      </div>

           {/* Table */}
           <div className="overflow-x-auto mt-8 ml-8 ">
        <table className="table w-full border rounded-lg mb-20">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              <th className="px-4 py-2">Sl No</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Total Enroll</th>
              <th className="px-4 py-2">Number of Lectures</th>
              <th className="px-4 py-2">Course Duration</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="px-4 py-2 text-center">1</td>
              <td className="px-4 py-2 text-center">Math 101</td>
              <td className="px-4 py-2 text-center">120</td>
              <td className="px-4 py-2 text-center">20</td>
              <td className="px-4 py-2 text-center">130 days</td>
              <td className="px-4 py-2 text-center">Finished</td>
              <td className="px-4 py-2 text-center">Active</td>
              <td className="px-4 py-2 text-center">
                <button onClick={ViewCourse}
                className="btn btn-sm bg-btnbg text-white mr-2 borded-none dark:bg-secondary dark:hover:bg-btnbg">View</button>
                <button className="btn btn-sm btn-error">Del</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
