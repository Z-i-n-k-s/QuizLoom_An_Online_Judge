import { useState } from "react";


const ViewCourse = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [typeList, setTypeList] = useState([]);

     const handleUpload = (newExam) => {
       setTypeList([...typeList, newExam]);
     };

    return (
        <div>
        
        <div className="flex justify-between items-center ml-10 mt-10 p-4 rounded-lg">
        <h3 className="text-2xl font-bold">Course Name</h3>
        <p>Uploaded Modules</p>
        <button onClick={() => setIsModalOpen(true)}
          className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
        >
          Upload New
        </button>
      </div>
            
           {/* Table */}
           <div className="overflow-x-auto mt-8 ml-8 ">
        <table className="table w-full border rounded-lg mb-20">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              <th className="px-4 py-2">Module No</th>
              <th className="px-4 py-2">Lecture No</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="px-4 py-2 text-center">1</td>
              <td className="px-4 py-2 text-center">Lec Title</td>
              <td className="px-4 py-2 text-center">
                <button 
                className="btn btn-sm bg-btnbg text-white mr-2 borded-none dark:bg-secondary dark:hover:bg-btnbg">Edit</button>
                <button className="btn btn-sm btn-error">Del</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
            

      {/* Modal for Adding Exam */}
      <ViewCourse
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpload }
      />
    </div>
       
    
  );
};


export default ViewCourse;