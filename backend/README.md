# Highbeam Autotech Backend API

Backend API for Highbeam Autotech Admin Panel with MongoDB Atlas integration.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Install dependencies:**

```bash
cd backend
npm install
```

2. **Environment Setup:**
   Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://premarch567_db_user:Gza0alBBfCu28UH8@cluster0.1sv7akw.mongodb.net/highbeam_autotech?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

3. **Start the server:**

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user (Admin only)
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Leads Management

- `GET /api/leads` - Get all leads (with pagination and filters)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create new lead (from contact form)
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead (Admin only)
- `GET /api/leads/stats` - Get lead statistics

### Health Check

- `GET /api/health` - API health status

## 🔧 Features

- ✅ MongoDB Atlas integration
- ✅ JWT Authentication
- ✅ Role-based authorization
- ✅ Input validation
- ✅ Rate limiting
- ✅ Security headers
- ✅ Error handling
- ✅ Lead management
- ✅ User management

## 🛡️ Security Features

- Helmet.js for security headers
- Rate limiting to prevent abuse
- Input validation and sanitization
- Password hashing with bcrypt
- JWT token authentication
- CORS configuration

## 📝 Database Models

### User Model

- username, email, password
- role (admin, editor, viewer)
- isActive, lastLogin

### Lead Model

- firstName, lastName, email, phone, message
- source, status, priority
- assignedTo, notes, contactedAt

### Hero Section Model

- title, subtitle, description
- buttonText, buttonLink, backgroundImage
- isActive, displayOrder

## 🚀 Next Steps

1. Set up frontend admin panel
2. Add content management endpoints
3. Implement file upload functionality
4. Add email notifications
5. Deploy to production

## 📞 Support

For any issues or questions, please contact the development team.
