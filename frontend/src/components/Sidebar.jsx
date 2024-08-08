import { useState,useEffect } from 'react';

export default function Sidebar({  onSelectProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts = async () => {
    let result = await fetch(`http://localhost:8000/view`);
    result = await result.json();
    setProjects(result);
};

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(
        `https://project-app-mern.onrender.com/search/${key}`
      );
      result = await result.json();
      if(result){
        setProjects(result)
      }
    }else{
      getProducts()
    }
  };

  return (
    <div className="lg:flex flex-col  lg:min-h-screen w-full lg:w-1/4 bg-blue-400 text-white">
      <div className={`${isOpen ? 'block' : 'hidden'} relative  lg:block lg:min-h-screen lg:relative overflow-y-auto`}>
        <h2 className="text-xl font-bold p-4 border-b border-blue-700">Projects</h2>
        <input
        type="text"
        className="p-2 border border-gray-300 rounded-lg my-4 text-black w-[90%] max-w-md"
        placeholder="Search Project with Title"
        onChange={searchHandle}
      />
        <ul>
          {projects.length>0?projects.map((project) => (
            <li
              key={project._id}
              className="p-4 cursor-pointer hover:bg-blue-700 transition duration-300"
              onClick={() => onSelectProject(project._id)}
            >
              {project.name}
            </li>
          )):(
            
            <p colSpan="5" className="p-3 text-center text-red-600 text-lg font-bold">
                No Project Found !!
            </p>
          )}
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
