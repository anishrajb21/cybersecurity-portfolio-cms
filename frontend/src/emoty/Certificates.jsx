import { useEffect, useState } from "react";
import axios from "axios";

function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    axios.get("https://cybersecurity-portfolio-cms.onrender.com/api/certificates").then(res => setCerts(res.data));
  }, []);

  return (
    <section id="certificates" className="bg-[#050816] text-white px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-green-400 mb-20 text-center">Certificates</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certs.length === 0 && <p className="text-gray-500">No certificates added yet.</p>}
          {certs.map((cert) => (
            <div key={cert._id} className="bg-[#0f172a] border border-gray-800 rounded-3xl overflow-hidden hover:border-green-400 hover:-translate-y-2 hover:shadow-[0_0_30px_#00ff88] transition duration-300">
              {cert.image
                ? <img src={"https://cybersecurity-portfolio-cms.onrender.com" + cert.image} className="w-full h-48 object-cover" alt="" />
                : <div className="h-48 bg-gradient-to-br from-green-400/20 to-cyan-500/10 flex items-center justify-center"><h2 className="text-5xl font-black text-green-400">CERT</h2></div>
              }
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">{cert.title}</h2>
                <p className="text-gray-400 mb-2">{cert.issuer}</p>
                {cert.credentialId && <p className="text-gray-500 text-sm mb-3">ID: {cert.credentialId}</p>}
                {cert.verifyUrl && (
                  <a href={cert.verifyUrl} target="_blank" rel="noreferrer"
                    className="inline-block bg-green-400 text-black px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 transition">
                    Verify Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;