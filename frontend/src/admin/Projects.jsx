import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", github: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  const fetch = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const handleImage = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "add") {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setEditImage(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("github", form.github);
      if (image) data.append("image", image);
      await axios.post("http://localhost:5000/api/projects", data);
      toast.success("Project added successfully");
      setForm({ title: "", description: "", github: "" });
      setImage(null);
      setPreview(null);
      fetch();
    } catch { toast.error("Failed to add"); }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/projects/${id}`);
    toast.success("Deleted successfully");
    fetch();
  };

  const handleEdit = async (id) => {
    try {
      const data = new FormData();
      data.append("title", editForm.title);
      data.append("description", editForm.description);
      data.append("github", editForm.github);
      if (editImage) data.append("image", editImage);
      await axios.put(`http://localhost:5000/api/projects/${id}`, data);
      toast.success("Updated successfully");
      setEditId(null);
      setEditPreview(null);
      fetch();
    } catch { toast.error("Update failed"); }
  };

  const removeAddImage = () => { setImage(null); setPreview(null); };
  const removeEditImage = () => { setEditImage(null); setEditPreview(null); };

  return (
    <AdminLayout title="Projects">
      <div className="max-w-2xl">
        <form onSubmit={handleAdd} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5 mb-8 space-y-3">
          <h3 className="text-sm font-medium text-[#c8d8ea]">Add Project</h3>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Project title" className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} placeholder="GitHub URL" className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />

          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-2">
              <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-4 py-2 rounded-lg text-sm hover:border-green-400 transition">📁 Upload Image</span>
              <span className="text-xs text-[#4b5e7a]">{image ? image.name : "No file chosen"}</span>
              <input type="file" accept="image/*" onChange={e => handleImage(e, "add")} className="hidden" />
            </label>
            {preview && (
              <div className="relative inline-block">
                <img src={preview} className="w-32 h-24 object-cover rounded-lg border border-[#1e2d4a]" alt="" />
                <button type="button" onClick={removeAddImage} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600">✕</button>
              </div>
            )}
          </div>

          <button type="submit" className="bg-green-400 text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-green-300 transition">Add Project</button>
        </form>

        <div className="space-y-3">
          {projects.length === 0 && <p className="text-[#4b5e7a] text-sm">No projects yet.</p>}
          {projects.map(p => (
            <div key={p._id} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-4">
              {editId === p._id ? (
                <div className="space-y-3">
                  <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={2} className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.github} onChange={e => setEditForm({ ...editForm, github: e.target.value })} className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" placeholder="GitHub URL" />
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer mb-2">
                      <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-3 py-1.5 rounded-lg text-xs hover:border-green-400 transition">📁 Change Image</span>
                      <span className="text-xs text-[#4b5e7a]">{editImage ? editImage.name : "No file"}</span>
                      <input type="file" accept="image/*" onChange={e => handleImage(e, "edit")} className="hidden" />
                    </label>
                    {(editPreview || p.image) && (
                      <div className="relative inline-block">
                        <img src={editPreview || "http://localhost:5000" + p.image} className="w-28 h-20 object-cover rounded-lg border border-[#1e2d4a]" alt="" />
                        <button type="button" onClick={removeEditImage} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">✕</button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(p._id)} className="bg-green-400 text-black px-4 py-1.5 rounded-lg text-sm font-medium">Save</button>
                    <button onClick={() => { setEditId(null); setEditPreview(null); }} className="bg-[#1a2840] text-white px-4 py-1.5 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {p.image && <img src={"http://localhost:5000" + p.image} className="w-16 h-16 rounded-lg object-cover border border-[#1e2d4a]" alt="" />}
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{p.title}</p>
                    <p className="text-[#4b5e7a] text-xs mt-0.5">{p.description}</p>
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="text-green-400 text-xs mt-1 block">🔗 GitHub</a>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditId(p._id); setEditForm({ title: p.title, description: p.description, github: p.github || "" }); setEditImage(null); setEditPreview(null); }} className="w-8 h-8 rounded-lg border border-[#1e2d4a] text-[#7a8fa8] hover:border-green-400 hover:text-green-400 transition text-sm flex items-center justify-center">✏️</button>
                    <button onClick={() => handleDelete(p._id)} className="w-8 h-8 rounded-lg border border-[#1e2d4a] text-[#7a8fa8] hover:border-red-400 hover:text-red-400 transition text-sm flex items-center justify-center">🗑️</button>
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

export default Projects;