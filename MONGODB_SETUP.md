# 🔧 **MONGODB ATLAS IP WHITELIST SETUP**

## ⚠️ **ISSUE: MongoDB Atlas Connection Blocked**

Your IP address is not whitelisted in MongoDB Atlas, which is why login is failing.

---

## ✅ **HOW TO FIX:**

### **Step 1: Go to MongoDB Atlas**
1. Visit: https://cloud.mongodb.com/
2. Login with your MongoDB Atlas account
3. Select your cluster: **Cluster0**

### **Step 2: Add IP to Whitelist**
1. Click on **"Network Access"** in the left sidebar
2. Click **"Add IP Address"** button
3. You have two options:

   **Option A: Add Your Current IP (Recommended)**
   - Click **"Add Current IP Address"**
   - This will automatically add your current IP
   - Click **"Confirm"**

   **Option B: Allow All IPs (For Testing Only)**
   - Enter: `0.0.0.0/0`
   - Click **"Confirm"**
   - ⚠️ **Warning**: This allows access from any IP (less secure, but easier for testing)

### **Step 3: Wait for Changes**
- Wait **1-2 minutes** for the changes to take effect
- MongoDB Atlas needs a moment to update network rules

### **Step 4: Create Admin User**
After whitelisting your IP, run:
```bash
cd backend
node create-admin.js
```

---

## 📧 **ADMIN CREDENTIALS (After Setup):**

Once you've whitelisted your IP and created the admin user:

- **Email**: `admin@highbeamautotech.com`
- **Password**: `admin123`
- **URL**: `http://localhost:3000/login`

---

## 🚀 **QUICK SETUP COMMANDS:**

```bash
# 1. Whitelist your IP in MongoDB Atlas (use web interface above)

# 2. Wait 1-2 minutes

# 3. Create admin user
cd "/Users/premmehta/Documents/Highbeam Autotech/backend"
node create-admin.js

# 4. Restart backend server
cd "/Users/premmehta/Documents/Highbeam Autotech/backend"
node server.js

# 5. Login to admin panel
# Go to: http://localhost:3000/login
# Email: admin@highbeamautotech.com
# Password: admin123
```

---

## 🎯 **ALTERNATIVE: Quick Test Setup**

If you want to test immediately without IP restrictions:

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0` (allows all IPs)
4. Wait 1-2 minutes
5. Run: `node create-admin.js`
6. Login with the credentials above

---

**After whitelisting your IP, the admin panel login will work!** ✅
