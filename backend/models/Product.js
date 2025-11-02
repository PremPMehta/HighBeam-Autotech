const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [200, 'Product title cannot exceed 200 characters']
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  servicePoints: {
    type: [String],
    required: [true, 'Service points are required'],
    validate: {
      validator: function(v) {
        return v.length === 6;
      },
      message: 'Exactly 6 service points are required'
    },
    maxlength: [200, 'Each service point cannot exceed 200 characters']
  },
  timeTaken: {
    type: String,
    required: [true, 'Time taken is required'],
    trim: true,
    maxlength: [50, 'Time taken cannot exceed 50 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  warranty: {
    type: String,
    trim: true,
    maxlength: [200, 'Warranty cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ displayOrder: 1 });
productSchema.index({ name: 'text', title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);

