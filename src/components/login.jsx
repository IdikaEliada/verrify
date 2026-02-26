import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      // Navigation handled by HomePage's useEffect watching userRole
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
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@university.edu"
          className="w-full bg-[#141414] border border-[#2a2520] rounded-lg px-4 py-3 text-[#e8e0d0] placeholder-[#3a3530] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200"
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
          className="w-full bg-[#141414] border border-[#2a2520] rounded-lg px-4 py-3 text-[#e8e0d0] placeholder-[#3a3530] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200"
        />
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