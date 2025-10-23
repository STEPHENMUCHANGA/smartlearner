import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (!courses.length) return <p>No courses available yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Courses</h2>
      <div className="grid gap-3">
        {courses.map(c => (
          <div key={c._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="font-semibold text-green-700 dark:text-green-300">{c.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{c.description}</p>
            <div className="mt-2">
              <Link to={`/courses/${c._id}`} className="text-blue-600 dark:text-blue-400">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
