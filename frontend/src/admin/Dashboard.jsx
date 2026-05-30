import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const API = "https://cybersecurity-portfolio-cms.onrender.com";

function Dashboard() {
  const [counts, setCounts] = useState({ certificates: 0, projects: 0, skills: 0, badges: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [certsRes, projectsRes, skillsRes, badgesRes] = await Promise.all([
          axios.get(`${API}/api/certificates`),
          axios.get(`${API}/api/projects`),
          axios.get(`${API}/api/skills`),
          axios.get(`${API}/api/badges`),
        ]);

        // Skills: count total individual skills across all sections
        const totalSkills = skillsRes.data.reduce(
          (sum, section) => sum + (section.skills?.length || 0), 0
        );

        setCounts({
          certificates: certsRes.data.length,
          projects: projectsRes.data.length,
          skills: totalSkills,
          badges: badgesRes.data.length,
        });
      } catch {
        // fail silently, counts stay 0
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { label: "Certificates", value: counts.certificates, icon: "🏆", color: "text-yellow-400" },
    { label: "Projects", value: counts.projects, icon: "📁", color: "text-blue-400" },
    { label: "Skills", value: counts.skills, icon: "🛠", color: "text-purple-400" },
    { label: "Badges", value: counts.badges, icon: "🎖", color: "text-green-400" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-2xl font-semibold ${s.color}`}>
              {loading ? (
                <span className="inline-block w-8 h-6 bg-[#1a2840] rounded animate-pulse" />
              ) : s.value}
            </div>
            <div className="text-xs text-[#4b5e7a] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#4b5e7a]">Use the sidebar to manage your portfolio content.</p>
    </AdminLayout>
  );
}

export default Dashboard;