const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');
const { auth } = require('../middleware/auth');

// @route   POST /api/upload/image
// @desc    Upload image file
// @access  Private
router.post('/image', auth, upload.single('image'), uploadImage);

module.exports = router;
