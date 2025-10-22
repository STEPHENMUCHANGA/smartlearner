import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = params.get('user');
    if (token && user) {
      localStorage.setItem('token', token);
      try { localStorage.setItem('user', user); } catch (e) {}
      navigate('/dashboard');
    }
  }, [location, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  const google = () => {
    window.location.href =
      (import.meta.env.VITE_API_BASE_URL || '/api').replace('/api', '') +
      '/api/auth/google';
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl font-semibold mb-4'>Login</h2>
      <form onSubmit={submit} className='space-y-3'>
        <input value={email} onChange={e => setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Email' />
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Password' />
        <div className='flex gap-2'>
          <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded'>Login</button>
          <button type='button' onClick={google} className='px-4 py-2 border rounded'>Login with Google</button>
        </div>
      </form>
    </div>
  );
}
