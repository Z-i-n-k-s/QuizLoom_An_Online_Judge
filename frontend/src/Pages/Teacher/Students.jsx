
import  { useState } from "react";

const Students= () => {
  const [query, setQuery] = useState("");

  
  const resultsData = [
    { course: "Bangla",id:1,  student: "Md salauddin",exam: 5,gender:"male"},
    { course: "English",id:44,  student: "Saharira shibli", exam: 4,gender:"male" },
  ];

  // Filter logic based on query
  const filteredResults = resultsData.filter((item) =>
    item.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full p-10 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between mt-16">
          <h1 className="text-3xl font-bold mb-0">Students</h1>
           <div className="flex items-center justify-end mb-3">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-2 py-2 w-60 border border-gray-200 dark:border-gray-200 rounded-md bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 icon"
          />
      

        </div>

      
       
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-bold text-left border-b">
                <th className="p-2 text-center">Course Name</th>
                <th className="p-2 text-center">Student Id</th>
                <th className="p-2 text-center">Student Name</th>
                <th className="p-2 text-center">Exam attended</th>
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
              <button
                className="btn btn-sm bg-btnbg text-white rounded-md px-4 py-1 dark:bg-secondary dark:hover:bg-btnbg"
              >
                Remove
              </button>
            
          </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};






export default Students