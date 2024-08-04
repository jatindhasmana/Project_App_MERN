import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ProjectPage({ projectId, onUpload }) {
  const [project, setProject] = useState({});
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [isSuccess, setSuccess] = useState('');

  const path = JSON.parse(localStorage.getItem("user"))._id;

  const getProject = async () => {
    let result = await fetch(`http://localhost:8000/view/${projectId}`);
    result = await result.json();
    setProject({ ...result });
  };

  const getFiles = async () => {
    let result = await fetch(`http://localhost:8000/upload/${projectId}`);
    result = await result.json();
    setUploads(result);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await onUpload(file).then(setSuccess("File has been uploaded successfully"));
      setFile(null); // Clear the file input after upload
      getFiles(); // Refresh the uploaded files list
    }
  };

  useEffect(() => {
    getProject();
    getFiles();
  }, [projectId]);

  return (
    <div className="p-4 bg-blue-50 text-gray-800 overflow-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{project.name}</h2>
      <p className="border-2 p-4 bg-blue-200 text-blue-900 text-lg rounded-lg mb-6">
        {project.description}
      </p>
      {path === project.owner && <small className="block mb-4 text-green-700">Owned by you</small>}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed bg-white shadow-lg py-16 mb-6 flex flex-col items-center rounded-lg transition-colors ${
          isDragActive ? "bg-gray-100 border-gray-400" : "bg-gray-50 border-gray-300"
        }`}
      >
        <input {...getInputProps()} className="hidden" />
        <p className="text-gray-600 mb-4">
          {isDragActive ? "Drop the file here..." : "Drag and drop a file here or click to select a file"}
        </p>
        {file && (
          <p className="text-green-600 mb-4">
            Selected file: {file.name}
          </p>
        )}
      </div>

      <button
        type="button"
        className="px-6 py-2 mb-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        onClick={handleSubmit}
      >
        Upload
      </button>

      <p className="text-green-600 text-sm">{isSuccess}</p>

      <h3 className="text-2xl font-semibold mb-4">Uploaded files</h3>
      <div className="space-y-2">
        {uploads.map((upload, index) => (
          <div key={index} className="p-2 bg-green-100 text-blue-500 rounded-lg shadow-sm truncate">
            <a href={upload.filePath} target="_blank" rel="noopener noreferrer">
              {upload.filePath}
            </a>
            <small className="block text-xs text-gray-500 mt-1">{upload.owner}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
