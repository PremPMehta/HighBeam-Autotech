const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-2024';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Private (Admin only)
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'viewer'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // DEVELOPMENT BYPASS - ALWAYS CHECK FIRST (Remove in production!)
    // Allow login with hardcoded credentials when MongoDB is offline
    const isMongoConnected = mongoose.connection.readyState === 1;
    
    // If MongoDB is NOT connected, use bypass
    if (!isMongoConnected) {
      console.warn('⚠️ WARNING: MongoDB not connected. Using development bypass.');
      
      // Hardcoded dev credentials (ONLY FOR DEVELOPMENT!)
      if (email === 'admin@highbeamautotech.com' && password === 'admin123') {
        // Use a static dev user ID for token generation
        const devUserId = '507f1f77bcf86cd799439011';
        const token = generateToken(devUserId);
        
        return res.status(200).json({
          success: true,
          message: 'Login successful (Development Mode - MongoDB offline)',
          data: {
            user: {
              id: devUserId,
              username: 'admin',
              email: 'admin@highbeamautotech.com',
              role: 'admin',
              isActive: true,
              lastLogin: new Date()
            },
            token
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }

    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Using development bypass? Email: admin@highbeamautotech.com, Password: admin123'
      });
    }

    // Check if user exists with explicit timeout handling
    let user;
    try {
      user = await Promise.race([
        User.findOne({ email }).select('+password').maxTimeMS(5000),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 5000)
        )
      ]);
    } catch (dbError) {
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please check MongoDB Atlas Network Access settings and ensure your IP is whitelisted.'
      });
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login with timeout
    try {
      user.lastLogin = new Date();
      await Promise.race([
        user.save(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Save timeout')), 5000)
        )
      ]);
    } catch (saveError) {
      // Log error but continue with login
      console.error('Failed to update last login:', saveError.message);
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = async (req, res) => {
  try {
    // If MongoDB is not connected, return user from token (development bypass)
    if (mongoose.connection.readyState !== 1) {
      // Return user from token if available
      if (req.user) {
        return res.status(200).json({
          success: true,
          data: {
            user: req.user
          }
        });
      }
      // Fallback for development
      return res.status(200).json({
        success: true,
        data: {
          user: {
            id: '507f1f77bcf86cd799439011',
            username: 'admin',
            email: 'admin@highbeamautotech.com',
            role: 'admin',
            isActive: true
          }
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = async (req, res) => {
  try {
    // In a more advanced setup, you might want to blacklist the token
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
};
