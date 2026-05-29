import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get("https://cybersecurity-portfolio-cms.onrender.com/api/skills").then(res => setSections(res.data));
  }, []);

  return (
    <section id="skills" className="bg-[#050816] text-white px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-green-400 mb-20 text-center">Skills</h1>
        {sections.length === 0 && <p className="text-gray-500 text-center">No skills added yet.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((s) => (
            <div key={s._id} className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 hover:border-green-400 hover:shadow-[0_0_30px_#00ff88] transition">
              <h2 className="text-xl font-bold text-green-400 mb-6 pb-3 border-b border-gray-800">{s.section}</h2>
              <div className="flex flex-wrap gap-2">
                {s.skills.map((sk, i) => (
                  <span key={i} className="bg-green-400/10 border border-green-400/30 text-green-300 text-sm px-4 py-2 rounded-full">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;