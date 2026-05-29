import { useEffect, useState } from "react";
import axios from "axios";

function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile").then(res => setProfile(res.data));
  }, []);

  if (!profile) return (
    <section className="h-screen flex items-center justify-center bg-[#050816] text-white">Loading...</section>
  );

  const resumeHref = profile.resumeUrl
    ? profile.resumeUrl.startsWith("/uploads/")
      ? "http://localhost:5000" + profile.resumeUrl
      : profile.resumeUrl
    : null;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] text-white px-6 pt-24 pb-16">
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-green-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500 opacity-10 blur-[150px]" />
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">

        {/* PROFILE PICTURE */}
        <div className="w-40 h-40 rounded-full border-4 border-green-400 mx-auto mb-10 shadow-[0_0_30px_#00ff88] overflow-hidden bg-[#0f172a] flex items-center justify-center">
          {profile.image ? (
            <img
              src={"http://localhost:5000" + profile.image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl font-black text-green-400">
              {profile.name?.charAt(0) || "A"}
            </span>
          )}
        </div>

        {/* NAME */}
        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-white">{profile.name?.split(" ")[0]}</span>{" "}
          <span className="text-green-400">{profile.name?.split(" ").slice(1).join(" ")}</span>
        </h1>

        <div className="w-32 h-1 bg-green-400 mx-auto rounded-full mb-8" />

        {/* ABOUT */}
        <p className="max-w-3xl mx-auto text-gray-400 text-xl leading-9 mb-12">
          {profile.about}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#projects"
            className="bg-green-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition text-base">
            View Projects
          </a>
          {resumeHref && (
            <a href={resumeHref} target="_blank" rel="noreferrer" download
              className="border border-green-400 text-white px-8 py-4 rounded-2xl hover:bg-green-400 hover:text-black transition text-base">
              Download Resume
            </a>
          )}
        </div>

        {/* STATS */}
        {profile.stats && profile.stats.length > 0 && (
          <div className={`grid gap-6 ${
            profile.stats.length <= 2
              ? "grid-cols-2 max-w-md mx-auto"
              : profile.stats.length === 3
              ? "grid-cols-3 max-w-2xl mx-auto"
              : "grid-cols-2 md:grid-cols-4"
          }`}>
            {profile.stats.map((s, i) => (
              <div key={i} className="bg-[#0f172a] border border-gray-800 p-6 rounded-3xl">
                <h2 className="text-4xl font-black text-green-400 mb-2">{s.value}</h2>
                <p className="text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Hero;