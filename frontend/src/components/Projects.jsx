import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa";

const API = "https://cybersecurity-portfolio-cms.onrender.com";
const PAGE_SIZE = 3;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    axios.get(`${API}/api/projects`).then(res => setProjects(res.data));
  }, []);

  const showMore = () => setVisible(v => Math.min(v + PAGE_SIZE, projects.length));
  const showLess = () => setVisible(v => Math.max(v - PAGE_SIZE, PAGE_SIZE));

  const displayed = projects.slice(0, visible);
  const canMore = visible < projects.length;
  const canLess = visible > PAGE_SIZE;

  return (
    <section id="projects" className="bg-[#050816] text-white px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green-400 mb-10 sm:mb-14 md:mb-20 text-center">
          Projects
        </h1>

        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {projects.length === 0 && (
            <p className="text-gray-500">No projects added yet.</p>
          )}

          {displayed.map((project) => (
            <div
              key={project._id}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch bg-[#0f172a] border border-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-green-400 hover:shadow-[0_0_30px_#00ff88] transition duration-300"
            >
              {/* Image */}
              {project.image
                ? <img
                    src={`${API}${project.image}`}
                    className="w-full h-48 sm:h-64 md:h-full min-h-[220px] object-cover"
                    alt={project.title}
                  />
                : <div className="h-48 sm:h-64 md:min-h-[280px] bg-gradient-to-br from-green-400/20 to-cyan-500/10 flex items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-400">PROJECT</h1>
                  </div>
              }

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 md:leading-9 mb-5 sm:mb-6 md:mb-8">
                  {project.description}
                </p>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 bg-green-400 text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:scale-105 transition w-fit"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* +More / Show Less controls */}
        {(canMore || canLess) && (
          <div className="flex justify-center gap-4 mt-10 sm:mt-14">
            {canLess && (
              <button
                onClick={showLess}
                className="bg-[#0f172a] border border-gray-700 text-gray-400 px-6 py-2.5 rounded-xl text-sm font-semibold hover:border-red-400 hover:text-red-400 transition"
              >
                − Show Less
              </button>
            )}
            {canMore && (
              <button
                onClick={showMore}
                className="bg-green-400 text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-300 transition"
              >
                + {Math.min(PAGE_SIZE, projects.length - visible)} More
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
