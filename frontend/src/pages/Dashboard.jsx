
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

export default function Dashboard(){
  const { user, logout } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(()=>{
    axios.get('/api/courses').then(res=> setMyCourses(res.data)
  ).catch(console.error)
  },[])

  return (
    <div className='bg-white p-6 rounded shadow'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Dashboard</h2>
        <div>
          <span className='mr-3'>Welcome to SmartLearner, {user?.name}</span>
          <button onClick={logout} className='px-3 py-1 border rounded'>Logout</button>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='font-semibold mb-2'>Available Courses</h3>
        <ul className='list-disc pl-5'>
          {myCourses.map(c=> <li key={c._id}>{c.title}</li>)}
        </ul>
      </div>
    </div>
  )
}
