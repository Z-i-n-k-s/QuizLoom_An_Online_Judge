import { useParams } from "react-router-dom";
import { useState } from "react";

const ViewCourse = () => {
  const { id } = useParams(); // This will get the course ID from the URL

  // Sample data for demonstration
  const [lectures, setLectures] = useState([
    {
      title: "Lecture 1: Introduction to Course",
      modules: [
        { moduleNo: "1", content: "Module 1 content" },
        { moduleNo: "2", content: "Module 2 content" },
      ]
    },
    {
      title: "Lecture 2: Advanced Topics",
      modules: [
        { moduleNo: "1", content: "Module 1 content for advanced topics" },
        { moduleNo: "2", content: "Module 2 content for advanced topics" },
      ]
    }
  ]);

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [lectureType, setLectureType] = useState('');
  const [expandedLectureIndex, setExpandedLectureIndex] = useState(null);

  const handleUploadClick = () => {
    setShowUploadOptions(true);
  };

  const handleLectureClick = (lectureIndex) => {
    if (expandedLectureIndex === lectureIndex) {
      setExpandedLectureIndex(null); 
    } else {
      setExpandedLectureIndex(lectureIndex); 
    }
  };

  const handleModuleClick = (module, lecture) => {
    setSelectedModule(module); 
    setSelectedLecture(lecture); 
  };

  const handleLectureTypeSelect = (type) => {
    setLectureType(type);
    setShowUploadOptions(false);
    
  };

  return (
    <div className="mt-20 ml-10">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{`Course ID: ${id}`}</h2> {/* Displaying the course ID */}
          <button
            onClick={handleUploadClick}
            className="btn border-none bg-btnbg text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary dark:bg-secondary dark:hover:bg-btnbg"
          >
            Upload
          </button>
        </div>

        {/* Main Container  */}
        <div className="flex">
          {/* Left Section */}
          <div className="flex-[3] p-6 bg-white dark:bg-gray-800 shadow-lg">
            {selectedLecture ? (
              <>
                <h3 className="text-lg font-bold border-b pb-4 ">{selectedLecture.title}</h3>
                {selectedModule ? (
                  <div>
                    <h4 className="text-md font-semibold pt-4">{`Module ${selectedModule.moduleNo}`}</h4>
                    <p className="text-md mt-4 border p-4">{selectedModule.content}</p>
                  </div>
                ) : (
                  <p className="text-md text-gray-500">Select a module to view its content.</p>
                )}
              </>
            ) : (
              <p className="text-md text-gray-500">Select a lecture to view its content.</p>
            )}
          </div>

          {/* Right Section*/}
          <div className="flex-[2] p-6 bg-white dark:bg-gray-800 shadow-lg ml-4">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">Lectures</h2>
            {lectures.length > 0 ? (
              lectures.map((lecture, index) => (
                <div key={index} className="mb-4 pb-4 border-b cursor-pointer">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => handleLectureClick(index)}
                  >
                    <h3 className="text-lg font-semibold">{lecture.title}</h3>
                    <button
                      className="text-sm text-blue-500"
                      onClick={() => handleLectureClick(index)}
                    >
                      {expandedLectureIndex === index ? "Collapse" : "Expand"}
                    </button>
                  </div>
                  {expandedLectureIndex === index && (
                    <div className="ml-4 mt-2">
                      {lecture.modules.map((module, moduleIndex) => (
                        <div
                          key={moduleIndex}
                          className="cursor-pointer text-sm text-gray-600 m-6"
                          onClick={() => handleModuleClick(module, lecture)}
                        >
                          {`Module ${module.moduleNo}`}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-md text-gray-500">No lectures uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Upload Options Modal */}
      {showUploadOptions && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select Lecture Type To Upload</h3>
            <button
              onClick={() => handleLectureTypeSelect("Text")}
              className="w-full mb-2 px-4 py-2 border hover:bg-btnbg text-black dark:hover:bg-secondary dark:text-white rounded-md"
            >
              Text Lecture
            </button>
            <button
              onClick={() => handleLectureTypeSelect("Quiz")}
              className="w-full px-4 py-2  border hover:bg-btnbg text-black dark:hover:bg-secondary dark:text-white rounded-md"
            >
              Quiz
            </button>
            <button
              onClick={() => setShowUploadOptions(false)}
              className="w-full mt-4 px-4 py-2 bg-red-500 text-white dark:hover:bg-secondary  rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {lectureType && (
        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-800 rounded-md">
          <h3 className="text-lg font-semibold">Uploaded Lecture</h3>
          <p>Lecture Type: {lectureType}</p>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
