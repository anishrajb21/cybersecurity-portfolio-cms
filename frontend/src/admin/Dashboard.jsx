import AdminLayout from "../components/AdminLayout";

function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Certificates", value: "10+", icon: "🏆" },
          { label: "Projects", value: "5+", icon: "📁" },
          { label: "Skills", value: "24", icon: "🛠" },
          { label: "Badges", value: "8", icon: "🎖" },
        ].map(s => (
          <div key={s.label} className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-medium text-green-400">{s.value}</div>
            <div className="text-xs text-[#4b5e7a] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#4b5e7a]">Use the sidebar to manage your portfolio content.</p>
    </AdminLayout>
  );
}

export default Dashboard;