import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://cybersecurity-portfolio-cms.onrender.com";
const PAGE_SIZE = 4;

function Badges() {
  const [badges, setBadges] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    axios.get(`${API}/api/badges`).then(res => setBadges(res.data));
  }, []);

  const displayed = badges.slice(0, visible);
  const remaining = badges.length - visible;
  const canMore = visible < badges.length;
  const canLess = visible > PAGE_SIZE;

  return (
    <section id="badges" className="bg-[#050816] text-white px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green-400 mb-10 sm:mb-14 md:mb-20 text-center">
          Badges
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {badges.length === 0 && (
            <p className="text-gray-500 col-span-4">No badges added yet.</p>
          )}

          {displayed.map((b) => (
            <div
              key={b._id}
              className="bg-[#0f172a] border border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:border-green-400 hover:shadow-[0_0_30px_#00ff88] transition flex flex-col items-center"
            >
              {b.image
                ? <img
                    src={`${API}${b.image}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mx-auto mb-3 sm:mb-4"
                    alt={b.title}
                  />
                : <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-green-400/20 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-green-400 text-2xl sm:text-3xl font-black">B</span>
                  </div>
              }

              <h3 className="text-white font-bold text-xs sm:text-sm leading-tight">{b.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{b.issuer}</p>

              {b.issueDate && (
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(b.issueDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </p>
              )}

              {b.credentialId && (
                <p className="text-gray-600 text-xs mt-1">ID: {b.credentialId}</p>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {b.verifyUrl && (
                  <a href={b.verifyUrl} target="_blank" rel="noreferrer"
                    className="text-green-400 text-xs hover:underline">
                    🔗 Verify
                  </a>
                )}
                {b.document && (
                  <a href={`${API}${b.document}`} target="_blank" rel="noreferrer"
                    className="bg-green-400 text-black px-2 py-1 rounded-lg text-xs font-bold hover:bg-green-300 transition">
                    📄 View
                  </a>
                )}
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

export default Badges;