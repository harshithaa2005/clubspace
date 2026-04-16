const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Contact = require('../models/Contact');
const ClubRegistration = require('../models/ClubRegistration');
const EventEnrollment = require('../models/EventEnrollment');

// @route   GET api/admin/registrations
// @desc    Get all club registrations
// @access  Private/Admin
router.get('/registrations', auth, adminAuth, async (req, res) => {
  try {
    const registrations = await ClubRegistration.find().sort({ date: -1 });
    res.json(registrations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/approve-registration/:id
// @desc    Approve a club registration
// @access  Private/Admin
router.put('/approve-registration/:id', auth, adminAuth, async (req, res) => {
  try {
    let registration = await ClubRegistration.findById(req.params.id);
    if (!registration) return res.status(404).json({ msg: 'Registration not found' });
    
    registration.status = 'Approved';
    await registration.save();
    
    res.json({ msg: 'Registration approved successfully', registration });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/reject-registration/:id
// @desc    Reject a club registration
// @access  Private/Admin
router.put('/reject-registration/:id', auth, adminAuth, async (req, res) => {
  try {
    let registration = await ClubRegistration.findById(req.params.id);
    if (!registration) return res.status(404).json({ msg: 'Registration not found' });
    
    registration.status = 'Rejected';
    await registration.save();
    
    res.json({ msg: 'Registration rejected successfully', registration });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/contacts
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/contacts', auth, adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/enrollments
// @desc    Get all event enrollments
// @access  Private/Admin
router.get('/enrollments', auth, adminAuth, async (req, res) => {
  try {
    const enrollments = await EventEnrollment.find().sort({ date: -1 });
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
