import { useState } from 'react';

export default function Sidebar({ projects, onSelectProject }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:flex flex-col  lg:min-h-screen w-full lg:w-1/4 bg-blue-400 text-white">
      <div className={`${isOpen ? 'block' : 'hidden'} relative  lg:block lg:min-h-screen lg:relative overflow-y-auto`}>
        <h2 className="text-xl font-bold p-4 border-b border-blue-700">Projects</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project._id}
              className="p-4 cursor-pointer hover:bg-blue-700 transition duration-300"
              onClick={() => onSelectProject(project._id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden p-4 bg-blue-500 text-white">
        <button onClick={toggleSidebar} className="focus:outline-none">
          SideBar
        </button>
      </div>
    </div>
  );
}
