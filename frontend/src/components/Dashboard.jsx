import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProjectPage from "./ProjectPage";
import ProjectCard from "./ProjectCard";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("");
    const location = useLocation()
    const {message} = location.state || {};

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch(`https://project-app-mern.onrender.com/view`);
        result = await result.json();
        setProjects(result);
    };

    const handleProject = (projectId) => {
        setProjectId(projectId);
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`https://project-app-mern.onrender.com/upload/${projectId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('File uploaded successfully:', result);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar projects={projects} onSelectProject={handleProject} className="w-full lg:w-1/4 bg-gray-100" />
            <div className="flex-1 p-4">
              {message && (
                <div className="text-green-600 text-semibold mb-8">{message}</div>
              )}
              {/* {message_reg && (
                <div className="text-green-600 text-semibold mb-8">{message_reg}</div>
              )} */}
                {projectId ? (
                    <ProjectPage
                        projectId={projectId}
                        onUpload={handleUpload}
                    />
                ) : (
                    <ProjectCard projects={projects} />
                )}
            </div>
        </div>
    );
}
