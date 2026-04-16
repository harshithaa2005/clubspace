const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const EventEnrollment = require('../models/EventEnrollment');
const ClubRegistration = require('../models/ClubRegistration');

// @route   POST api/forms/contact
// @desc    Submit a contact form
// @access  Public
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    
    res.json({ msg: 'Contact message sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forms/enroll
// @desc    Enroll user in an event
// @access  Private
router.post('/enroll', auth, async (req, res) => {
  try {
    const { event, name, email, phone, department, comments } = req.body;
    
    const enrollment = new EventEnrollment({
      user: req.user.id,
      event,
      name,
      email,
      phone,
      department,
      comments
    });
    
    await enrollment.save();
    res.json({ msg: 'Successfully enrolled in event' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forms/club-register
// @desc    Register a user for a club
// @access  Private
router.post('/club-register', auth, async (req, res) => {
  try {
    const { clubName, name, email, phone, yearDepartment, whyJoin } = req.body;
    
    const registration = new ClubRegistration({
      user: req.user.id,
      clubName,
      name,
      email,
      phone,
      yearDepartment,
      whyJoin
    });
    
    await registration.save();
    res.json({ msg: 'Successfully registered for club' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
