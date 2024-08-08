import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectCard() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProjects();
  }, []);

  const key = JSON.parse(localStorage.getItem("user"))._id;

  const getProjects = async () => {
    let result = await fetch(`https://project-app-mern.onrender.com/userProjects/${key}`);
    result = await result.json();
    setProjects(result);
  };

  const handleDelete = async (projectId) => {
    try {
      let result = await fetch(`https://project-app-mern.onrender.com/delete/${projectId}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result.message) {
        setMessage(result.message);
      }
      getProjects();
    } catch (error) {
      setMessage("Failed to delete the project.");
    }
  };

  return (
    <>
      {message && (
        <div className={`p-4 text-green-500 }`}>
          {message}
        </div>
      )}
      {projects.length > 0 ? (
        <h2 className="text-2xl font-bold mb-6">My Projects</h2>
      ) : (
        <h2 className="text-5xl font-bold mt-10 text-center">
          No Projects Found
          <br />
          <Link to="/add">
            <small className="text-xl font-semibold text-red-600 block p-8">
              Create new project
            </small>
          </Link>
        </h2>
      )}
      <div className="flex flex-wrap justify-start items-start overflow-auto p-4 gap-4">
        {projects.map((project) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            key={project._id}
          >
            <div className="p-4 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-2">{project.name}</h2>
                <p className="text-gray-700 mb-4 truncate">{project.description}</p>
              </div>
              <div className="mb-4">
                <small className="text-xs text-gray-500 block">
                  Created_at: {project.created_at}
                </small>
              </div>
              <div className="flex justify-between">
                <Link to={`/update/${project._id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
