const express = require('express');
const router = express.Router();
const {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats
} = require('../controllers/leadController');
const { auth, authorize } = require('../middleware/auth');
const { validateLead } = require('../middleware/validation');

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private
router.get('/', auth, getAllLeads);

// @route   GET /api/leads/stats
// @desc    Get lead statistics
// @access  Private
router.get('/stats', auth, getLeadStats);

// @route   GET /api/leads/:id
// @desc    Get single lead
// @access  Private
router.get('/:id', auth, getLeadById);

// @route   POST /api/leads
// @desc    Create new lead (from contact form)
// @access  Public
router.post('/', validateLead, createLead);

// @route   PUT /api/leads/:id
// @desc    Update lead
// @access  Private
router.put('/:id', auth, updateLead);

// @route   DELETE /api/leads/:id
// @desc    Delete lead
// @access  Private
router.delete('/:id', auth, authorize('admin'), deleteLead);

module.exports = router;
