import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Award,
  FolderKanban,
  Wrench,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/badges", label: "Badges", icon: ShieldCheck },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/skills", label: "Skills", icon: Wrench },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const width = expanded ? "160px" : "52px";

  return (
    <aside
      style={{
        width,
        minWidth: width,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        background: "#060d1f",
        borderRight: "1px solid #1e2d4a",
        zIndex: 50,
        transition: "width 0.2s ease, min-width 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* Logo / Toggle button */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "space-between" : "center",
          padding: expanded ? "0 12px" : "0",
          borderBottom: "1px solid #1e2d4a",
          flexShrink: 0,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "6px",
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "800",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          A
        </div>
        {expanded && (
          <ChevronRight
            size={14}
            color="#64748b"
            style={{ transform: "rotate(180deg)", transition: "transform 0.2s" }}
          />
        )}
      </div>

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          paddingTop: "6px",
          paddingBottom: "6px",
        }}
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={!expanded ? label : undefined}
            style={({ isActive }) => ({
              height: "36px",
              borderRadius: "8px",
              margin: "1px 6px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 8px",
              color: isActive ? "#22c55e" : "#64748b",
              background: isActive ? "rgba(34,197,94,0.12)" : "transparent",
              textDecoration: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
            })}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            {expanded && (
              <span style={{ fontSize: "13px", fontWeight: 500 }}>{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div
        style={{
          flexShrink: 0,
          height: "48px",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #1e2d4a",
          padding: "0 6px",
        }}
      >
        <button
          onClick={handleLogout}
          title={!expanded ? "Logout" : undefined}
          style={{
            height: "36px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 8px",
            color: "#f87171",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {expanded && (
            <span style={{ fontSize: "13px", fontWeight: 500 }}>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}