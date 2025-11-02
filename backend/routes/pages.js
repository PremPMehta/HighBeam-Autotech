const express = require('express');
const router = express.Router();
const {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  updateSection,
  deletePage
} = require('../controllers/pageContentController');
const { auth } = require('../middleware/auth');

// @route   GET /api/pages
// @desc    Get all pages
// @access  Private
router.get('/', auth, getAllPages);

// @route   GET /api/pages/:pageId
// @desc    Get single page
// @access  Private
router.get('/:pageId', auth, getPageById);

// Public route to get page content for frontend
router.get('/public/:pageId', getPageById);

// @route   POST /api/pages
// @desc    Create new page
// @access  Private
router.post('/', auth, createPage);

// @route   PUT /api/pages/:pageId
// @desc    Update page
// @access  Private
router.put('/:pageId', auth, updatePage);

// @route   PUT /api/pages/:pageId/sections/:sectionId
// @desc    Update specific section
// @access  Private
router.put('/:pageId/sections/:sectionId', auth, updateSection);

// @route   DELETE /api/pages/:pageId
// @desc    Delete page
// @access  Private
router.delete('/:pageId', auth, deletePage);

module.exports = router;
