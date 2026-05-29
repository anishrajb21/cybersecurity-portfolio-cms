import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://cybersecurity-portfolio-cms.onrender.com/api/auth/change-password",
        { currentPassword: form.currentPassword, newPassword: form.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-md bg-[#0f172a] border border-gray-800 p-8 rounded-3xl">
        <h2 className="text-xl font-bold text-green-400 mb-6">🔒 Change Password</h2>

        <form onSubmit={handleChange} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                className="w-full bg-[#1e293b] p-4 rounded-xl outline-none pr-12"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showCurrent ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="w-full bg-[#1e293b] p-4 rounded-xl outline-none pr-12"
              />
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showNew ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full bg-[#1e293b] p-4 rounded-xl outline-none"
            />
          </div>

          <button type="submit"
            className="w-full bg-green-400 text-black py-4 rounded-2xl font-bold hover:scale-105 transition">
            Update Password
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default Settings;