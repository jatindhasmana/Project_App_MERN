export default function ProjectCard({ projects }) {
  return (
    <>
    {projects.length>0 ? <h2 className="text-2xl font-bold">Projects</h2> : <h2 className="text-5xl font-bold">No Projects <small className="text-xl font-semibold text-red-600 block p-8">create new project</small></h2>}
    <div className="flex flex-wrap justify-start items-center overflow-auto p-4">
      {projects.map((project) => (
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          key={project._id}
        >
          <div className="p-4 border-2 rounded-lg bg-green-500 hover:shadow-lg transition-shadow duration-300 text-white h-full flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">{project.name}</h2>
              <p className="mb-4 truncate">{project.description}</p>
            </div>
            <div>
              <small className="text-xs block">created by: {project.owner}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
