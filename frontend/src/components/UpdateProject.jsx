import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProjectDetails();
    getFiles();
  }, []);

  const getProjectDetails = async () => {
    try {
      let result = await fetch(`https://project-app-mern.onrender.com/view/${params.id}`);
      result = await result.json();
      setName(result.name);
      setDescription(result.description);
      setOwner(result.owner);
    } catch (error) {
      setMessage("Failed to load project details.");
    }
  };

  const getFiles = async () => {
    try {
      let result = await fetch(`https://project-app-mern.onrender.com/upload/${params.id}`);
      result = await result.json();
      setFiles(result);
    } catch (error) {
      setMessage("Failed to load files.");
    }
  };

  const handleUpdate = async () => {
    if (!name || !description || !owner) {
      setError(true);
      return;
    }

    try {
      let result = await fetch(`https://project-app-mern.onrender.com/project/${params.id}`, {
        method: "put",
        body: JSON.stringify({ name, description, owner }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/", {state: {message:"Project has been Updated successfully"}});
    } catch (error) {
      setMessage("Failed to update project.");
    }
  };

  const deleteFile = async (key) => {
    try {
      let result = await fetch(`https://project-app-mern.onrender.com/file/${key}`, {
        method: "delete",
      });
      result = await result.json();
      setMessage(result.message);
      getFiles();
    } catch (error) {
      setMessage("Failed to delete file.");
    }
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6">Update Your Project</h3>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter project name"
          />
          {error && !name && (
            <span className="text-red-500 text-sm">Please enter a valid name.</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter project description"
          />
          {error && !description && (
            <span className="text-red-500 text-sm">Please enter a valid description.</span>
          )}
        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update
        </button>

        {message && (
          <div className="mt-4 text-center text-green-600">
            {message}
          </div>
        )}
      </div>

      <div className="p-6 mt-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
        <ul className="list-disc pl-5">
          {files.length > 0 ? (
            files.map((file) => (
              <li key={file._id} className="mb-2 flex items-center justify-between">
                <span className="px-2 text-blue-500">{file.uploaded_by.name}</span>
                <span className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{file.filePath}</span>
                <button
                  onClick={() => deleteFile(file._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No files uploaded.</li>
          )}
        </ul>
      </div>
    </>
  );
}
