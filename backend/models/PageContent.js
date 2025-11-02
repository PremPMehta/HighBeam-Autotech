const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  pageName: {
    type: String,
    required: true,
    trim: true
  },
  sections: [{
    sectionId: {
      type: String,
      required: true
    },
    sectionType: {
      type: String,
      enum: ['hero', 'text', 'image', 'service', 'value', 'feature', 'footer'],
      required: true
    },
    content: {
      type: mongoose.Schema.Types.Mixed, // Can store any type of data
      default: {}
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
pageContentSchema.index({ pageId: 1 });

module.exports = mongoose.model('PageContent', pageContentSchema);
