import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [siteTitle, setSiteTitle] = useState("AR");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://cybersecurity-portfolio-cms.onrender.com/api/profile")
      .then((res) => {
        if (res.data?.siteTitle) {
          setSiteTitle(res.data.siteTitle);
        }
      });
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Certificates", href: "#certificates" },
    { name: "Badges", href: "#badges" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-xl border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 tracking-wider">
          {siteTitle}
        </h1>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base text-gray-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-green-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile / Tablet Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 border-t border-gray-800">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-gray-300 hover:text-green-400 hover:bg-gray-900 transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;