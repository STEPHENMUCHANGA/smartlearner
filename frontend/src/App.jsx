import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';

function Protected({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
        <nav className="bg-white dark:bg-gray-800 shadow p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="font-bold text-lg text-green-600 dark:text-green-400">
              SmartLearner
            </Link>
            <div className="flex gap-2 items-center">
              <Link to="/courses" className="px-3 py-1 border rounded text-sm dark:border-gray-600">
                Courses
              </Link>
              <Link to="/dashboard" className="px-3 py-1 border rounded text-sm dark:border-gray-600">
                Dashboard
              </Link>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="px-3 py-1 rounded text-sm border dark:border-gray-600"
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-4">
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
    </AuthProvider>
  );
}
