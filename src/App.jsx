import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CourseRepDashboard from "./pages/CourseRepDashboard";
// import StudentDashboard from "./pages/StudentDashboard"; // add when ready

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/courserep"
            element={
              <ProtectedRoute allowedRoles={["courserep"]}>
                <CourseRepDashboard />
              </ProtectedRoute>
            }
          />
          {/* Uncomment when StudentDashboard is ready */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;