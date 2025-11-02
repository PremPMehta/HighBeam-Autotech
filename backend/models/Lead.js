const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  // Contact form fields (optional for book consultation)
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  // Book consultation fields (optional for contact form)
  customerName: {
    type: String,
    trim: true,
    maxlength: [100, 'Customer name cannot exceed 100 characters']
  },
  carBrand: {
    type: String,
    trim: true,
    maxlength: [50, 'Car brand cannot exceed 50 characters']
  },
  carName: {
    type: String,
    trim: true,
    maxlength: [100, 'Car name cannot exceed 100 characters']
  },
  servicesRequired: {
    type: String,
    trim: true,
    maxlength: [200, 'Services required cannot exceed 200 characters']
  },
  // Common fields
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  customerEmail: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  customerPhone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  comments: {
    type: String,
    trim: true,
    maxlength: [1000, 'Comments cannot exceed 1000 characters']
  },
  source: {
    type: String,
    enum: ['contact_form', 'book_consultation', 'phone', 'walk_in', 'referral', 'social_media'],
    default: 'contact_form'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  contactedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
leadSchema.index({ email: 1 });
leadSchema.index({ customerEmail: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
