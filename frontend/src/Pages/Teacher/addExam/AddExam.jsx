import { useState } from "react";
import PropTypes from "prop-types";

const AddExam = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [examName, setExamName] = useState("");
  const [courseName, setCourseName] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
    const newExamData = {
      examName,
      courseName,
      question,
      options,
    };
    console.log("New Exam Data:", newExamData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog id="add_exam_modal" className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box bg-gray-300">
        <h3 className="font-bold text-xl mb-4 text-center dark:text-black">Add New Exam</h3>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Exam Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100 dark:text-black"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Enter Exam Name"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100 dark:text-black"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter Course Name"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea
            className="textarea textarea-bordered w-full bg-gray-100 dark:text-black"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700  ">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="input input-bordered w-full mb-2 bg-gray-100 dark:text-black"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div className="modal-action">
          <button className="btn bg-btnbg text-white border-none" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn bg-red-700 text-white border-none" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

// Add Prop Validation
AddExam.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 'isOpen' must be a boolean and is required
  onClose: PropTypes.func.isRequired, // 'onClose' must be a function and is required
};

export default AddExam;
