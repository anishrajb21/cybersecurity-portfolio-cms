import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ title: "", issuer: "", credentialId: "", verifyUrl: "" });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/certificates");
    setCerts(res.data);
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
      await axios.post("http://localhost:5000/api/certificates", data);
      toast.success("Certificate added");
      setForm({ title: "", issuer: "", credentialId: "", verifyUrl: "" });
      setImage(null);
      load();
    } catch { toast.error("Failed"); }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/certificates/${id}`);
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
      await axios.put(`http://localhost:5000/api/certificates/${id}`, data);
      toast.success("Updated");
      setEditId(null);
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <AdminLayout title="Certificates">
      <div className="max-w-2xl">
        <form onSubmit={handleAdd} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5 mb-8 space-y-3">
          <h3 className="text-sm font-medium text-[#c8d8ea]">Add Certificate</h3>
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Certificate title"
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />
          <input value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })}
            placeholder="Issuer (e.g. Cisco)"
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
          <button type="submit" className="bg-green-400 text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-green-300 transition">Add Certificate</button>
        </form>

        <div className="space-y-3">
          {certs.length === 0 && <p className="text-[#4b5e7a] text-sm">No certificates yet.</p>}
          {certs.map(c => (
            <div key={c._id} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-4">
              {editId === c._id ? (
                <div className="space-y-2">
                  <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.issuer} onChange={e => setEditForm({ ...editForm, issuer: e.target.value })}
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.credentialId || ""} onChange={e => setEditForm({ ...editForm, credentialId: e.target.value })}
                    placeholder="Credential ID"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.verifyUrl || ""} onChange={e => setEditForm({ ...editForm, verifyUrl: e.target.value })}
                    placeholder="Verify URL"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-3 py-1.5 rounded-lg text-xs hover:border-green-400 transition">Change Image</span>
                    <input type="file" accept="image/*" onChange={e => setEditImage(e.target.files[0])} className="hidden" />
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(c._id)} className="bg-green-400 text-black px-4 py-1.5 rounded-lg text-sm font-medium">Save</button>
                    <button onClick={() => setEditId(null)} className="bg-[#1a2840] text-white px-4 py-1.5 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {c.image && <img src={"http://localhost:5000" + c.image} className="w-14 h-14 rounded-lg object-cover border border-[#1e2d4a]" alt="" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{c.title}</p>
                    <p className="text-[#4b5e7a] text-xs">{c.issuer}</p>
                    {c.credentialId && <p className="text-[#4b5e7a] text-xs">ID: {c.credentialId}</p>}
                    {c.verifyUrl && <a href={c.verifyUrl} target="_blank" rel="noreferrer" className="text-green-400 text-xs hover:underline">🔗 Verify</a>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditId(c._id); setEditForm({ title: c.title, issuer: c.issuer, credentialId: c.credentialId, verifyUrl: c.verifyUrl }); setEditImage(null); }}
                      className="w-8 h-8 rounded-lg border border-[#1e2d4a] text-[#7a8fa8] hover:border-green-400 hover:text-green-400 transition text-sm flex items-center justify-center">✏️</button>
                    <button onClick={() => handleDelete(c._id)}
                      className="w-8 h-8 rounded-lg border border-[#1e2d4a] text-[#7a8fa8] hover:border-red-400 hover:text-red-400 transition text-sm flex items-center justify-center">🗑️</button>
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

export default Certificates;