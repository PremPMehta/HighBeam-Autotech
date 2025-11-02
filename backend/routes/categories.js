const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { auth } = require('../middleware/auth');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Private
router.get('/', auth, getAllCategories);

// Public route to get categories for frontend
router.get('/public', getAllCategories);
router.get('/public/:id', getCategoryById);

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Private
router.get('/:id', auth, getCategoryById);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private
router.post('/', auth, createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private
router.put('/:id', auth, updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private
router.delete('/:id', auth, deleteCategory);

module.exports = router;

