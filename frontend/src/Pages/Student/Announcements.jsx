

const Announcements = () => {
  return (
    
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
    <div className=" w-full p-10 bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-between mt-16">
        <h1 className="text-3xl font-bold mb-6">Announcements</h1>
       
      </div>

      
             {/* Table */}
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
          <tr className="text-gray-800 dark:text-gray-200 border-b">
                <td className="p-2">
                  <div className="bg-blue-300 text-center text-black font-bold py-2 px-4 rounded-full">
                    02-04-2024
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-blue-200 text-center text-black font-bold py-2 px-4 rounded-full">
                    Bangla
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-orange-300 text-center text-black font-bold py-2 px-4 rounded-full">
                    Sombit
                  </div>
                </td>
                <td className="p-7">
                  <div className="bg-blue-100 text-black py-2 px-2 rounded-lg">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </div>
                </td>
              </tr>

              
              <tr className="text-gray-800 dark:text-gray-200">
                <td className="p-2 ">
                  <div className=" bg-blue-300 text-center l-20 text-black font-bold py-2 px-4 rounded-full">
                    05-07-2024
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-blue-200 text-center text-black font-bold py-2 px-4 rounded-full">
                    English
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-orange-300 text-center text-black font-bold py-2 px-4 rounded-full">
                    Takwa
                  </div>
                </td>
                <td className="p-7">
                  <div className="bg-blue-100 text-black py-3 px-4 rounded-lg">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>




  )
}

export default Announcements