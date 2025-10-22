import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Courses(){
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to load courses:', err));
  }, []);

  return (
    <div>
      <h2 className='text-xl font-semibold mb-3'>Courses</h2>
      <div className='grid gap-3'>
        {courses.map(c => (
          <div key={c._id} className='p-4 bg-white rounded shadow'>
            <h3 className='font-semibold'>{c.title}</h3>
            <p className='text-sm text-gray-600'>{c.description}</p>
            <div className='mt-2'>
              <Link to={`/courses/${c._id}`} className='text-blue-600'>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
