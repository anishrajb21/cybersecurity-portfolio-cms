import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

const API = "https://cybersecurity-portfolio-cms.onrender.com";

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ title: "", issuer: "", credentialId: "", verifyUrl: "", issueDate: "" });
  const [image, setImage] = useState(null);
  const [doc, setDoc] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editDoc, setEditDoc] = useState(null);

  const load = async () => {
    const res = await axios.get(`${API}/api/certificates`);
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
      data.append("issueDate", form.issueDate);
      if (image) data.append("image", image);
      if (doc) data.append("document", doc);
      await axios.post(`${API}/api/certificates`, data);
      toast.success("Certificate added");
      setForm({ title: "", issuer: "", credentialId: "", verifyUrl: "", issueDate: "" });
      setImage(null);
      setDoc(null);
      load();
    } catch { toast.error("Failed"); }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/certificates/${id}`);
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
      data.append("issueDate", editForm.issueDate || "");
      if (editImage) data.append("image", editImage);
      if (editDoc) data.append("document", editDoc);
      await axios.put(`${API}/api/certificates/${id}`, data);
      toast.success("Updated");
      setEditId(null);
      setEditImage(null);
      setEditDoc(null);
      load();
    } catch { toast.error("Failed"); }
  };

  const startEdit = (c) => {
    setEditId(c._id);
    setEditForm({
      title: c.title,
      issuer: c.issuer,
      credentialId: c.credentialId || "",
      verifyUrl: c.verifyUrl || "",
      issueDate: c.issueDate ? c.issueDate.slice(0, 10) : "",
    });
    setEditImage(null);
    setEditDoc(null);
  };

  return (
    <AdminLayout title="Certificates">
      <div className="max-w-2xl">

        {/* ── Add Form ── */}
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
            placeholder="Verify URL (optional)"
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />

          <input type="date" value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })}
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-lg outline-none focus:border-green-400 text-sm" />

          <div className="flex gap-3 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-4 py-2 rounded-lg text-sm hover:border-green-400 transition">
                📷 Upload Image
              </span>
              <span className="text-xs text-[#4b5e7a]">{image ? image.name : "No image"}</span>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="hidden" />
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-4 py-2 rounded-lg text-sm hover:border-green-400 transition">
                📄 Upload PDF
              </span>
              <span className="text-xs text-[#4b5e7a]">{doc ? doc.name : "No PDF"}</span>
              <input type="file" accept=".pdf" onChange={e => setDoc(e.target.files[0])} className="hidden" />
            </label>
          </div>

          <button type="submit" className="bg-green-400 text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-green-300 transition">
            Add Certificate
          </button>
        </form>

        {/* ── List ── */}
        <div className="space-y-3">
          {certs.length === 0 && <p className="text-[#4b5e7a] text-sm">No certificates yet.</p>}
          {certs.map(c => (
            <div key={c._id} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-4">
              {editId === c._id ? (
                <div className="space-y-2">
                  <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Title"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.issuer} onChange={e => setEditForm({ ...editForm, issuer: e.target.value })}
                    placeholder="Issuer"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.credentialId} onChange={e => setEditForm({ ...editForm, credentialId: e.target.value })}
                    placeholder="Credential ID"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input value={editForm.verifyUrl} onChange={e => setEditForm({ ...editForm, verifyUrl: e.target.value })}
                    placeholder="Verify URL"
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />
                  <input type="date" value={editForm.issueDate} onChange={e => setEditForm({ ...editForm, issueDate: e.target.value })}
                    className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-2.5 rounded-lg outline-none text-sm" />

                  {/* Current image preview */}
                  {c.image && !editImage && (
                    <div className="flex items-center gap-2">
                      <img src={`${API}${c.image}`} className="w-12 h-12 rounded-lg object-cover border border-[#1e2d4a]" alt="" />
                      <span className="text-xs text-[#4b5e7a]">Current image</span>
                    </div>
                  )}

                  {/* Current PDF indicator */}
                  {c.document && !editDoc && (
                    <div className="flex items-center gap-2">
                      <a href={`${API}${c.document}`} target="_blank" rel="noreferrer"
                        className="text-xs text-green-400 hover:underline">📄 View current PDF</a>
                      <span className="text-xs text-[#4b5e7a]">(upload new to replace)</span>
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-3 py-1.5 rounded-lg text-xs hover:border-green-400 transition">
                        📷 {c.image ? "Change Image" : "Upload Image"}
                      </span>
                      <span className="text-xs text-[#4b5e7a]">{editImage ? editImage.name : ""}</span>
                      <input type="file" accept="image/*" onChange={e => setEditImage(e.target.files[0])} className="hidden" />
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-3 py-1.5 rounded-lg text-xs hover:border-green-400 transition">
                        📄 {c.document ? "Replace PDF" : "Upload PDF"}
                      </span>
                      <span className="text-xs text-[#4b5e7a]">{editDoc ? editDoc.name : ""}</span>
                      <input type="file" accept=".pdf" onChange={e => setEditDoc(e.target.files[0])} className="hidden" />
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(c._id)} className="bg-green-400 text-black px-4 py-1.5 rounded-lg text-sm font-medium">Save</button>
                    <button onClick={() => { setEditId(null); setEditImage(null); setEditDoc(null); }}
                      className="bg-[#1a2840] text-white px-4 py-1.5 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  {c.image && (
                    <img src={`${API}${c.image}`} className="w-14 h-14 rounded-lg object-cover border border-[#1e2d4a] shrink-0 mt-0.5" alt="" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{c.title}</p>
                    <p className="text-[#4b5e7a] text-xs mt-0.5">{c.issuer}</p>
                    {c.issueDate && (
                      <p className="text-[#4b5e7a] text-xs">
                        {new Date(c.issueDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </p>
                    )}
                    {c.credentialId && <p className="text-[#4b5e7a] text-xs">ID: {c.credentialId}</p>}

                    {/* Verify + View on same row, clean */}
                    {(c.verifyUrl || c.document) && (
                      <div className="flex items-center gap-3 mt-1.5">
                        {c.verifyUrl && (
                          <a href={c.verifyUrl} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-400 border border-green-400/30 bg-green-400/10 px-2.5 py-1 rounded-full hover:bg-green-400/20 transition">
                            🔗 Verify
                          </a>
                        )}
                        {c.document && (
                          <a href={`${API}${c.document}`} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-white border border-[#1e2d4a] bg-[#1a2840] px-2.5 py-1 rounded-full hover:border-green-400 transition">
                            📄 View PDF
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => startEdit(c)}
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
