import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const iconMap = { github: FaGithub, linkedin: FaLinkedin, email: FaEnvelope, website: FaGlobe };

function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile").then(res => setContacts(res.data.contacts || []));
  }, []);

  return (
    <section id="contact" className="bg-[#050816] text-white px-8 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-black text-green-400 mb-16">Contact</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {contacts.length === 0 && <p className="text-gray-500 col-span-3">No contacts added yet. Add from admin panel.</p>}
          {contacts.map((c, i) => {
            const Icon = iconMap[c.type?.toLowerCase()] || FaGlobe;
            const href = c.type?.toLowerCase() === "email" ? `mailto:${c.value}` : c.value;
            return (
              <a key={i} href={href} target="_blank" className="bg-[#0f172a] border border-gray-800 rounded-3xl p-10 hover:border-green-400 hover:shadow-[0_0_30px_#00ff88] transition block">
                <Icon size={40} className="text-green-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4 capitalize">{c.type}</h2>
                <p className="text-gray-400 break-all">{c.value}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contact;