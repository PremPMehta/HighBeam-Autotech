const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Lead validation rules - conditional based on source
const validateLead = [
  // Validate source
  body('source').optional().isIn(['contact_form', 'book_consultation', 'phone', 'walk_in', 'referral', 'social_media']),
  
  // Conditional validation using custom validators
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'contact_form' && !value) {
        throw new Error('First name is required for contact form');
      }
      return true;
    }),
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'contact_form' && !value) {
        throw new Error('Last name is required for contact form');
      }
      return true;
    }),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
    .custom((value, { req }) => {
      if (req.body?.source === 'contact_form' && !value) {
        throw new Error('Email is required for contact form');
      }
      return true;
    }),
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
    .custom((value, { req }) => {
      if (req.body?.source === 'contact_form' && !value) {
        throw new Error('Phone number is required for contact form');
      }
      return true;
    }),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'contact_form' && !value) {
        throw new Error('Message is required for contact form');
      }
      return true;
    }),
  
  // For book_consultation
  body('customerName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Customer name cannot exceed 100 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'book_consultation' && !value) {
        throw new Error('Customer name is required for book consultation');
      }
      return true;
    }),
  body('customerPhone')
    .custom((value, { req }) => {
      // If source is book_consultation, phone is required
      if (req.body?.source === 'book_consultation') {
        const trimmedValue = value ? String(value).trim() : '';
        if (!trimmedValue) {
          throw new Error('Phone number is required for book consultation');
        }
        // Validate 10 digits
        if (!/^\d{10}$/.test(trimmedValue)) {
          throw new Error('Phone number must be exactly 10 digits');
        }
      }
      return true;
    })
    .optional({ checkFalsy: true }),
  body('carBrand')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Car brand cannot exceed 50 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'book_consultation' && !value) {
        throw new Error('Car brand is required for book consultation');
      }
      return true;
    }),
  body('carName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Car name cannot exceed 100 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'book_consultation' && !value) {
        throw new Error('Car name is required for book consultation');
      }
      return true;
    }),
  body('servicesRequired')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Service required cannot exceed 200 characters')
    .custom((value, { req }) => {
      if (req.body?.source === 'book_consultation' && !value) {
        throw new Error('Service required is required for book consultation');
      }
      return true;
    }),
  body('customerEmail')
    .optional({ checkFalsy: true })
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('comments')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Comments cannot exceed 1000 characters'),
  
  handleValidationErrors
];

// Hero section validation rules
const validateHeroSection = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateLead,
  validateHeroSection
};
