import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://cybersecurity-portfolio-cms.onrender.com";

function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/profile`).then(res => setProfile(res.data));
  }, []);

  if (!profile)
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        Loading...
      </section>
    );

  const resumeHref = profile.resumeUrl
    ? profile.resumeUrl.startsWith("/uploads/")
      ? API + profile.resumeUrl
      : profile.resumeUrl
    : null;

  const firstName = profile.name?.split(" ")[0] || "";
  const restName = profile.name?.split(" ").slice(1).join(" ") || "";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] text-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="absolute top-[-200px] left-[-200px] w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-green-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-cyan-500 opacity-10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">

        {/* Profile Image */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full border-4 border-green-400 mx-auto shadow-[0_0_40px_#00ff88] overflow-hidden">
          {profile.image ? (
            <img src={API + profile.image} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0f172a] text-4xl font-black">
              {profile.name?.charAt(0)}
            </div>
          )}
        </div>

        {/* Name — single line, two colors, wrapping disabled */}
        <h1 className="font-black mt-6 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
          <span className="text-white">{firstName}</span>
          {restName && <span className="text-green-400"> {restName}</span>}
        </h1>

        {/* Title */}
        <h2 className="text-green-400 font-bold mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {profile.title || "Cybersecurity Student"}
        </h2>

        {/* Tagline */}
        <p className="max-w-4xl mx-auto text-gray-300 mt-6 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-2">
          {profile.tagline || "Focused on SOC Operations, Networking, Linux, SIEM Monitoring, Threat Detection and Security Analysis."}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <a href="#projects"
            className="bg-green-400 text-black px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:scale-105 transition">
            View Projects
          </a>
          {resumeHref && (
            <a href={resumeHref} target="_blank" rel="noreferrer" download
              className="border border-green-400 px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-green-400 hover:text-black transition">
              Download Resume
            </a>
          )}
        </div>

        {/* Stats */}
        {profile.stats?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 lg:mt-20">
            {profile.stats.map((s, i) => (
              <div key={i} className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 lg:p-8">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-400">{s.value}</h3>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;