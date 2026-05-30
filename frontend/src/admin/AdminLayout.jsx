import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const API ="https://cybersecurity-portfolio-cms.onrender.com";

function AdminLayout({ title, children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/profile`)
      .then(res => setProfile(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex bg-[#060d1f] min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-16 border-b border-[#1e2d4a] flex items-center justify-between px-8 shrink-0">
          <h1 className="text-base font-semibold text-white">{title}</h1>
          <div className="w-10 h-10 rounded-full border-2 border-green-400 overflow-hidden bg-[#0f172a] flex items-center justify-center shrink-0">
            {profile?.image
              ? <img src={`${API}${profile.image}`} alt="profile" className="w-full h-full object-cover" />
              : <span className="text-green-400 font-black text-base">{profile?.name?.charAt(0) || "A"}</span>
            }
          </div>
        </div>
        <div className="p-8 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
