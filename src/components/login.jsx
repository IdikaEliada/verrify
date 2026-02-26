import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const DOMAIN = "verrify.app";

export default function LoginForm() {
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = matric.trim();
    if (!trimmed) { setError("Please enter your matric number."); return; }
    setLoading(true);
    try {
      const email = `${trimmed.toLowerCase()}@${DOMAIN}`;
      await login(email, password);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-[#8a7f72] mb-2">
          Matric Number
        </label>
        <input
          type="text"
          value={matric}
          onChange={(e) => setMatric(e.target.value)}
          required
          placeholder="e.g. 20231376642"
          autoComplete="username"
          className="w-full bg-[#141414] border border-[#2a2520] rounded-lg px-4 py-3 text-[#e8e0d0] placeholder-[#3a3530] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200 font-mono tracking-wider"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-[#8a7f72] mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          autoComplete="current-password"
          className="w-full bg-[#141414] border border-[#2a2520] rounded-lg px-4 py-3 text-[#e8e0d0] placeholder-[#3a3530] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200"
        />
        <p className="text-[#3a3530] text-xs mt-1.5">Default password is your matric number.</p>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c8a96e] hover:bg-[#d4b87e] disabled:opacity-50 text-[#0a0a0a] font-bold tracking-widest uppercase text-sm rounded-lg px-4 py-3.5 transition-all duration-200 mt-2"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

function getErrorMessage(code) {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "An error occurred. Please try again.";
  }
}