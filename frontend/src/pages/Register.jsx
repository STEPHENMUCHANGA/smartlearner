import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl font-semibold mb-4'>Register/Sign Up</h2>
      <form onSubmit={submit} className='space-y-3'>
        <input value={name} onChange={e => setName(e.target.value)} className='w-full p-2 border rounded' placeholder='Full name' />
        <input value={email} onChange={e => setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Email' />
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Password' />
        <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded'>Register</button>
      </form>
    </div>
  );
}
