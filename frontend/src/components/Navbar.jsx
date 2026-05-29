import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [siteTitle, setSiteTitle] = useState("AR");

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile").then(res => {
      if (res.data?.siteTitle) setSiteTitle(res.data.siteTitle);
    });
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-xl border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        <h1 className="text-3xl font-black text-green-400 tracking-widest">{siteTitle}</h1>
        <div className="flex gap-8 text-base text-gray-300 font-medium">
          <a href="#home" className="hover:text-green-400 transition">Home</a>
          <a href="#about" className="hover:text-green-400 transition">About</a>
          <a href="#skills" className="hover:text-green-400 transition">Skills</a>
          <a href="#certificates" className="hover:text-green-400 transition">Certificates</a>
          <a href="#badges" className="hover:text-green-400 transition">Badges</a>
          <a href="#projects" className="hover:text-green-400 transition">Projects</a>
          <a href="#contact" className="hover:text-green-400 transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;