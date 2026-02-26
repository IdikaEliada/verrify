import { useAuth } from "../contexts/AuthContext";

export default function CourseRepDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl font-black tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Course Rep Dashboard
          </h1>
          <button
            onClick={logout}
            className="text-sm text-[#8a7f72] hover:text-[#c8a96e] transition-colors"
          >
            Sign out
          </button>
        </div>
        <p className="text-[#8a7f72]">Welcome, {user?.email}</p>
        {/* Build out your dashboard here */}
      </div>
    </div>
  );
}