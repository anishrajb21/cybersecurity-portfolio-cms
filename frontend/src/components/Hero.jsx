import { useEffect, useState } from "react";
import axios from "axios";

function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://cybersecurity-portfolio-cms.onrender.com/api/profile")
      .then((res) => setProfile(res.data));
  }, []);

  if (!profile)
    return (
      <section className="h-screen flex items-center justify-center bg-[#050816] text-white">
        Loading...
      </section>
    );

  const resumeHref = profile.resumeUrl
    ? profile.resumeUrl.startsWith("/uploads/")
      ? "https://cybersecurity-portfolio-cms.onrender.com" + profile.resumeUrl
      : profile.resumeUrl
    : null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] text-white px-6"
    >
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-green-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500 opacity-10 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* PROFILE IMAGE */}
        <div className="w-44 h-44 rounded-full border-4 border-green-400 mx-auto shadow-[0_0_40px_#00ff88] overflow-hidden">
          {profile.image ? (
            <img
              src={
                "https://cybersecurity-portfolio-cms.onrender.com" +
                profile.image
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl font-black bg-[#0f172a]">
              {profile.name?.charAt(0)}
            </div>
          )}
        </div>

        {/* NAME */}
        <h1 className="text-6xl md:text-8xl font-black mt-8">
          <span className="text-white">
            {profile.name?.split(" ")[0]}
          </span>{" "}
          <span className="text-green-400">
            {profile.name?.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* TITLE */}
        <h2 className="text-green-400 text-3xl md:text-4xl font-bold mt-6">
          {profile.title || "Cybersecurity Student"}
        </h2>

        {/* SHORT TAGLINE */}
        <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl mt-6 leading-8">
          {profile.tagline ||
            "Focused on SOC Operations, Networking, Linux, SIEM Monitoring, Threat Detection and Security Analysis."}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">
          <a
            href="#projects"
            className="bg-green-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            View Projects
          </a>

          {resumeHref && (
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              download
              className="border border-green-400 px-8 py-4 rounded-xl hover:bg-green-400 hover:text-black transition"
            >
              Download Resume
            </a>
          )}
        </div>

        {/* STATS */}
        {profile.stats?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {profile.stats.map((s, i) => (
              <div
                key={i}
                className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8"
              >
                <h3 className="text-5xl font-black text-green-400">
                  {s.value}
                </h3>
                <p className="text-gray-400 mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;