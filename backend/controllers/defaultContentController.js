const path = require('path');
const fs = require('fs');

// @desc    Get default images for a page
// @route   GET /api/default-content/:pageId/images
// @access  Public
const getDefaultImages = async (req, res) => {
  try {
    const { pageId } = req.params;
    
    // Default image mappings for home page
    if (pageId === 'home') {
      const defaultImages = {
        hero1: {
          // These paths are relative to where the website serves images
          // Since images are imported in React/Vite, they get processed
          // We'll return the asset paths that the frontend can resolve
          image: '/src/assets/image/hero-1.jpg',
        },
        hero2: {
          image: '/src/assets/image/hero-2.jpg',
        },
        services: [
          { image: '/src/assets/image/gif1.gif' },
          { image: '/src/assets/image/gif2.gif' },
          { image: '/src/assets/image/gif3.gif' },
          { image: '/src/assets/image/gif4.gif' },
          { image: '/src/assets/image/gif5.gif' },
          { image: '/src/assets/image/gif6.gif' },
          { image: '/src/assets/image/gif7.gif' },
          { image: '/src/assets/image/gif8.gif' },
          { image: '/src/assets/image/gif9.gif' },
          { image: '/src/assets/image/gif10.gif' },
          { image: '/src/assets/image/gif11.gif' },
          { image: '/src/assets/image/gif12.gif' },
        ],
        carRepair: {
          image: '/src/assets/image/service.png',
        },
        coreValues: [
          { image: '/src/assets/image/easy.gif' },
          { image: '/src/assets/image/financing.gif' },
          { image: '/src/assets/image/expertise.gif' },
          { image: '/src/assets/image/cost.gif' },
        ],
        about: {
          image: '/src/assets/image/about-car.png',
        },
      };

      res.status(200).json({
        success: true,
        data: { images: defaultImages }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getDefaultImages
};

