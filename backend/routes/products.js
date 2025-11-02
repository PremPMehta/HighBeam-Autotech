const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { auth } = require('../middleware/auth');

// @route   GET /api/products
// @desc    Get all products
// @access  Private
router.get('/', auth, getAllProducts);

// Public route to get products for frontend
router.get('/public', getAllProducts);
router.get('/public/:id', getProductById);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Private
router.get('/:id', auth, getProductById);

// @route   POST /api/products
// @desc    Create new product
// @access  Private
router.post('/', auth, createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private
router.put('/:id', auth, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', auth, deleteProduct);

module.exports = router;

