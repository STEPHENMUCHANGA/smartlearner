
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Course = require('../models/Course');
const validate = require('../middleware/validate');

router.get('/', async (req,res,next) => {
  try{
    const courses = await Course.find().populate('instructor','name email');
    res.json(courses);
  }catch(err){ next(err); }
});

router.get('/:id', async (req,res,next)=>{
  try{ const course = await Course.findById(req.params.id).populate('instructor'); 
    if(!course) return res.status(404).json({ msg: 'Not found' }); res.json(course); 
  }catch(err){ next(err); }
});

router.post('/', [ body('title').notEmpty() ], validate, async (req,res,next)=>{
  try{ const c = new Course(req.body); await c.save(); res.status(201).json(c); 
  }catch(err){ next(err); }
});

router.put('/:id', async (req,res,next)=>{
  try{ const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new:true }); 
  if(!updated) return res.status(404).json({ msg: 'Not found' }); res.json(updated); 
  }catch(err){ next(err); }
});

router.delete('/:id', async (req,res,next)=>{
  try{ await Course.findByIdAndDelete(req.params.id); res.json({ msg: 'Deleted' }); 
}catch(err){ next(err); }
});

module.exports = router;
