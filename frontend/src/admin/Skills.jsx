import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

function Skills() {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editSection, setEditSection] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState({});

  const load = () => {
    axios.get("https://cybersecurity-portfolio-cms.onrender.com/api/skills")
      .then(res => setSections(res.data))
      .catch(() => toast.error("Failed to load skills"));
  };

  useEffect(() => { load(); }, []);

  const addSection = async () => {
    if (!newSection.trim()) return;
    try {
      await axios.post("https://cybersecurity-portfolio-cms.onrender.com/api/skills", { section: newSection, skills: [] });
      toast.success("Section added");
      setNewSection("");
      load();
    } catch { toast.error("Failed to add section"); }
  };

  const deleteSection = async (id) => {
    try {
      await axios.delete(`https://cybersecurity-portfolio-cms.onrender.com/api/skills/${id}`);
      toast.success("Section deleted");
      load();
    } catch { toast.error("Delete failed"); }
  };

  const startEdit = (s) => {
    setEditingId(s._id);
    setEditSection(s.section);
    setEditSkills(s.skills.join(", "));
  };

  const saveEdit = async (id) => {
    const skills = editSkills.split(",").map(s => s.trim()).filter(Boolean);
    try {
      await axios.put(`https://cybersecurity-portfolio-cms.onrender.com/api/skills/${id}`, { section: editSection, skills });
      toast.success("Updated");
      setEditingId(null);
      load();
    } catch { toast.error("Update failed"); }
  };

  const addSkillToSection = async (s) => {
    const newSkill = (newSkillInputs[s._id] || "").trim();
    if (!newSkill) return;
    const updatedSkills = [...s.skills, newSkill];
    try {
      await axios.put(`https://cybersecurity-portfolio-cms.onrender.com/api/skills/${s._id}`, { section: s.section, skills: updatedSkills });
      toast.success("Skill added");
      setNewSkillInputs({ ...newSkillInputs, [s._id]: "" });
      load();
    } catch { toast.error("Failed"); }
  };

  const removeSkillFromSection = async (s, skillIndex) => {
    const updatedSkills = s.skills.filter((_, i) => i !== skillIndex);
    try {
      await axios.put(`https://cybersecurity-portfolio-cms.onrender.com/api/skills/${s._id}`, { section: s.section, skills: updatedSkills });
      toast.success("Skill removed");
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <AdminLayout title="Skills">
      <div className="max-w-2xl">

        {/* Add Section */}
        <div className="flex gap-3 mb-8">
          <input
            value={newSection}
            onChange={e => setNewSection(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addSection()}
            placeholder="New section (e.g. Networking, Full Stack)"
            className="flex-1 bg-[#0d1526] border border-[#1e2d4a] text-white p-3 rounded-xl outline-none focus:border-green-400 text-sm"
          />
          <button onClick={addSection}
            className="bg-green-400 text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-green-300 transition">
            + Add Section
          </button>
        </div>

        {sections.length === 0 && (
          <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-8 text-center">
            <p className="text-[#4b5e7a] text-sm">No sections yet. Type a section name above and click Add Section.</p>
          </div>
        )}

        <div className="space-y-4">
          {sections.map(s => (
            <div key={s._id} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5">

              {editingId === s._id ? (
                <div className="space-y-3">
                  <input value={editSection} onChange={e => setEditSection(e.target.value)}
                    placeholder="Section name"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm focus:border-green-400" />
                  <input value={editSkills} onChange={e => setEditSkills(e.target.value)}
                    placeholder="Skills comma separated: React, Node, CSS"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm focus:border-green-400" />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(s._id)} className="bg-green-400 text-black px-4 py-2 rounded-lg text-sm font-medium">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-[#1a2840] text-white px-4 py-2 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-base">{s.section}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(s)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-[#7a8fa8] hover:border-green-400 hover:text-green-400 transition">
                        Edit Name
                      </button>
                      <button onClick={() => deleteSection(s._id)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-[#7a8fa8] hover:border-red-400 hover:text-red-400 transition">
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Skills chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.skills.length === 0
                      ? <span className="text-xs text-[#4b5e7a]">No skills yet — add below</span>
                      : s.skills.map((sk, i) => (
                        <span key={i} className="flex items-center gap-1 bg-green-400/10 border border-green-400/30 text-green-300 text-xs px-3 py-1.5 rounded-full">
                          {sk}
                          <button onClick={() => removeSkillFromSection(s, i)}
                            className="text-green-400/60 hover:text-red-400 ml-1 transition">✕</button>
                        </span>
                      ))
                    }
                  </div>

                  {/* Add skill inline */}
                  <div className="flex gap-2">
                    <input
                      value={newSkillInputs[s._id] || ""}
                      onChange={e => setNewSkillInputs({ ...newSkillInputs, [s._id]: e.target.value })}
                      onKeyDown={e => e.key === "Enter" && addSkillToSection(s)}
                      placeholder="Add skill (e.g. TCP/IP)"
                      className="flex-1 bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400"
                    />
                    <button onClick={() => addSkillToSection(s)}
                      className="bg-green-400 text-black px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-300 transition">
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Skills;
