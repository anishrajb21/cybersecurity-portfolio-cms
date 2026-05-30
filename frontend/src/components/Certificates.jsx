import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://cybersecurity-portfolio-cms.onrender.com";
const PAGE_SIZE = 3;

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    axios.get(`${API}/api/certificates`).then(res => setCerts(res.data));
  }, []);

  const displayed = certs.slice(0, visible);
  const remaining = certs.length - visible;
  const canMore = visible < certs.length;
  const canLess = visible > PAGE_SIZE;

  return (
    <section id="certificates" className="bg-[#050816] text-white px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green-400 mb-10 sm:mb-14 md:mb-20 text-center">
          Certificates
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certs.length === 0 && (
            <p className="text-gray-500 col-span-3">No certificates added yet.</p>
          )}

          {displayed.map((cert) => (
            <div
              key={cert._id}
              className="bg-[#0f172a] border border-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-green-400 hover:-translate-y-2 hover:shadow-[0_0_30px_#00ff88] transition duration-300 flex flex-col"
            >
              {cert.image
                ? <img src={`${API}${cert.image}`} className="w-full h-40 sm:h-48 object-cover" alt={cert.title} />
                : <div className="h-40 sm:h-48 bg-gradient-to-br from-green-400/20 to-cyan-500/10 flex items-center justify-center">
                    <h2 className="text-4xl sm:text-5xl font-black text-green-400">CERT</h2>
                  </div>
              }

              <div className="p-5 sm:p-8 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{cert.title}</h2>
                <p className="text-gray-400 text-sm sm:text-base mb-1">{cert.issuer}</p>

                {cert.issueDate && (
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">
                    {new Date(cert.issueDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </p>
                )}

                {cert.credentialId && (
                  <p className="text-gray-500 text-xs sm:text-sm mb-3">ID: {cert.credentialId}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noreferrer"
                      className="inline-block bg-green-400 text-black px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:scale-105 transition">
                      🔗 Verify
                    </a>
                  )}
                  {cert.document && (
                    <a href={`${API}${cert.document}`} target="_blank" rel="noreferrer"
                      className="inline-block border border-green-400 text-green-400 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-green-400 hover:text-black transition">
                      📄 View
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(canMore || canLess) && (
          <div className="flex justify-center gap-4 mt-10">
            {canLess && (
              <button onClick={() => setVisible(v => Math.max(v - PAGE_SIZE, PAGE_SIZE))}
                className="bg-[#0f172a] border border-gray-700 text-gray-400 px-6 py-2.5 rounded-xl text-sm font-semibold hover:border-red-400 hover:text-red-400 transition">
                − Show Less
              </button>
            )}
            {canMore && (
              <button onClick={() => setVisible(v => v + PAGE_SIZE)}
                className="bg-green-400 text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-300 transition">
                + {remaining} More
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Certificates;