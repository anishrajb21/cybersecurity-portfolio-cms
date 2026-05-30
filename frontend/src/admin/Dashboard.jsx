import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { FolderKanban, Wrench, Award, ShieldCheck, User, TrendingUp } from "lucide-react";

const BASE = "https://cybersecurity-portfolio-cms.onrender.com";

const StatCard = ({ icon: Icon, label, count, color }) => (
  <div
    style={{
      background: "#0a1628",
      border: "1px solid #1e2d4a",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: color + "22",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={18} color={color} />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "white" }}>
        {count ?? <span style={{ fontSize: "14px", color: "#334155" }}>—</span>}
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [counts, setCounts] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE}/api/profile`),
      axios.get(`${BASE}/api/projects`),
      axios.get(`${BASE}/api/skills`),
      axios.get(`${BASE}/api/certificates`),
      axios.get(`${BASE}/api/badges`),
    ])
      .then(([profileRes, projectsRes, skillsRes, certsRes, badgesRes]) => {
        setProfile(profileRes.data);
        setProjects(
          Array.isArray(projectsRes.data)
            ? projectsRes.data.slice(0, 4)
            : []
        );
        setCounts({
          projects: Array.isArray(projectsRes.data) ? projectsRes.data.length : 0,
          skills: Array.isArray(skillsRes.data) ? skillsRes.data.length : 0,
          certificates: Array.isArray(certsRes.data) ? certsRes.data.length : 0,
          badges: Array.isArray(badgesRes.data) ? badgesRes.data.length : 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div style={{ color: "#475569", fontSize: "14px" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Profile Banner */}
          {profile && (
            <div
              style={{
                background: "#0a1628",
                border: "1px solid #1e2d4a",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "2px solid #22c55e",
                  overflow: "hidden",
                  background: "#0f172a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {profile.image ? (
                  <img
                    src={BASE + profile.image}
                    alt={profile.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <User size={22} color="#22c55e" />
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "white",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {profile.name}
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#22c55e" }}>
                  {profile.title || "Cybersecurity Professional"}
                </p>
                {profile.location && (
                  <p style={{ margin: 0, fontSize: "11px", color: "#475569" }}>
                    {profile.location}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            <StatCard icon={FolderKanban} label="Projects" count={counts.projects} color="#3b82f6" />
            <StatCard icon={Wrench} label="Skills" count={counts.skills} color="#a855f7" />
            <StatCard icon={Award} label="Certificates" count={counts.certificates} color="#f59e0b" />
            <StatCard icon={ShieldCheck} label="Badges" count={counts.badges} color="#22c55e" />
          </div>

          {/* Recent Projects */}
          {projects.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                <TrendingUp size={14} color="#22c55e" />
                <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Recent Projects
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {projects.map((p, i) => (
                  <div
                    key={p._id || i}
                    style={{
                      background: "#0a1628",
                      border: "1px solid #1e2d4a",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.title}
                      </p>
                      {p.techStack && (
                        <p style={{ margin: 0, fontSize: "11px", color: "#475569" }}>
                          {Array.isArray(p.techStack)
                            ? p.techStack.slice(0, 3).join(", ")
                            : p.techStack}
                        </p>
                      )}
                    </div>
                    {p.featured && (
                      <span
                        style={{
                          background: "rgba(34,197,94,0.12)",
                          color: "#22c55e",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: "20px",
                          flexShrink: 0,
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
