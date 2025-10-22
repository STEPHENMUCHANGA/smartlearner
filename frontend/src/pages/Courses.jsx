// frontend/src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // ✅ Use your pre-configured Axios instance

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c._id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.description}</p>
              <div className="mt-3">
                <Link
                  to={`/courses/${c._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Course →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
