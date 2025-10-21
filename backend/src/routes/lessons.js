
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Lesson = require('../models/Lesson');
const validate = require('../middleware/validate');

router.get('/course/:courseId', async (req,res,next)=>{
  try{ const lessons = await Lesson.find({ course: req.params.courseId }); res.json(lessons); }catch(err){ next(err); }
});

router.post('/', [ body('course').notEmpty(), body('title').notEmpty() ], validate, async (req,res,next)=>{
  try{ const l = new Lesson(req.body); await l.save(); res.status(201).json(l); }catch(err){ next(err); }
});

module.exports = router;
