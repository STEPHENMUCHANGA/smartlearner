
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validate = require('../middleware/validate');
const passport = require('passport');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min:6 })
], validate, async (req,res,next)=>{
  try{
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'Email already registered' });
    user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  }catch(err){ next(err); }
});

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], validate, async (req,res,next)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid email or password' });
    const match = await user.comparePassword(password);
    if(!match) return res.status(400).json({ msg: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  }catch(err){ next(err); }
});

// Google OAuth endpoints
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req,res,next) => {
  passport.authenticate('google', { session: false }, (err, data) => {
    if(err) return next(err);
    const { user, token } = data;
    const frontend = process.env.FRONTEND_URL || 'http://localhost:5173';
    const prod = process.env.FRONTEND_URL_PROD || '';
    const redirectBase = (process.env.NODE_ENV === 'production' && prod) ? prod : frontend;
    const redirectUrl = `${redirectBase}/login?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: user._id, name: user.name, email: user.email
    }))}`;
    res.redirect(redirectUrl);
  })(req,res,next);
});

module.exports = router;
