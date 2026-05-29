import { useEffect, useState } from "react";
import axios from "axios";

function Badges() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/badges").then(res => setBadges(res.data));
  }, []);

  return (
    <section id="badges" className="bg-[#050816] text-white px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-green-400 mb-20 text-center">Badges</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.length === 0 && <p className="text-gray-500 col-span-4">No badges added yet.</p>}
          {badges.map((b) => (
            <div key={b._id} className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 text-center hover:border-green-400 hover:shadow-[0_0_30px_#00ff88] transition">
              {b.image
                ? <img src={"http://localhost:5000" + b.image} className="w-24 h-24 object-contain mx-auto mb-4" alt="" />
                : <div className="w-24 h-24 rounded-full bg-green-400/20 mx-auto mb-4 flex items-center justify-center"><span className="text-green-400 text-3xl font-black">B</span></div>
              }
              <h3 className="text-white font-bold text-sm">{b.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{b.issuer}</p>
              {b.credentialId && <p className="text-gray-600 text-xs mt-1">ID: {b.credentialId}</p>}
              {b.verifyUrl && (
                <a href={b.verifyUrl} target="_blank" rel="noreferrer"
                  className="text-green-400 text-xs mt-2 inline-block hover:underline">
                  🔗 Verify
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Badges;