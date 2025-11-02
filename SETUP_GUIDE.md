# 🚀 **HIGHBEAM AUTOTECH ADMIN SYSTEM - SETUP GUIDE**

## 📋 **SYSTEM OVERVIEW**

I've successfully created a complete dynamic content management system for your Highbeam Autotech website with:

✅ **Backend API** (Node.js + Express + MongoDB Atlas)  
✅ **Admin Panel** (React + Material-UI)  
✅ **Lead Management System**  
✅ **Authentication System**  
✅ **Content Management**

---

## 🗂️ **PROJECT STRUCTURE**

```
Highbeam Autotech/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── controllers/    # API Controllers
│   │   ├── models/         # MongoDB Models
│   │   ├── routes/         # API Routes
│   │   ├── middleware/     # Auth & Validation
│   │   └── config/         # Database Config
│   ├── package.json
│   ├── server.js
│   └── test-api.js
├── admin-panel/            # React Admin Panel
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Admin Pages
│   │   ├── contexts/        # Auth Context
│   │   └── App.js
│   ├── package.json
│   └── public/
├── Garage-fe-main/         # Your existing website
└── start-system.sh         # Quick start script
```

---

## 🚀 **QUICK START (RECOMMENDED)**

### **Option 1: Automated Setup**

```bash
# Navigate to project directory
cd "/Users/premmehta/Documents/Highbeam Autotech"

# Run the automated setup script
./start-system.sh
```

This will:

- Install all dependencies
- Start the backend server
- Test the API connection
- Start the admin panel
- Open both services

---

## 🛠️ **MANUAL SETUP**

### **Step 1: Start Backend Server**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created with your MongoDB credentials)
# The .env file contains your MongoDB Atlas connection string

# Start the backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### **Step 2: Start Admin Panel**

```bash
# Open new terminal and navigate to admin panel
cd admin-panel

# Install dependencies
npm install

# Start the admin panel
npm start
```

**Admin Panel will run on:** `http://localhost:3000`

---

## 🔐 **ADMIN ACCESS**

### **Login Credentials**

You'll need to create an admin user first. Here's how:

1. **Create Admin User via API:**

```bash
# Test the backend first
cd backend
node test-api.js
```

2. **Register Admin User:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@highbeamautotech.com",
    "password": "admin123",
    "role": "admin"
  }'
```

3. **Login to Admin Panel:**
   - Go to: `http://localhost:3000/login`
   - Email: `admin@highbeamautotech.com`
   - Password: `admin123`

---

## 📊 **FEATURES AVAILABLE**

### **Dashboard (`/dashboard`)**

- Lead statistics overview
- Recent leads display
- Status breakdown charts
- Quick action buttons

### **Leads Management (`/leads`)**

- View all contact form submissions
- Search and filter leads
- Update lead status and priority
- Add notes to leads
- Export lead data

### **Content Management (`/content`)**

- Edit hero section content
- Manage website text
- Toggle content active/inactive
- Rich text editing

---

## 🔌 **API ENDPOINTS**

### **Authentication**

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### **Lead Management**

- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead (from contact form)
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `GET /api/leads/stats` - Get lead statistics

### **Health Check**

- `GET /api/health` - API health status

---

## 🗄️ **DATABASE CONNECTION**

Your MongoDB Atlas database is already configured with:

- **Database**: `highbeam_autotech`
- **Collections**: `users`, `leads`, `herosections`
- **Connection**: Secure connection with your credentials

---

## 🎯 **NEXT STEPS**

### **Immediate Actions:**

1. **Start the system** using the quick start script
2. **Create an admin user** via the API
3. **Login to admin panel** and explore features
4. **Test lead management** by submitting contact forms

### **Integration with Existing Website:**

1. **Update contact form** to send data to new API
2. **Replace hardcoded content** with dynamic content
3. **Add content management** for all website sections

---

## 🚨 **TROUBLESHOOTING**

### **Backend Issues:**

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check MongoDB connection
cd backend && node test-api.js
```

### **Admin Panel Issues:**

```bash
# Check if admin panel is running
curl http://localhost:3000

# Clear browser cache and cookies
```

### **Database Issues:**

- Verify MongoDB Atlas connection string
- Check network connectivity
- Ensure database user has proper permissions

---

## 📞 **SUPPORT**

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all services are running on correct ports
3. Ensure MongoDB Atlas is accessible
4. Check firewall settings

---

## 🎉 **SUCCESS INDICATORS**

You'll know everything is working when:

- ✅ Backend API responds at `http://localhost:5000/api/health`
- ✅ Admin panel loads at `http://localhost:3000`
- ✅ You can login to admin panel
- ✅ Dashboard shows lead statistics
- ✅ You can view and manage leads

---

**Ready to start? Run the quick start script and begin managing your website content dynamically!** 🚀
