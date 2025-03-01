
import  { useState } from "react";

const TeacherResult = () => {
  const [query, setQuery] = useState("");

  
  const resultsData = [
    { course: "Bangla", exam: "Quiz-1", id: 1 ,name: "Md salauddin", total: 20, obtained: 5, status: "Fail" },
    { course: "English", exam: "Midterm",id:22, name: "Saharira shibli", total: 30, obtained: 20, status: "Pass" },
  ];

  // Filter logic based on query
  const filteredResults = resultsData.filter((item) =>
    item.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full p-10 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between mt-16">
          <h1 className="text-3xl font-bold mb-0">Results</h1>
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
                <th className="p-2 text-center">Exam Name</th>
                <th className="p-2 text-center">Student Id</th>
                <th className="p-2 text-center">Student Name</th>
                <th className="p-2 text-center">Total Mark</th>
                <th className="p-2 text-center">Obtained Mark</th>
                <th className="p-2 text-center">PassFail Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((item, index) => (
                <tr key={index} className="text-gray-800 dark:text-gray-200 border-b">
                  <td className="p-2 text-center">{item.course}</td>
                  <td className="p-2 text-center">{item.exam}</td>
                  <td className="p-2 text-center">{item.id}</td>
                  <td className="p-2 text-center">{item.name}</td>
                  <td className="p-2 text-center">{item.total}</td>
                  <td className="p-2 text-center">{item.obtained}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`font-medium ${
                        item.status === "Pass" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
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


export default TeacherResult