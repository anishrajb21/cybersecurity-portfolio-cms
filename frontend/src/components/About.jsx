import { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://cybersecurity-portfolio-cms.onrender.com/api/profile")
      .then((res) => setProfile(res.data));
  }, []);

  return (
    <section
      id="about"
      className="bg-[#050816] py-24 px-6 md:px-12"
    >
      <h1 className="text-center text-4xl md:text-5xl font-black text-green-400 mb-12">
        About Me
      </h1>

      <div className="max-w-7xl mx-auto bg-[#0f172a] border border-gray-700 rounded-2xl p-8 md:p-12 shadow-lg">

        <div className="text-gray-300 text-base md:text-lg leading-9 whitespace-pre-line">
          {profile?.about || "No About Information"}
        </div>

      </div>
    </section>
  );
}

export default About;