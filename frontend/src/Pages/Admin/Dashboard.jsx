import React from "react";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-wrap justify-center mt-10 gap-8">
        {/* Card 1 */}
        <div className="card w-80 h-60 bg-green-200 dark:bg-green-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Total Users</h2>
              <p className="text-md">15 Users</p>
            </div>
            <div className="card-back bg-green-300 dark:bg-green-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              <h2 className="text-lg font-semibold">Manage Users</h2>
              <p className="text-sm">View, update or delete existing users.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card w-80 h-60 bg-yellow-200 dark:bg-yellow-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Teachers</h2>
              <p className="text-md">7 Teachers</p>
            </div>
            <div className="card-back bg-yellow-300 dark:bg-yellow-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              <h2 className="text-lg font-semibold">Manage Teachers</h2>
              <p className="text-sm">View, update or delete existing teachers.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card w-80 h-60 bg-purple-200 dark:bg-purple-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Students</h2>
              <p className="text-md">15 Students</p>
            </div>
            <div className="card-back bg-purple-300 dark:bg-purple-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              <h2 className="text-lg font-semibold">Manage Students</h2>
              <p className="text-sm">View, update or delete existing students.</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Permissions Box */}
      <div className="p-12 flex justify-center">
        <div className="bg-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-72">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-3">
            New Permissions
          </h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 flex items-center rounded-md shadow-sm w-full">
            <input
              type="text"
              placeholder="Email"
              className="bg-transparent outline-none text-gray-700 dark:text-white w-full"
            />
          </div>
          <button className="mt-4 w-full bg-blue-900 dark:bg-blue-400 text-white dark:text-black py-2 rounded-md shadow-md font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition">
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
