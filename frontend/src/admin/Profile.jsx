import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

const CONTACT_TYPES = [
  { label: "Email", icon: "📧", key: "email" },
  { label: "GitHub", icon: "🐙", key: "github" },
  { label: "LinkedIn", icon: "💼", key: "linkedin" },
  { label: "Twitter", icon: "🐦", key: "twitter" },
  { label: "Credly", icon: "🏅", key: "credly" },
  { label: "Cisco", icon: "🔧", key: "cisco" },
  { label: "Phone", icon: "📱", key: "phone" },
  { label: "Website", icon: "🌐", key: "website" },
];

const STAT_PRESETS = [
  "Certifications", "Projects", "Skills", "Badges",
  "Hackathons", "TEDx Talks", "CTF Wins", "Years Experience", "Custom"
];

function Profile() {
  const [form, setForm] = useState({ name: "", about: "", resumeUrl: "", siteTitle: "" });
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ type: "email", value: "" });
  const [customType, setCustomType] = useState("");
  const [stats, setStats] = useState([]);
  const [newStat, setNewStat] = useState({ label: "Certifications", value: "", custom: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existing, setExisting] = useState(null);
  const [resume, setResume] = useState(null);
  const [existingResume, setExistingResume] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile").then(res => {
      if (res.data) {
        setForm({
          name: res.data.name || "",
          about: res.data.about || "",
          resumeUrl: res.data.resumeUrl?.startsWith("/uploads/") ? "" : res.data.resumeUrl || "",
          siteTitle: res.data.siteTitle || "",
        });
        setContacts(res.data.contacts || []);
        setStats(res.data.stats || []);
        if (res.data.image) setExisting("http://localhost:5000" + res.data.image);
        if (res.data.resumeUrl?.startsWith("/uploads/")) setExistingResume(res.data.resumeUrl);
      }
    });
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => { setImage(null); setPreview(null); setExisting(null); };

  const addContact = () => {
    if (!newContact.value.trim()) return;
    const type = newContact.type === "custom" ? customType : newContact.type;
    if (!type.trim()) return;
    setContacts([...contacts, { type, value: newContact.value }]);
    setNewContact({ type: "email", value: "" });
    setCustomType("");
  };

  const removeContact = (i) => setContacts(contacts.filter((_, idx) => idx !== i));

  const addStat = () => {
    if (!newStat.value.trim()) return;
    const label = newStat.label === "Custom" ? newStat.custom : newStat.label;
    if (!label.trim()) return;
    setStats([...stats, { label, value: newStat.value }]);
    setNewStat({ label: "Certifications", value: "", custom: "" });
  };

  const removeStat = (i) => setStats(stats.filter((_, idx) => idx !== i));

  const updateStat = (i, field, val) => {
    const updated = [...stats];
    updated[i][field] = val;
    setStats(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("about", form.about);
      data.append("siteTitle", form.siteTitle);
      data.append("resumeUrl", form.resumeUrl);
      data.append("contacts", JSON.stringify(contacts));
      data.append("stats", JSON.stringify(stats));
      if (image) data.append("image", image);
      if (!image && !existing) data.append("removeImage", "true");
      if (resume) data.append("resume", resume);
      await axios.post("http://localhost:5000/api/profile", data);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Profile">
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">

        {/* Profile Picture */}
        <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5">
          <label className="text-xs text-[#4b5e7a] mb-3 block font-semibold uppercase tracking-widest">Profile Picture</label>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#1a2840] border-2 border-[#1e2d4a] overflow-hidden flex items-center justify-center">
                {preview || existing
                  ? <img src={preview || existing} className="w-full h-full object-cover" alt="profile" />
                  : <span className="text-3xl">👤</span>}
              </div>
              {(preview || existing) && (
                <button type="button" onClick={removeImage} className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600">✕</button>
              )}
            </div>
            <div>
              <label className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-4 py-2 rounded-lg cursor-pointer text-sm hover:border-green-400 transition block mb-1">
                📁 Upload Photo
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              <p className="text-xs text-[#4b5e7a]">{image ? image.name : "JPG, PNG up to 5MB"}</p>
            </div>
          </div>
        </div>

        {/* Site Title */}
        <div>
          <label className="text-xs text-[#4b5e7a] mb-1 block">Site Logo Text (shown top-left of website)</label>
          <input type="text" value={form.siteTitle} onChange={e => setForm({ ...form, siteTitle: e.target.value })}
            placeholder="AR"
            className="w-full bg-[#0d1526] border border-[#1e2d4a] text-white p-3 rounded-xl outline-none focus:border-green-400 text-sm" />
        </div>

        {/* Name */}
        <div>
          <label className="text-xs text-[#4b5e7a] mb-1 block">Full Name</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Anish Raj"
            className="w-full bg-[#0d1526] border border-[#1e2d4a] text-white p-3 rounded-xl outline-none focus:border-green-400 text-sm" />
        </div>

        {/* About */}
        <div>
          <label className="text-xs text-[#4b5e7a] mb-1 block">About Me</label>
          <textarea value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} rows={4}
            placeholder="Write something about yourself..."
            className="w-full bg-[#0d1526] border border-[#1e2d4a] text-white p-3 rounded-xl outline-none focus:border-green-400 text-sm" />
        </div>

        {/* Resume */}
        <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5">
          <label className="text-xs text-[#4b5e7a] mb-3 block font-semibold uppercase tracking-widest">Resume</label>
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <span className="bg-[#1a2840] border border-[#1e2d4a] text-[#c8d8ea] px-4 py-2 rounded-lg text-sm hover:border-green-400 transition">
              📄 Upload PDF
            </span>
            <span className="text-xs text-[#4b5e7a]">
              {resume ? resume.name : existingResume ? "✅ PDF uploaded" : "No file chosen"}
            </span>
            <input type="file" accept=".pdf" onChange={e => setResume(e.target.files[0])} className="hidden" />
          </label>
          <label className="text-xs text-[#4b5e7a] mb-1 block">Or external URL</label>
          <input type="text" value={form.resumeUrl} onChange={e => setForm({ ...form, resumeUrl: e.target.value })}
            placeholder="https://drive.google.com/..."
            className="w-full bg-[#1a2840] border border-[#1e2d4a] text-white p-3 rounded-xl outline-none focus:border-green-400 text-sm" />
        </div>

        {/* Dynamic Stats */}
        <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5">
          <label className="text-xs text-[#4b5e7a] mb-3 block font-semibold uppercase tracking-widest">Hero Stats (editable)</label>

          <div className="space-y-2 mb-4">
            {stats.length === 0 && <p className="text-xs text-[#4b5e7a]">No stats yet. Add below.</p>}
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={s.value} onChange={e => updateStat(i, "value", e.target.value)}
                  className="w-20 bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400" />
                <input value={s.label} onChange={e => updateStat(i, "label", e.target.value)}
                  className="flex-1 bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400" />
                <button type="button" onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300 text-xs px-2">✕</button>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#4b5e7a] mb-2">Add stat</p>
          <div className="flex gap-2 flex-wrap">
            <select value={newStat.label} onChange={e => setNewStat({ ...newStat, label: e.target.value })}
              className="bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400">
              {STAT_PRESETS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {newStat.label === "Custom" && (
              <input value={newStat.custom} onChange={e => setNewStat({ ...newStat, custom: e.target.value })}
                placeholder="Label name"
                className="bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400 w-28" />
            )}
            <input value={newStat.value} onChange={e => setNewStat({ ...newStat, value: e.target.value })}
              placeholder="e.g. 10+"
              className="w-24 bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400" />
            <button type="button" onClick={addStat} className="bg-green-400 text-black px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-300">Add</button>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <label className="text-xs text-[#4b5e7a] mb-2 block font-semibold uppercase tracking-widest">Contact Links</label>
          <div className="space-y-2 mb-3">
            {contacts.length === 0 && <p className="text-xs text-[#4b5e7a]">No contacts yet.</p>}
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#0d1526] border border-[#1e2d4a] p-2.5 rounded-lg">
                <span className="text-xs text-green-400 w-20 shrink-0 capitalize">{c.type}</span>
                <span className="text-xs text-[#c8d8ea] flex-1 truncate">{c.value}</span>
                <button type="button" onClick={() => removeContact(i)} className="text-red-400 hover:text-red-300 text-xs px-2">✕</button>
              </div>
            ))}
          </div>
          <div className="bg-[#0d1526] border border-[#1e2d4a] p-3 rounded-xl space-y-2">
            <p className="text-xs text-[#4b5e7a]">Add contact</p>
            <div className="flex gap-2 flex-wrap">
              <select value={newContact.type} onChange={e => setNewContact({ ...newContact, type: e.target.value })}
                className="bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400">
                {CONTACT_TYPES.map(t => <option key={t.key} value={t.key}>{t.icon} {t.label}</option>)}
                <option value="custom">✏️ Custom</option>
              </select>
              {newContact.type === "custom" && (
                <input value={customType} onChange={e => setCustomType(e.target.value)} placeholder="Type name"
                  className="bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400 w-24" />
              )}
              <input value={newContact.value} onChange={e => setNewContact({ ...newContact, value: e.target.value })}
                placeholder="URL or value"
                className="flex-1 bg-[#1a2840] border border-[#1e2d4a] text-white p-2 rounded-lg text-xs outline-none focus:border-green-400" />
              <button type="button" onClick={addContact} className="bg-green-400 text-black px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-300">Add</button>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-green-400 text-black py-3 rounded-xl font-semibold hover:bg-green-300 transition disabled:opacity-50 text-sm">
          {loading ? "Saving..." : "Save Profile"}
        </button>

      </form>
    </AdminLayout>
  );
}

export default Profile;