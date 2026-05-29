import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://cybersecurity-portfolio-cms.onrender.com/api/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <section id="projects" className="bg-[#050816] text-white px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-green-400 mb-20 text-center">Projects</h1>
        <div className="space-y-16">
          {projects.length === 0 && <p className="text-gray-500">No projects added yet.</p>}
          {projects.map((project) => (
            <div key={project._id} className="grid md:grid-cols-2 gap-10 items-center bg-[#0f172a] border border-gray-800 rounded-3xl overflow-hidden">
              {project.image
                ? <img src={"https://cybersecurity-portfolio-cms.onrender.com" + project.image} className="w-full h-full min-h-[300px] object-cover" alt="" />
                : <div className="h-full min-h-[300px] bg-gradient-to-br from-green-400/20 to-cyan-500/10 flex items-center justify-center"><h1 className="text-5xl font-black text-green-400">PROJECT</h1></div>
              }
              <div className="p-10">
                <h2 className="text-4xl font-bold mb-6">{project.title}</h2>
                <p className="text-gray-400 text-lg leading-9 mb-8">{project.description}</p>
                {project.github && (
                  <a href={project.github} target="_blank" className="inline-flex items-center gap-3 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
                    <FaGithub /> GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;