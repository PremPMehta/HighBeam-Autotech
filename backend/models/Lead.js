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
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
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

// Pre-save hook to set default priority for book_consultation and contact_form leads
leadSchema.pre('save', function(next) {
  // If source is book_consultation or contact_form and this is a new document, set priority to 'high'
  // This overrides the default 'medium' priority for these lead types
  if (this.isNew && (this.source === 'book_consultation' || this.source === 'contact_form')) {
    // Only set to 'high' if priority wasn't explicitly set (or is the default 'medium')
    if (!this.priority || this.priority === 'medium') {
      this.priority = 'high';
    }
  }
  // Ensure status is 'new' by default if not set
  if (!this.status) {
    this.status = 'new';
  }
  next();
});

// Index for better query performance
leadSchema.index({ email: 1 });
leadSchema.index({ customerEmail: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
