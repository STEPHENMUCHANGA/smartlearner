require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');

async function seed() 
{
  try {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
      useUnifiedTopology: true 
  });
    console.log('✅ Connected to DB for seeding');

    // Clean collections
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Lesson.deleteMany({})
    ]);
    console.log('🧹 Old data cleared');

  // Create instructors
  const hashedPassword = await bcrypt.hash("password123", 10);
  const ann = new User({
    name: "Ann Instructor",
    email: "ann@smartlearner.com",
    password: hashedPassword,
    role: "instructor",
  });
  const carol = new User({
    name: "Carol Instructor",
    email: "carol@smartlearner.com",
    password: hashedPassword,
    role: "instructor",
  });
  const peter = new User({
    name: "Peter Instructor",
    email: "peter@smartlearner.com",
    password: hashedPassword,
    role: "instructor",
  });

  await Promise.all([ann.save(), carol.save(), peter.save()]);

  // Create courses
  const courses = await Course.insertMany([
    {
      title: "AI Basics",
      description: "Introduction to AI concepts and applications.",
      instructor: ann._id,
      tags: ["AI", "ML"],
    },
    {
      title: "Full Stack Web Development",
      description: "Modern web development using React, Node.js, and MongoDB.",
      instructor: carol._id,
      tags: ["Web", "Frontend", "Backend"],
    },
    {
      title: "Agricultural Technology",
      description: "Using AI and IoT to revolutionize agriculture.",
      instructor: peter._id,
      tags: ["AgriTech", "Sustainability"],
    },
  ]);

  // Create lessons
  await Lesson.insertMany([
    {
      course: courses[0]._id,
      title: "What is AI?",
      content: "AI definition, history, and use cases.",
    },
    {
      course: courses[1]._id,
      title: "React Basics",
      content: "Understanding components and JSX.",
    },
    {
      course: courses[2]._id,
      title: "Sensors in Agriculture",
      content: "How IoT helps in modern farming.",
    },
  ]);

  console.log("🌱 Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
