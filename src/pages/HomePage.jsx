import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/login";
import PWAInstallPrompt from "../components/PWAInstallPrompt";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setIsLoading(false);
      if (firebaseUser) {
        if (userRole === "student") navigate("/dashboard");
        else if (userRole === "courserep") navigate("/courserep");
      }
    });
    return () => unsubscribe();
  }, [navigate, userRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#c8a96e] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8a7f72] text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c8a96e 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c8a96e] opacity-[0.04] blur-[100px] rounded-full" />

      <PWAInstallPrompt />

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/20 mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h1
              className="text-4xl font-black text-[#e8e0d0] mb-2 tracking-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
            >
              Verrify
            </h1>
            <p className="text-[#8a7f72] text-sm tracking-wide">
              University Dues Management System
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#111009] border border-[#2a2520] rounded-2xl p-8 shadow-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#8a7f72] mb-6 text-center">
              Sign in to continue
            </p>
            <LoginForm />
          </div>

          <p className="text-center text-[#3a3530] text-xs mt-6">
            Contact your course rep if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}