const mongoose = require('mongoose');
const Product = require('../models/Product');

// Helper to check MongoDB connection quickly
const checkMongoConnection = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private/Public
const getAllProducts = async (req, res) => {
  try {
    console.log('📥 GET /api/products - Request received');
    console.log('🔐 User authenticated:', req.user ? 'Yes' : 'No');
    
    if (!checkMongoConnection()) {
      console.error('❌ MongoDB not connected! Connection state:', mongoose.connection.readyState);
      console.error('   State 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting');
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Please check MongoDB connection.',
        data: { products: [] }
      });
    }

    const { category, isActive, search } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$text = { $search: search };
    }

    console.log('🔍 Querying products from database with filter:', filter);
    const products = await Promise.race([
      Product.find(filter)
        .populate('category', 'name slug displayOrder')
        .sort({ displayOrder: 1, name: 1 })
        .maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
    ]);

    // Sort products: first by category displayOrder, then by product displayOrder, then alphabetically
    try {
      products.sort((a, b) => {
        // First sort by category displayOrder
        const categoryOrderA = (a.category && a.category.displayOrder !== undefined) ? a.category.displayOrder : 999;
        const categoryOrderB = (b.category && b.category.displayOrder !== undefined) ? b.category.displayOrder : 999;
        if (categoryOrderA !== categoryOrderB) {
          return categoryOrderA - categoryOrderB;
        }
        // Then by product displayOrder
        const productOrderA = (a.displayOrder !== undefined) ? a.displayOrder : 999;
        const productOrderB = (b.displayOrder !== undefined) ? b.displayOrder : 999;
        if (productOrderA !== productOrderB) {
          return productOrderA - productOrderB;
        }
        // Finally alphabetically by name
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB);
      });
    } catch (sortError) {
      console.error('Error sorting products:', sortError);
      // Continue with unsorted products if sorting fails
    }

    console.log(`✅ Found ${products.length} products`);
    if (products.length > 0) {
      console.log('Sample product:', products[0]);
    }

    res.status(200).json({
      success: true,
      data: { products }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private/Public
const getProductById = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = await Promise.race([
      Product.findById(req.params.id)
        .populate('category', 'name slug')
        .maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
    ]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable'
      });
    }

    // Ensure servicePoints has exactly 6 items
    if (!req.body.servicePoints || req.body.servicePoints.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Exactly 6 service points are required'
      });
    }

    const product = await Promise.race([
      Product.create(req.body),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Create timeout')), 3000))
    ]);

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product: populatedProduct }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable'
      });
    }

    // Ensure servicePoints has exactly 6 items if provided
    if (req.body.servicePoints && req.body.servicePoints.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Exactly 6 service points are required'
      });
    }

    const product = await Promise.race([
      Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
        .populate('category', 'name slug')
        .maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Update timeout')), 3000))
    ]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable'
      });
    }

    const product = await Promise.race([
      Product.findByIdAndDelete(req.params.id).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Delete timeout')), 3000))
    ]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

