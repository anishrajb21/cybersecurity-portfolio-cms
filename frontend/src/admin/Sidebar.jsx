import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "const API = "https://cybersecurity-portfolio-cms.onrender.com";";

const NAV = [
  { path: "/admin", label: "Dashboard", icon: "📊", end: true },
  { path: "/admin/profile", label: "Profile", icon: "👤" },
  { path: "/admin/projects", label: "Projects", icon: "📁" },
  { path: "/admin/skills", label: "Skills", icon: "🛠" },
  { path: "/admin/certificates", label: "Certificates", icon: "🏆" },
  { path: "/admin/badges", label: "Badges", icon: "🎖" },
  { path: "/admin/settings", label: "Settings", icon: "⚙️" },
];

function Sidebar() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/api/profile`)
      .then(res => setProfile(res.data))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-56 shrink-0 bg-[#080f20] border-r border-[#1e2d4a] min-h-screen flex flex-col">

      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-5 border-b border-[#1e2d4a]">
        <span className="text-green-400 font-black text-lg tracking-wider">
          {profile?.siteTitle || "AR"}
        </span>
        <span className="ml-2 text-[#4b5e7a] text-xs font-medium">Admin</span>
      </div>

      {/* Profile strip */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#1e2d4a]">
        <div className="w-9 h-9 rounded-full border border-green-400/50 overflow-hidden bg-[#0f172a] flex items-center justify-center shrink-0">
          {profile?.image
            ? <img src={`${API}${profile.image}`} alt="" className="w-full h-full object-cover" />
            : <span className="text-green-400 font-bold text-sm">{profile?.name?.charAt(0) || "A"}</span>
          }
        </div>
        {/* FIX: truncate + whitespace-nowrap keeps name on one line */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold truncate whitespace-nowrap leading-tight">
            {profile?.name || "Admin"}
          </p>
          <p className="text-[#4b5e7a] text-xs truncate whitespace-nowrap leading-tight">
            {profile?.title || "Portfolio Admin"}
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-green-400/10 text-green-400 border border-green-400/20"
                  : "text-[#7a8fa8] hover:text-white hover:bg-[#0d1526]"
              }`
            }
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#7a8fa8] hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <span className="text-base leading-none">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
