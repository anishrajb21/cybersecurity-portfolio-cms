import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EyeIcon = ({ show, toggle }) => (
  <button type="button" onClick={toggle}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
    {show ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )}
  </button>
);

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email.trim()) return setError("Enter your email");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMsg("OTP sent to your email. Check inbox.");
      setError("");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!otp.trim()) return setError("Enter OTP");
    if (!newPassword.trim()) return setError("Enter new password");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", { email, otp, newPassword });
      setMsg("Password reset successfully! Redirecting...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060d1f] flex items-center justify-center text-white px-4">
      <div className="bg-[#0f172a] border border-gray-800 p-10 rounded-3xl w-full max-w-md">

        <h1 className="text-3xl font-black text-green-400 mb-2 text-center">Reset Password</h1>
        <p className="text-gray-500 text-sm text-center mb-8">
          {step === 1 ? "Enter your admin email to receive OTP" : `OTP sent to ${email}`}
        </p>

        {msg && <p className="text-green-400 text-sm mb-4 text-center">{msg}</p>}
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendOtp()}
              className="w-full bg-[#1e293b] p-4 rounded-xl outline-none mb-4 text-sm"
            />
            <button onClick={sendOtp} disabled={loading}
              className="w-full bg-green-400 text-black py-3 rounded-xl font-bold hover:bg-green-300 transition disabled:opacity-50">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* OTP boxes */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-2 block">Enter 6-digit OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-center text-2xl font-black tracking-[12px] text-green-400"
              />
            </div>

            <div className="relative mb-4">
              <label className="text-xs text-gray-500 mb-2 block">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && resetPassword()}
                className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-sm pr-12"
              />
              <EyeIcon show={showPassword} toggle={() => setShowPassword(!showPassword)} />
            </div>

            <button onClick={resetPassword} disabled={loading}
              className="w-full bg-green-400 text-black py-3 rounded-xl font-bold hover:bg-green-300 transition disabled:opacity-50 mb-3">
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button onClick={() => { setStep(1); setOtp(""); setMsg(""); setError(""); }}
              className="w-full border border-gray-700 text-gray-400 py-3 rounded-xl text-sm hover:border-gray-500 transition">
              Resend OTP
            </button>
          </>
        )}

        <p className="text-center mt-6 text-sm text-gray-500">
          <a href="/login" className="text-green-400 hover:underline">Back to Login</a>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;