import React from "react";

const TeacherDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-wrap justify-center mt-10 gap-8">
        {/* Card 1 */}
        <div className="card w-80 h-60 bg-green-200 dark:bg-green-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Courses</h2>
              <p className="text-md">15 Courses</p>
            </div>
            <div className="card-back bg-green-300 dark:bg-green-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              <h2 className="text-lg font-semibold">Manage Courses</h2>
              <p className="text-sm">View, update or delete existing courses.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card w-80 h-60 bg-yellow-200 dark:bg-yellow-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Total Exams Finished</h2>
              <p className="text-md">7 Exams</p>
            </div>
            <div className="card-back bg-yellow-300 dark:bg-yellow-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              <h2 className="text-lg font-semibold">Manage Exams</h2>
              <p className="text-sm">View, update or delete existing Exams.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card w-80 h-60 bg-purple-200 dark:bg-purple-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold"> Enroll Students</h2>
              <p className="text-md">15 Students</p>
            </div>
            <div className="card-back bg-purple-300 dark:bg-purple-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              <h2 className="text-lg font-semibold">Manage Students</h2>
              <p className="text-sm">View, update or delete existing students.</p>
            </div>
          </div>
        </div>
      </div>
  

  {/* Courses and exams section */}
      <div className="flex flex-wrap justify-center mt-10 gap-8">
{/* courses section */}
<div className="card w-96 h-60 bg-gray-300 dark:bg-gray-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Top Courses</h2>
              <p>
                4 courses
              </p>
            </div>
            <div className="card-back bg-gray-400 dark:bg-gray-700  shadow-xl  flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              
              <ul className="space-y-2 ">
                <li className="flex justify-between text-md">
                <span>1. Bangla</span>
                </li>
                <li className="flex justify-between text-md">
                <span>2.Math1</span>
                </li>
                <li className="flex justify-between text-md">
                <span>3. Math</span>
                </li>
                <li className="flex justify-between text-md">
                <span>4. Java</span>
                </li>
                </ul>
            </div>
          </div>
        </div>

          {/* exams section */}
          <div className="card w-96 h-90 bg-blue-200 dark:bg-blue-800 shadow-xl flex items-center justify-center p-4 py-8 rounded-lg">
          <div className="card-inner text-gray-900 dark:text-white">
            <div className="card-front flex flex-col items-center justify-center text-center p-4 py-8">
              <h2 className="text-xl font-bold">Top Exams</h2>
              <p>
                4 exams
              </p>
              
            </div>
            <div className="card-back bg-blue-300 dark:bg-blue-700 flex flex-col items-center justify-center text-center p-4 py-8 rounded-lg">
              
              <ul className="space-y-2">
          <li className="flex justify-between text-md">
            <span>1. Bangla</span>
            <span>Quiz-1</span>
          </li>
          <li className="flex justify-between text-md">
            <span class="pr-8">2. Math1</span>
            <span>Quiz-1</span>
          </li>
          <li className="flex justify-between text-md">
            <span>3. Math</span>
            <span>Quiz-1</span>
          </li>
          <li className="flex justify-between text-md">
            <span>4. Java</span>
            <span>Quiz-1</span>
          </li>
        </ul>
            </div>
          </div>
        </div>



        </div>

    </div>
  );
};


export default TeacherDashboard













