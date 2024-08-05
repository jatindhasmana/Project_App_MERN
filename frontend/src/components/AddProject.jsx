import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!title) tempErrors.title = "Title is required.";
    if (!descp) tempErrors.descp = "Description is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      let owner = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch(`https://project-app-mern.onrender.com/add`, {
        method: "Post",
        body: JSON.stringify({ name: title, description: descp, owner: owner }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      navigate("/" , {state: {message: "Project Added Successfully"}});
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md my-20 ">
      <h3 className="text-2xl font-bold mb-6">Create New Project</h3>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-1 p-2 border rounded-lg w-full ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Name your project"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="desc"
          value={descp}
          onChange={(e) => setDescp(e.target.value)}
          className={`mt-1 p-2 border rounded-lg w-full ${
            errors.descp ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe the project briefly"
        />
        {errors.descp && <p className="text-red-500 text-sm mt-1">{errors.descp}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        ADD
      </button>
    </div>
  );
}
