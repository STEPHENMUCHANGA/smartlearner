import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function CoursesDetail() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError("Failed to load courses. Please try again later.");
      });
  }, []);

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">{error}</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Available Courses
      </h2>
      <div className="grid gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-600">
                {course.title}
              </h3>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <Link
                to={`/courses/${course._id}`}
                className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Course
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No courses available yet.</p>
        )}
      </div>
    </div>
  );
}
