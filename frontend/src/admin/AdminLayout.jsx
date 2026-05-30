import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function AdminLayout({ title, children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://cybersecurity-portfolio-cms.onrender.com/api/profile")
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: "#060d1f",
        height: "100vh",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Sidebar stays locked — never scrolls */}
      <Sidebar />

      {/* Right side scrolls independently */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            height: "64px",
            borderBottom: "1px solid #1e2d4a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            background: "#060d1f",
            position: "sticky",
            top: 0,
            zIndex: 40,
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "white",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h1>

          {/* Profile avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #22c55e",
              overflow: "hidden",
              background: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {profile?.image ? (
              <img
                src={
                  "https://cybersecurity-portfolio-cms.onrender.com" +
                  profile.image
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  color: "#22c55e",
                  fontWeight: 800,
                  fontSize: "14px",
                }}
              >
                {profile?.name?.charAt(0) || "A"}
              </span>
            )}
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: "20px", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
