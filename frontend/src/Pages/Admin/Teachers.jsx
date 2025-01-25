
const Teachers = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
      <div className=" w-full p-10 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between mt-16">
          <h1 className="text-3xl font-bold mb-6">Teachers</h1>
          <button className="px-4 py-2 bg-blue-900 text-white dark:bg-blue-400 dark:text-black rounded-md">
            Add New Teacher
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-bold text-left border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Email</th>
                <th className="p-2">Full Name</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Phone No</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Department</th>
                <th className="p-2">Status</th>
                <th className="p-2">Update</th>
                <th className="p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800 dark:text-gray-200 border-b">
                <td className="p-2">1</td>
                <td className="p-2">john.doe@example.com</td>
                <td className="p-2">John Doe</td>
                <td className="p-2">Male</td>
                <td className="p-2">123-456-7890</td>
                <td className="p-2">Mathematics</td>
                <td className="p-2">Science</td>
                <td className="p-2">
                  <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
