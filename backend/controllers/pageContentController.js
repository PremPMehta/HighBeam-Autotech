const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

// Helper to check MongoDB connection quickly
const checkMongoConnection = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Get all pages
// @route   GET /api/pages
// @access  Private
const getAllPages = async (req, res) => {
  try {
    // Quick check - if MongoDB is not connected, return empty array
    if (!checkMongoConnection()) {
      return res.status(200).json({
        success: true,
        data: { pages: [] }
      });
    }

    const pages = await Promise.race([
      PageContent.find().sort({ pageName: 1 }).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
    ]);

    res.status(200).json({
      success: true,
      data: { pages }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pages',
      error: error.message
    });
  }
};

// @desc    Get single page by ID
// @route   GET /api/pages/:pageId
// @access  Private
const getPageById = async (req, res) => {
  try {
    // Quick check - if MongoDB is not connected, return 404 (page not found)
    if (!checkMongoConnection()) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    const page = await Promise.race([
      PageContent.findOne({ pageId: req.params.pageId }).maxTimeMS(3000),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
    ]);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { page }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching page',
      error: error.message
    });
  }
};

// @desc    Create new page
// @route   POST /api/pages
// @access  Private
const createPage = async (req, res) => {
  try {
    // Quick check - if MongoDB is not connected, return helpful error
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Your IP (42.104.160.22) needs to be whitelisted in MongoDB Atlas Network Access. Visit: https://cloud.mongodb.com/ → Network Access → Add IP Address',
        error: 'MongoDB not connected',
        helpUrl: 'https://cloud.mongodb.com/',
      });
    }

    // Create page with timeout
    let page;
    try {
      page = await Promise.race([
        PageContent.create(req.body),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Create timeout')), 3000)
        )
      ]);
    } catch (dbError) {
      console.error('Database create error:', dbError.message);
      
      // Handle duplicate key error (pageId already exists)
      if (dbError.code === 11000 || dbError.message.includes('duplicate')) {
        return res.status(400).json({
          success: false,
          message: 'Page with this ID already exists. Use PUT to update instead.',
        });
      }
      
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please try again.',
        error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }

    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: { page }
    });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating page',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update page content
// @route   PUT /api/pages/:pageId
// @access  Private
const updatePage = async (req, res) => {
  try {
    // Quick check - if MongoDB is not connected, return helpful error
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Please check MongoDB Atlas settings. Your IP (42.104.160.22) needs to be whitelisted in MongoDB Atlas Network Access.',
        error: 'MongoDB not connected',
        helpUrl: 'https://cloud.mongodb.com/',
      });
    }

    // Update page with timeout
    let page;
    try {
      page = await Promise.race([
        PageContent.findOneAndUpdate(
          { pageId: req.params.pageId },
          {
            ...req.body,
            lastModified: new Date()
          },
          { new: true, runValidators: true, upsert: false }
        ).maxTimeMS(3000),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Update timeout')), 3000)
        )
      ]);
    } catch (dbError) {
      console.error('Database update error:', dbError.message);
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please try again.',
        error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }

    if (!page) {
      // Try to create the page if it doesn't exist (upsert behavior)
      try {
        const newPage = await Promise.race([
          PageContent.create({
            pageId: req.params.pageId,
            ...req.body,
            lastModified: new Date()
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Create timeout')), 3000)
          )
        ]);
        
        return res.status(201).json({
          success: true,
          message: 'Page created successfully',
          data: { page: newPage }
        });
      } catch (createError) {
        return res.status(500).json({
          success: false,
          message: 'Failed to create or update page',
          error: process.env.NODE_ENV === 'development' ? createError.message : undefined
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Page updated successfully',
      data: { page }
    });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating page',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update specific section
// @route   PUT /api/pages/:pageId/sections/:sectionId
// @access  Private
const updateSection = async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageId: req.params.pageId });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    const sectionIndex = page.sections.findIndex(
      s => s.sectionId === req.params.sectionId
    );

    if (sectionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    page.sections[sectionIndex].content = {
      ...page.sections[sectionIndex].content,
      ...req.body
    };
    page.lastModified = new Date();

    await page.save();

    res.status(200).json({
      success: true,
      message: 'Section updated successfully',
      data: { page }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating section',
      error: error.message
    });
  }
};

// @desc    Delete page
// @route   DELETE /api/pages/:pageId
// @access  Private
const deletePage = async (req, res) => {
  try {
    const page = await PageContent.findOneAndDelete({ pageId: req.params.pageId });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting page',
      error: error.message
    });
  }
};

module.exports = {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  updateSection,
  deletePage
};
