require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');

async function seed() {
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

    // Hash password
    const passwordHash = await bcrypt.hash('password123', 10);

    // Create users
    const users = [
      { name: 'Ann Instructor', email: 'ann@smartlearner.com', password: passwordHash, role: 'instructor' },
      { name: 'Carol Instructor', email: 'carol@smartlearner.com', password: passwordHash, role: 'instructor' },
      { name: 'Peter Instructor', email: 'peter@smartlearner.com', password: passwordHash, role: 'instructor' },
      { name: 'Bobby Student', email: 'bobby@smartlearner.com', password: passwordHash, role: 'student' },
      { name: 'Charlie Student', email: 'charlie@smartlearner.com', password: passwordHash, role: 'student' },
      { name: 'Diana Student', email: 'diana@smartlearner.com', password: passwordHash, role: 'student' }
    ];

    const [ann, carol, peter, bobby, charlie, diana] = await User.insertMany(users);

    // Create courses
    const courses = [
      { title: 'AI Basics', description: 'Introduction to AI concepts and applications.', instructor: ann._id, tags: ['AI','ML'] },
      { title: 'Full Stack Web Development', description: 'Modern web development using React, Node.js, and MongoDB.', instructor: carol._id, tags: ['Web','Frontend','Backend'] },
      { title: 'Agricultural Technology', description: 'Using AI and IoT to revolutionize agriculture.', instructor: peter._id, tags: ['AgriTech','Sustainability'] }
    ];

    const createdCourses = await Course.insertMany(courses);

    // Create lessons
    const lessons = [
      { course: createdCourses[0]._id, title: 'What is AI?', content: 'AI definition and history.' },
      { course: createdCourses[0]._id, title: 'Supervised vs Unsupervised Learning', content: 'Learn the core ML paradigms.' },
      { course: createdCourses[1]._id, title: 'React Fundamentals', content: 'Components, props, and state management.' },
      { course: createdCourses[1]._id, title: 'Node.js and Express', content: 'Building REST APIs with Express.' },
      { course: createdCourses[2]._id, title: 'AI for Crop Management', content: 'How AI improves agricultural productivity.' },
      { course: createdCourses[2]._id, title: 'Drones in Farming', content: 'Applications of drone technology in smart agriculture.' }
    ];

    await Lesson.insertMany(lessons);

    console.log('🌱 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
