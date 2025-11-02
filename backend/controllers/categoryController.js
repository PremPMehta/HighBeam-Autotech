const mongoose = require('mongoose');
const Category = require('../models/Category');

// Helper to check MongoDB connection quickly
const checkMongoConnection = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getAllCategories = async (req, res) => {
  try {
    console.log('📥 GET /api/categories - Request received');
    
    if (!checkMongoConnection()) {
      console.warn('⚠️ MongoDB not connected, returning empty array');
      return res.status(200).json({
        success: true,
        data: { categories: [] }
      });
    }

    console.log('🔍 Querying categories from database...');
    const categories = await Promise.race([
      Category.find().sort({ displayOrder: 1, name: 1 }).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
    ]);

    console.log(`✅ Found ${categories.length} categories`);
    if (categories.length > 0) {
      console.log('Sample category:', categories[0]);
    }

    res.status(200).json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private
const getCategoryById = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const category = await Promise.race([
      Category.findById(req.params.id).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
    ]);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { category }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category',
      error: error.message
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable'
      });
    }

    const category = await Promise.race([
      Category.create(req.body),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Create timeout')), 3000))
    ]);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating category',
      error: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable'
      });
    }

    const category = await Promise.race([
      Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Update timeout')), 3000))
    ]);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating category',
      error: error.message
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable'
      });
    }

    const category = await Promise.race([
      Category.findByIdAndDelete(req.params.id).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Delete timeout')), 3000))
    ]);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category',
      error: error.message
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

