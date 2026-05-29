import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://cybersecurity-portfolio-cms.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/admin/profile");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#060d1f] flex items-center justify-center text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="bg-[#0f172a] border border-gray-800 p-10 rounded-3xl w-full max-w-md"
      >
        <h1 className="text-3xl font-black text-green-400 mb-8 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#1e293b] p-4 rounded-xl outline-none mb-4 text-sm"
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-sm pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <p className="text-right mb-6">
          <a
            href="/forgot-password"
            className="text-green-400 text-sm hover:underline"
          >
            Forgot password?
          </a>
        </p>

        <button
          type="submit"
          className="w-full bg-green-400 text-black py-3 rounded-xl font-bold hover:bg-green-300 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;