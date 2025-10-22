import React, { useContext } from 'react';
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
  if (!user) return <Navigate to='/login' />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className='min-h-screen bg-gray-50'>
        <nav className='bg-white shadow p-4'>
          <div className='max-w-4xl mx-auto flex justify-between'>
            <Link to='/' className='font-bold text-lg'>SmartLearner</Link>
            <div className='flex gap-2'>
              <Link to='/courses' className='px-3 py-1 border rounded'>Courses</Link>
              <Link to='/dashboard' className='px-3 py-1 border rounded'>Dashboard</Link>
            </div>
          </div>
        </nav>
        <main className='max-w-4xl mx-auto p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/:id' element={<CourseView />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
