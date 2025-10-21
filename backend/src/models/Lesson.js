
const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  content: String,
  resources: [String]
},{ timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
