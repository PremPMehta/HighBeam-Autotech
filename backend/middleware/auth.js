const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Get JWT secret with fallback
    const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-2024';
    
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (jwtError) {
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token.' 
        });
      }
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: 'Token expired.' 
        });
      }
      
      throw jwtError;
    }

    // Check MongoDB connection first
    const isMongoConnected = mongoose.connection.readyState === 1;
    
    if (!isMongoConnected) {
      // Development bypass - if MongoDB is not connected, allow requests with dev token
      // This matches the development bypass in loginUser
      const devUserId = '507f1f77bcf86cd799439011';
      
      if (decoded.id === devUserId) {
        // Set a minimal user object for development bypass
        req.user = {
          _id: devUserId,
          id: devUserId,
          username: 'admin',
          email: 'admin@highbeamautotech.com',
          role: 'admin',
          isActive: true
        };
        return next();
      }
      
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Please check MongoDB Atlas settings.'
      });
    }

    // Query user with timeout
    let user;
    try {
      user = await Promise.race([
        User.findById(decoded.id).select('-password').maxTimeMS(3000),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 3000)
        )
      ]);
    } catch (dbError) {
      console.error('Database query error in auth middleware:', dbError.message);
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please try again.'
      });
    }
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token or user not found.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Please authenticate first.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

module.exports = { auth, authorize };
