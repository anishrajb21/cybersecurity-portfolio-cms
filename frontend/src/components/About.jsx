import { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("https://cybersecurity-portfolio-cms.onrender.com/api/profile").then(res => setProfile(res.data));
  }, []);

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-20 border-t border-gray-800 bg-[#050816] text-white">
      <h1 className="text-5xl font-bold text-green-500 mb-8 text-center">About Me</h1>
      <p className="text-xl text-gray-300 leading-10 max-w-4xl mx-auto">
        {profile?.about || "Add your about info from the admin panel."}
      </p>
    </section>
  );
}

export default About;