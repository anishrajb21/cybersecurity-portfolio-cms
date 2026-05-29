import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function Badges() {
  const [badges, setBadges] = useState([]);
  const [form, setForm] = useState({ title: "", issuer: "", credentialId: "", verifyUrl: "" });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);

  const load = async () => {
    const res = await axios.get("https://cybersecurity-portfolio-cms.onrender.com/api/badges");
    setBadges(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("issuer", form.issuer);
      data.append("credentialId", form.credentialId);
      data.append("verifyUrl", form.verifyUrl);
      if (image) data.append("image", image);
      await axios.post("https://cybersecurity-portfolio-cms.onrender.com/api/badges", data);
      toast.success("Badge added");
      setForm({ title: "", issuer: "", credentialId: "", verifyUrl: "" });
      setImage(null);
      load();
    } catch { toast.error("Failed"); }
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://cybersecurity-portfolio-cms.onrender.com/api/badges/${id}`);
    toast.success("Deleted");
    load();
  };

  const handleEdit = async (id) => {
    try {
      const data = new FormData();
      data.append("title", editForm.title);
      data.append("issuer", editForm.issuer);
      data.append("credentialId", editForm.credentialId || "");
      data.append("verifyUrl", editForm.verifyUrl || "");
      if (editImage) data.append("image", editImage);
      await axios.put(`https://cybersecurity-portfolio-cms.onrender.com/api/badges/${id}`, data);
      toast.success("Updated");
      setEditId(null);
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <AdminLayout title="Badges">
      <div className="max-w-2xl">
        <form onSubmit={handleAdd} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5 mb-8 space-y-3">
          <h3 className="text-sm font-medium text-[#c8d8ea]">Add Badge</h3>
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Badge title"
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <input value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })}
            placeholder="Issuer"
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <input value={form.credentialId} onChange={e => setForm({ ...form, credentialId: e.target.value })}
            placeholder="Credential ID (optional)"
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <input value={form.verifyUrl} onChange={e => setForm({ ...form, verifyUrl: e.target.value })}
            placeholder="Verify URL (e.g. https://www.credly.com/...)"
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-4 py-2 rounded-lg text-sm hover:border-green-400 transition">Upload Image</span>
            <span className="text-xs text-[#4b5e7a]">{image ? image.name : "No file"}</span>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="hidden" />
          </label>
          <button type="submit" className="bg-green-400 text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-green-300 transition">Add Badge</button>
        </form>

        <div className="grid grid-cols-2 gap-4">
          {badges.length === 0 && <p className="text-[#4b5e7a] text-sm col-span-2">No badges yet.</p>}
          {badges.map(b => (
            <div key={b._id} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-4">
              {editId === b._id ? (
                <div className="space-y-2">
                  <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg outline-none text-xs" />
                  <input value={editForm.issuer} onChange={e => setEditForm({ ...editForm, issuer: e.target.value })}
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg outline-none text-xs" />
                  <input value={editForm.credentialId || ""} onChange={e => setEditForm({ ...editForm, credentialId: e.target.value })}
                    placeholder="Credential ID"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg outline-none text-xs" />
                  <input value={editForm.verifyUrl || ""} onChange={e => setEditForm({ ...editForm, verifyUrl: e.target.value })}
                    placeholder="Verify URL"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg outline-none text-xs" />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-3 py-1 rounded-lg text-xs">Change Image</span>
                    <input type="file" accept="image/*" onChange={e => setEditImage(e.target.files[0])} className="hidden" />
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(b._id)} className="bg-green-400 text-black px-3 py-1 rounded-lg text-xs font-medium">Save</button>
                    <button onClick={() => setEditId(null)} className="bg-[#1a2840] text-white px-3 py-1 rounded-lg text-xs">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  {b.image && <img src={"https://cybersecurity-portfolio-cms.onrender.com" + b.image} className="w-full h-28 object-contain rounded-lg mb-3 border border-[#1e2d4a]" alt="" />}
                  <p className="text-white text-sm font-medium">{b.title}</p>
                  <p className="text-[#4b5e7a] text-xs mb-1">{b.issuer}</p>
                  {b.credentialId && <p className="text-[#4b5e7a] text-xs mb-1">ID: {b.credentialId}</p>}
                  {b.verifyUrl && <a href={b.verifyUrl} target="_blank" rel="noreferrer" className="text-green-400 text-xs hover:underline block mb-3">🔗 Verify</a>}
                  <div className="flex gap-2">
                    <button onClick={() => { setEditId(b._id); setEditForm({ title: b.title, issuer: b.issuer, credentialId: b.credentialId, verifyUrl: b.verifyUrl }); setEditImage(null); }}
                      className="flex-1 border border-[#1e2d4a] text-[#7a8fa8] py-1.5 rounded-lg text-xs hover:border-green-400 hover:text-green-400 transition">Edit</button>
                    <button onClick={() => handleDelete(b._id)}
                      className="flex-1 border border-[#1e2d4a] text-[#7a8fa8] py-1.5 rounded-lg text-xs hover:border-red-400 hover:text-red-400 transition">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Badges;