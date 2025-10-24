import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';


function DebugBanner() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE_URL + "/courses")
      .then(res => {
        if (res.ok) setStatus("✅ Connected to Backend API");
        else setStatus("⚠️ Backend responded with error");
      })
      .catch(() => setStatus("❌ Backend Unreachable"));
  }, []);

  return (
    <div className="text-center text-sm py-1 bg-gray-100 border-b border-gray-300 text-gray-800">
      {status}
    </div>
  );
}

  // Only show banner in development mode
function Protected({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-green-600 dark:text-green-400">
          SmartLearner
        </Link>
        <div className="flex gap-3 items-center">
          <Link to="/courses" className="px-3 py-1 border rounded text-sm dark:border-gray-600">
            Courses
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-1 border rounded text-sm dark:border-gray-600">
                Dashboard
              </Link>
              <button onClick={logout} className="px-3 py-1 bg-red-600 text-white text-sm rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 bg-green-600 text-white text-sm rounded">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 border rounded text-sm dark:border-gray-600">
                Register
              </Link>
            </>
          )}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-3 py-1 border rounded text-sm dark:border-gray-600"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400 py-4 mt-12">
      <p>© {new Date().getFullYear()} SmartLearner — Empowering Education with AI 🌱</p>
    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DebugBanner />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
        <div>
          <Navbar />
          <main className="max-w-6xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
