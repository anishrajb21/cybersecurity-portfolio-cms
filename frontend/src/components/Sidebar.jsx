import { Link, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Profile", to: "/admin/profile", section: "MAIN" },
  { label: "Settings", to: "/admin/settings", section: "MAIN" },
  { label: "Projects", to: "/admin/projects", section: "CONTENT" },
  { label: "Skills", to: "/admin/skills", section: "CONTENT" },
  { label: "Certificates", to: "/admin/certificates", section: "CONTENT" },
  { label: "Badges", to: "/admin/badges", section: "CONTENT" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[220px] min-h-screen bg-[#0a0f1e] border-r border-[#1e2d4a] flex flex-col justify-between py-6 px-4">
      <div>
        <div className="mb-8 px-2">
          <h1 className="text-lg font-bold text-white">Admin Panel</h1>
          <p className="text-xs text-[#4b5e7a] mt-1">Portfolio CMS</p>
        </div>

        <div className="mb-4">
          <p className="text-[10px] text-[#4b5e7a] font-semibold tracking-widest px-2 mb-2">MAIN</p>
          {navItems.filter(n => n.section === "MAIN").map(n => (
            <Link key={n.to} to={n.to}
              className={`flex items-center px-3 py-2.5 rounded-lg mb-1 text-sm transition
                ${location.pathname === n.to ? "bg-green-400/10 text-green-400 font-medium" : "text-[#8a9bb5] hover:bg-[#1a2840] hover:text-white"}`}>
              {n.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="text-[10px] text-[#4b5e7a] font-semibold tracking-widest px-2 mb-2">CONTENT</p>
          {navItems.filter(n => n.section === "CONTENT").map(n => (
            <Link key={n.to} to={n.to}
              className={`flex items-center px-3 py-2.5 rounded-lg mb-1 text-sm transition
                ${location.pathname === n.to ? "bg-green-400/10 text-green-400 font-medium" : "text-[#8a9bb5] hover:bg-[#1a2840] hover:text-white"}`}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>

      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition text-sm w-full">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;