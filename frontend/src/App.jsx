import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseView from "./pages/CourseView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function Protected({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/register" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Redirect unauthenticated users to Register at first visit
  if (!user && location.pathname === "/") {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* NAVBAR */}
      <nav className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to={user ? "/dashboard" : "/register"}
            className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition"
          >
            SmartLearner
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              to="/courses"
              className="hover:text-yellow-300 transition border-b-2 border-transparent hover:border-yellow-300"
            >
              Courses
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition border-b-2 border-transparent hover:border-yellow-300"
              >
                Dashboard
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-1 rounded-md bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition"
              title="Toggle Theme"
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>

            {/* Auth Links / User Menu */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 border border-yellow-400 rounded-md hover:bg-yellow-300 text-white hover:text-gray-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 transition"
                >
                  Sign Up/Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 transition"
                >
                  👤 {user.name || "User"}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg w-40 z-20">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-6xl mx-auto p-6 w-full transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-600 dark:bg-blue-800 text-white py-6 text-center mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} SmartLearner — Empowering learners through AI-driven education.
        </p>
      </footer>
    </div>
  );
}
