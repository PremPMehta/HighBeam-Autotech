const mongoose = require('mongoose');
const Lead = require('../models/Lead');

// Helper to check MongoDB connection quickly
const checkMongoConnection = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getAllLeads = async (req, res) => {
  try {
    // Quick check - if MongoDB is not connected, return empty data
    if (!checkMongoConnection()) {
      return res.status(200).json({
        success: true,
        data: {
          leads: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalLeads: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      });
    }

    const { 
      page = 1, 
      limit = 10, 
      status, 
      source, 
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } },
        { carBrand: { $regex: search, $options: 'i' } },
        { carName: { $regex: search, $options: 'i' } },
        { servicesRequired: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Add timeout to queries
    // Add timeout to queries with error handling
    let leads, total;
    try {
      leads = await Promise.race([
        Lead.find(filter)
          .populate('assignedTo', 'username email')
          .sort(sort)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .maxTimeMS(3000),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 3000))
      ]);

      total = await Promise.race([
        Lead.countDocuments(filter).maxTimeMS(3000),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Count timeout')), 3000))
      ]);
    } catch (queryError) {
      // If query times out, return empty data
      return res.status(200).json({
        success: true,
        data: {
          leads: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalLeads: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        leads,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalLeads: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leads',
      error: error.message
    });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'username email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { lead }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lead',
      error: error.message
    });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public (for contact form)
const createLead = async (req, res) => {
  try {
    // Quick check - if MongoDB is not connected, return error
    if (!checkMongoConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Please try again later.',
      });
    }

    // Normalize data based on source
    let leadData = { ...req.body };

    // For book_consultation, map customerName to firstName if not provided
    if (leadData.source === 'book_consultation') {
      if (leadData.customerName && !leadData.firstName) {
        // Split customerName into firstName and lastName
        const nameParts = leadData.customerName.trim().split(' ');
        leadData.firstName = nameParts[0] || leadData.customerName;
        leadData.lastName = nameParts.slice(1).join(' ') || '';
      }
      // Map customerEmail to email if not provided
      if (leadData.customerEmail && !leadData.email) {
        leadData.email = leadData.customerEmail;
      }
      // Map customerPhone to phone if not provided
      if (leadData.customerPhone && !leadData.phone) {
        leadData.phone = leadData.customerPhone;
      }
      // Map comments to message if not provided
      if (leadData.comments && !leadData.message) {
        leadData.message = leadData.comments;
      }
      // Set default priority to 'high' for book_consultation if not provided
      if (!leadData.priority) {
        leadData.priority = 'high';
      }
      // Set default status to 'new' if not provided
      if (!leadData.status) {
        leadData.status = 'new';
      }
    }

    // For contact_form, ensure required fields are present
    if (leadData.source === 'contact_form') {
      if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone || !leadData.message) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields for contact form'
        });
      }
      // Set default priority to 'high' for contact_form if not provided
      if (!leadData.priority) {
        leadData.priority = 'high';
      }
      // Set default status to 'new' if not provided
      if (!leadData.status) {
        leadData.status = 'new';
      }
    }

    // Set default source if not provided
    if (!leadData.source) {
      leadData.source = 'contact_form';
    }

    const lead = await Promise.race([
      Lead.create(leadData),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Create timeout')), 3000))
    ]);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: { lead }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating lead',
      error: error.message
    });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'username email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: { lead }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating lead',
      error: error.message
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting lead',
      error: error.message
    });
  }
};

// @desc    Get lead statistics
// @route   GET /api/leads/stats
// @access  Private
const getLeadStats = async (req, res) => {
  try {
    // Calculate time ranges
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let stats = [], totalLeads = 0, recentLeads = 0, newThisWeek = 0, convertedLeads = 0;
    
    try {
      // Try to execute queries even if connection check fails (connection might be established during query)
      // Get status breakdown - filter by contact_form and book_consultation
      stats = await Promise.race([
        Lead.aggregate([
          {
            $match: {
              source: { $in: ['contact_form', 'book_consultation'] }
            }
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          }
        ]),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 5000))
      ]);

      // Total leads: all leads from contact_form and book_consultation
      totalLeads = await Promise.race([
        Lead.countDocuments({
          source: { $in: ['contact_form', 'book_consultation'] }
        }).maxTimeMS(5000),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Count timeout')), 5000))
      ]);

      // Recent leads: leads from past 24 hours (contact_form and book_consultation)
      recentLeads = await Promise.race([
        Lead.countDocuments({
          source: { $in: ['contact_form', 'book_consultation'] },
          createdAt: { $gte: last24Hours }
        }).maxTimeMS(5000),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Count timeout')), 5000))
      ]);

      // New this week: leads from past 7 days (contact_form and book_consultation)
      newThisWeek = await Promise.race([
        Lead.countDocuments({
          source: { $in: ['contact_form', 'book_consultation'] },
          createdAt: { $gte: last7Days }
        }).maxTimeMS(5000),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Count timeout')), 5000))
      ]);

      // Converted leads: leads with status "converted" from contact_form and book_consultation
      convertedLeads = await Promise.race([
        Lead.countDocuments({
          source: { $in: ['contact_form', 'book_consultation'] },
          status: 'converted'
        }).maxTimeMS(5000),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Count timeout')), 5000))
      ]);
    } catch (queryError) {
      // Log error for debugging but still return 0 values
      console.error('Error fetching lead statistics:', queryError.message);
      // Return empty stats instead of error
      return res.status(200).json({
        success: true,
        data: {
          totalLeads: 0,
          recentLeads: 0,
          newThisWeek: 0,
          convertedLeads: 0,
          statusBreakdown: [],
          sourceBreakdown: []
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalLeads: totalLeads || 0,
        recentLeads: recentLeads || 0,
        newThisWeek: newThisWeek || 0,
        convertedLeads: convertedLeads || 0,
        statusBreakdown: stats || []
      }
    });
  } catch (error) {
    console.error('Error in getLeadStats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lead statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats
};
