# 🚀 **HIGHBEAM AUTOTECH - COMPLETE SETUP GUIDE**

## 📋 **TABLE OF CONTENTS**

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Prerequisites](#prerequisites)
4. [Installation Steps](#installation-steps)
5. [Configuration](#configuration)
6. [Starting the System](#starting-the-system)
7. [Access Links](#access-links)
8. [Page Reference](#page-reference)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 **PROJECT OVERVIEW**

Highbeam Autotech is a complete automotive service website with three main components:

1. **Public Website** (`Garage-fe-main`) - Customer-facing React website
2. **Admin Panel** (`admin-panel`) - Content and lead management dashboard
3. **Backend API** (`backend`) - Node.js/Express REST API with MongoDB Atlas

---

## 🏗️ **SYSTEM ARCHITECTURE**

```
┌─────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                        │
│              (Garage-fe-main)                            │
│              Port: 5173                                  │
│              http://localhost:5173                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ HTTP Requests
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  BACKEND API                             │
│              (backend/)                                  │
│              Port: 5001                                  │
│              http://localhost:5001                       │
│                                                          │
│  • Authentication (JWT)                                  │
│  • Content Management                                    │
│  • Lead Management                                       │
│  • Category & Product Management                         │
│  • File Upload                                           │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ MongoDB Connection
                   │
┌──────────────────▼──────────────────────────────────────┐
│               MONGODB ATLAS                              │
│         Cloud Database                                   │
│                                                          │
│  • Users                                                 │
│  • Leads                                                 │
│  • Categories                                            │
│  • Products                                              │
│  • Page Content                                          │
└──────────────────────────────────────────────────────────┘
                   │
                   │ HTTP Requests
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  ADMIN PANEL                             │
│              (admin-panel/)                              │
│              Port: 3000                                  │
│              http://localhost:3000                       │
│                                                          │
│  • Dashboard                                             │
│  • Lead Management                                       │
│  • Content Editor                                        │
│  • Category Management                                   │
│  • Product Management                                    │
└──────────────────────────────────────────────────────────┘
```

---

## 📦 **PREREQUISITES**

Before starting, ensure you have the following installed:

### **Required Software:**

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

4. **MongoDB Atlas Account** (already configured)
   - Database: `highbeam_autotech`
   - Connection string is configured in backend `.env`

---

## 🔧 **INSTALLATION STEPS**

### **Step 1: Navigate to Project Directory**

```bash
cd "/Users/premmehta/Documents/Highbeam Autotech"
```

### **Step 2: Install Backend Dependencies**

```bash
cd backend
npm install
```

**Dependencies include:**
- Express.js (web framework)
- Mongoose (MongoDB ODM)
- JWT (authentication)
- Multer (file uploads)
- Bcryptjs (password hashing)
- And more...

### **Step 3: Install Admin Panel Dependencies**

```bash
cd ../admin-panel
npm install
```

**Dependencies include:**
- React 18
- Material-UI (MUI)
- React Router
- React Query
- Axios
- And more...

### **Step 4: Install Frontend Website Dependencies**

```bash
cd ../Garage-fe-main
npm install
```

**Dependencies include:**
- React 18
- React Router
- Bootstrap
- React Icons
- Axios
- And more...

---

## ⚙️ **CONFIGURATION**

### **Backend Configuration**

The backend requires a `.env` file in the `backend/` directory:

```bash
cd backend
```

Create or verify `.env` file contains:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://premarch567_db_user:Gza0alBBfCu28UH8@cluster0.1sv7akw.mongodb.net/highbeam_autotech?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=highbeam_autotech_super_secret_jwt_key_2024
JWT_EXPIRE=7d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=highbeamautotechpvtltd@gmail.com
EMAIL_PASS=your_app_password

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Note:** If `.env` doesn't exist, the system will create it automatically on first run.

### **Admin Panel Configuration**

The admin panel is pre-configured to connect to the backend at `http://localhost:5001`.

No additional configuration needed for local development.

### **Frontend Website Configuration**

The frontend is pre-configured. API endpoints are defined in:
- `Garage-fe-main/src/services/client.js`
- `Garage-fe-main/src/services/contentApi.js`

---

## 🚀 **STARTING THE SYSTEM**

### **Option 1: Using the Start Script (Recommended)**

```bash
cd "/Users/premmehta/Documents/Highbeam Autotech"
chmod +x start-system.sh
./start-system.sh
```

This script will:
- Check Node.js/npm installation
- Install dependencies if needed
- Start backend server
- Start admin panel
- Display all access URLs

### **Option 2: Manual Start (Three Terminal Windows)**

#### **Terminal 1 - Backend Server:**
```bash
cd "/Users/premmehta/Documents/Highbeam Autotech/backend"
npm install  # Only needed first time
npm start    # or npm run dev for auto-reload
```

#### **Terminal 2 - Admin Panel:**
```bash
cd "/Users/premmehta/Documents/Highbeam Autotech/admin-panel"
npm install  # Only needed first time
npm start
```

#### **Terminal 3 - Frontend Website:**
```bash
cd "/Users/premmehta/Documents/Highbeam Autotech/Garage-fe-main"
npm install  # Only needed first time
npm run dev
```

### **Option 3: Using NPM Scripts (if configured)**

If you have a root `package.json` with scripts, you can use:
```bash
npm run start:all
```

---

## 🔗 **ACCESS LINKS**

### **🌐 Public Website (Garage-fe-main)**

| Page | URL | Description |
|------|-----|-------------|
| **Home** | http://localhost:5173/home | Main landing page with hero sections |
| **About Us** | http://localhost:5173/about | Company story, mission, vision |
| **Services** | http://localhost:5173/service | Service details and information |
| **Contact Us** | http://localhost:5173/contact | Contact form and business details |
| **Car Repair** | http://localhost:5173/carrepair | Car repair services and products |
| **Franchise** | http://localhost:5173/franchise | Franchise opportunities |
| **Book Consultation** | http://localhost:5173/bookconsultation | Appointment booking |
| **Blog** | http://localhost:5173/blog | Company blog |
| **Career** | http://localhost:5173/career | Career opportunities |
| **Car Details** | http://localhost:5173/car-details | Vehicle details page |

**Note:** All invalid routes redirect to `/home`

---

### **🎨 Admin Panel**

| Page | URL | Description | Authentication |
|------|-----|-------------|----------------|
| **Login** | http://localhost:3000/login | Admin login page | Public |
| **Dashboard** | http://localhost:3000/dashboard | Statistics and overview | Required |
| **Leads** | http://localhost:3000/leads | Lead management | Required |
| **Content** | http://localhost:3000/content | Page content listing | Required |
| **Categories** | http://localhost:3000/categories | Category management | Required |
| **Products** | http://localhost:3000/products | Product management | Required |
| **Page Editor** | http://localhost:3000/content/edit/:pageId | Edit specific page content | Required |
| **Footer Editor** | http://localhost:3000/content/edit/footer | Edit footer content | Required |

**Login Credentials:**
- **Email:** `admin@highbeamautotech.com`
- **Password:** `admin123`

---

### **🔧 Backend API**

| Endpoint | Method | URL | Description | Auth Required |
|----------|--------|-----|-------------|---------------|
| **Health Check** | GET | http://localhost:5001/api/health | Server health status | No |
| **Login** | POST | http://localhost:5001/api/auth/login | Admin authentication | No |
| **Get Leads** | GET | http://localhost:5001/api/leads | Fetch all leads | Yes |
| **Create Lead** | POST | http://localhost:5001/api/leads | Create new lead | No (for contact form) |
| **Get Categories** | GET | http://localhost:5001/api/categories | Fetch all categories | Yes |
| **Create Category** | POST | http://localhost:5001/api/categories | Create category | Yes |
| **Get Products** | GET | http://localhost:5001/api/products | Fetch all products | Yes |
| **Upload Image** | POST | http://localhost:5001/api/upload | Upload image files | Yes |
| **Get Page Content** | GET | http://localhost:5001/api/pages/:pageId | Get page content | No |
| **Update Page Content** | PUT | http://localhost:5001/api/pages/:pageId | Update page content | Yes |

---

## 📄 **PAGE REFERENCE**

### **🔵 Public Website Pages**

#### **1. Home Page** (`/home`)
- **File:** `Garage-fe-main/src/Pages/Home/index.jsx`
- **Components Used:**
  - Hero sections (editable via admin)
  - Car repair services section
  - Core values section
  - About section
  - Footer

#### **2. About Us** (`/about`)
- **File:** `Garage-fe-main/src/Pages/AboutUs/AboutUs.jsx`
- **Components Used:**
  - AboutHeader
  - Aboutstory
  - Ourvision
  - Commitment
  - Ourteam
  - Footer

#### **3. Services** (`/service`)
- **File:** `Garage-fe-main/src/Pages/Service/Service.jsx`
- **Components Used:**
  - Service details
  - Benefits section
  - Schedule service form
  - Opening hours
  - Footer

#### **4. Contact Us** (`/contact`)
- **File:** `Garage-fe-main/src/Pages/Contactus/Contactus.jsx`
- **Components Used:**
  - ContactHeader
  - Contact form (creates leads in database)
  - Map section
  - Contact details
  - Footer

#### **5. Car Repair** (`/carrepair`)
- **File:** `Garage-fe-main/src/Pages/CarRepair/CarRepair.jsx`
- **Features:**
  - Dynamic categories (from database)
  - Dynamic products (from database)
  - Category tabs with icons
  - Product cards with images
  - Service details

#### **6. Franchise** (`/franchise`)
- **File:** `Garage-fe-main/src/Pages/Franchise/Franchise.jsx`

#### **7. Book Consultation** (`/bookconsultation`)
- **File:** `Garage-fe-main/src/Pages/BookConsultation/BookConsultation.jsx`
- **Components Used:**
  - BookHeader

#### **8. Blog** (`/blog`)
- **File:** `Garage-fe-main/src/Pages/Blog/Blog.jsx`

#### **9. Career** (`/career`)
- **File:** `Garage-fe-main/src/Pages/Career/Career.jsx`

#### **10. Car Details** (`/car-details`)
- **File:** `Garage-fe-main/src/Pages/AboutCars/AboutCars.jsx`

---

### **🟢 Admin Panel Pages**

#### **1. Login** (`/login`)
- **File:** `admin-panel/src/pages/Login.js`
- **Features:**
  - Email/password authentication
  - JWT token storage
  - Auto-redirect to dashboard on success

#### **2. Dashboard** (`/dashboard`)
- **File:** `admin-panel/src/pages/Dashboard.js`
- **Features:**
  - Total leads count
  - Recent leads (last 7 days)
  - Lead conversion statistics
  - Status breakdown charts
  - Quick action buttons

#### **3. Leads Management** (`/leads`)
- **File:** `admin-panel/src/pages/Leads.js`
- **Features:**
  - Complete lead listing with pagination
  - Search and filter functionality
  - Lead status management (new, contacted, qualified, converted, lost)
  - Priority management (low, medium, high)
  - Notes and comments system
  - Edit/Delete functionality

#### **4. Content Management** (`/content`)
- **File:** `admin-panel/src/pages/Content.js`
- **Features:**
  - List of all editable pages
  - Page status (active/inactive)
  - Quick navigation to page editors
  - Editable pages:
    - Home Page
    - About Us
    - Services
    - Contact Us
    - Footer

#### **5. Page Editor** (`/content/edit/:pageId`)
- **File:** `admin-panel/src/pages/PageEditor.js`
- **Features:**
  - Edit hero sections
  - Update text content
  - Upload/replace images
  - Toggle active/inactive status
  - Real-time preview

#### **6. Footer Editor** (`/content/edit/footer`)
- **File:** `admin-panel/src/pages/FooterPageEditor.js`
- **Features:**
  - Edit footer content
  - Update about section
  - Edit business hours
  - Update brands section
  - Copyright information

#### **7. Categories Management** (`/categories`)
- **File:** `admin-panel/src/pages/Categories.js`
- **Features:**
  - List all categories
  - Add new category
  - Edit category name and icon
  - Upload/remove category icons
  - Delete categories
  - Changes reflect on Car Repair page

#### **8. Products Management** (`/products`)
- **File:** `admin-panel/src/pages/Products.js`
- **Features:**
  - List all products
  - Add new product
  - Edit product details
  - Associate with categories
  - Upload product images
  - Delete products
  - Product fields:
    - Title
    - Description
    - Image
    - Category
    - Service points
    - Time duration

---

## 🧪 **TESTING**

### **1. Test Backend API**

```bash
# Health check
curl http://localhost:5001/api/health

# Expected response:
# {"success":true,"message":"API is running","timestamp":"..."}
```

### **2. Test Admin Login**

1. Navigate to: http://localhost:3000/login
2. Enter credentials:
   - Email: `admin@highbeamautotech.com`
   - Password: `admin123`
3. You should be redirected to dashboard

### **3. Test Contact Form Integration**

1. Navigate to: http://localhost:5173/contact
2. Fill out the contact form
3. Submit the form
4. Check admin panel → Leads section
5. New lead should appear

### **4. Test Category Management**

1. Login to admin panel
2. Go to Categories page
3. Add a new category with icon
4. Navigate to: http://localhost:5173/carrepair
5. New category should appear

### **5. Test Product Management**

1. Login to admin panel
2. Go to Products page
3. Add a new product
4. Associate with a category
5. Navigate to: http://localhost:5173/carrepair
6. New product should appear under the category

---

## 🚨 **TROUBLESHOOTING**

### **Problem: Backend won't start**

**Solution:**
```bash
cd backend
# Check if port 5001 is already in use
lsof -i :5001

# Kill process if needed
kill -9 <PID>

# Check .env file exists
ls -la .env

# Restart backend
npm start
```

### **Problem: MongoDB connection fails**

**Symptoms:**
- Error: "MongoServerError: connection timed out"
- Error: "MongoNetworkError"

**Solution:**
1. Check MongoDB Atlas IP whitelist
2. Add your current IP to allowed IPs
3. Verify `MONGODB_URI` in `.env` is correct
4. Check internet connection

**Get your IP:**
```bash
curl ifconfig.me
```

### **Problem: Admin panel shows "Error loading data"**

**Solution:**
1. Verify backend is running on port 5001
2. Check browser console for errors
3. Verify JWT token in localStorage:
   ```javascript
   localStorage.getItem('token')
   ```
4. Try logging out and logging back in

### **Problem: Frontend website won't load**

**Solution:**
```bash
cd Garage-fe-main
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### **Problem: Images not uploading**

**Solution:**
1. Check file size (max 5MB)
2. Verify file type (JPEG, PNG, GIF, WebP only)
3. Check backend `uploads/` directory exists:
   ```bash
   cd backend
   mkdir -p uploads
   ```
4. Verify file permissions

### **Problem: Changes not reflecting on public website**

**Solution:**
1. Verify backend API is returning updated data:
   ```bash
   curl http://localhost:5001/api/categories
   ```
2. Clear browser cache
3. Check frontend API configuration in `Garage-fe-main/src/services/contentApi.js`
4. Verify CORS settings in backend

### **Problem: Port already in use**

**Solution:**

**For Backend (5001):**
```bash
lsof -i :5001
kill -9 <PID>
```

**For Admin Panel (3000):**
```bash
lsof -i :3000
kill -9 <PID>
```

**For Frontend (5173):**
```bash
lsof -i :5173
kill -9 <PID>
```

---

## 📊 **DATABASE COLLECTIONS**

The MongoDB Atlas database `highbeam_autotech` contains:

1. **users** - Admin user accounts
2. **leads** - Contact form submissions
3. **categories** - Service categories (Car Repair page)
4. **products** - Products/services linked to categories
5. **pagecontents** - Editable page content
6. **herosections** - Hero section content

---

## 🔐 **SECURITY NOTES**

1. **JWT Tokens:** Stored in localStorage, expire after 7 days
2. **API Authentication:** Required for admin endpoints
3. **Rate Limiting:** 100 requests per 15 minutes per IP
4. **CORS:** Configured for localhost only in development
5. **Password Hashing:** Uses bcryptjs
6. **File Upload:** Validated by type and size

---

## 🎯 **QUICK START SUMMARY**

```bash
# 1. Install dependencies (one-time)
cd backend && npm install
cd ../admin-panel && npm install
cd ../Garage-fe-main && npm install

# 2. Start all services (in separate terminals)
cd backend && npm start              # Terminal 1
cd admin-panel && npm start          # Terminal 2
cd Garage-fe-main && npm run dev     # Terminal 3

# 3. Access services
# Admin Panel: http://localhost:3000/login
# Public Website: http://localhost:5173/home
# Backend API: http://localhost:5001/api/health
```

---

## 📞 **SUPPORT & RESOURCES**

### **Key Files Reference:**

- **Backend Server:** `backend/server.js`
- **Database Config:** `backend/config/database.js`
- **Admin Routes:** `admin-panel/src/App.js`
- **Public Routes:** `Garage-fe-main/src/Routers/allRouter.jsx`
- **API Client:** `Garage-fe-main/src/services/client.js`

### **Environment Variables:**

All sensitive configuration is in:
- `backend/.env` (create if missing)

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify:

- [ ] Backend API responds at http://localhost:5001/api/health
- [ ] Admin panel loads at http://localhost:3000
- [ ] Can login to admin panel
- [ ] Dashboard shows statistics
- [ ] Public website loads at http://localhost:5173
- [ ] Contact form creates leads
- [ ] Categories appear on Car Repair page
- [ ] Products appear on Car Repair page
- [ ] Images upload successfully
- [ ] Page content can be edited

---

**🎊 Your Highbeam Autotech system is ready to use! 🎊**

For issues or questions, refer to the troubleshooting section above or check the system logs.

