# Categories API Setup Guide

This guide will help you connect the frontend categories to the admin panel and populate the database.

## Current Setup Status

✅ **Backend API Routes**: Already configured at `/api/categories`  
✅ **Admin Panel**: Already configured to fetch from `/api/categories`  
✅ **Frontend**: Already configured to fetch from `/api/categories/public`  
✅ **Category Model**: Already defined in the database schema

## Step-by-Step Setup

### Step 1: Ensure Backend Server is Running

1. Navigate to the backend folder:
```bash
cd backend
```

2. Make sure you have a `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-secret-key-here
```

3. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server should start on `http://localhost:5000`

### Step 2: Populate Database with Categories

Run the script to create all 13 categories in your database:

```bash
cd backend
node create-categories.js
```

This will create the following categories:
1. Periodic Services
2. AC Service & Repair
3. Batteries
4. Tyres & Wheel Care
5. Denting & Painting
6. Detailing Services
7. Car Spa & Cleaning
8. Car Inspections
9. Windshields & Lights
10. Suspension & Fitments
11. Clutch & Body Parts
12. Insurance Claims
13. SOS Service

**Expected Output:**
```
✅ Connected to MongoDB
🔄 Creating categories...
✅ Created: Periodic Services
✅ Created: AC Service & Repair
...
📊 Summary:
   Created: 13
   Updated: 0
   Skipped: 0
   Total: 13
```

### Step 3: Verify Setup

Run the verification script to check if everything is set up correctly:

```bash
cd backend
node verify-categories-setup.js
```

This will check:
- ✅ Environment variables are set
- ✅ Database connection is working
- ✅ Categories exist in the database

### Step 4: Start Admin Panel

1. Navigate to the admin panel folder:
```bash
cd admin-panel
```

2. Start the admin panel:
```bash
npm start
```

3. Make sure you're logged in to the admin panel (authentication is required)

4. Navigate to the Categories page (`/categories`)

### Step 5: Verify Categories Appear in Admin Panel

Once you're logged in and on the Categories page:
- ✅ All 13 categories should appear in the table
- ✅ Each category should show: Image, Name, Icon, Description, Display Order, Status
- ✅ You should be able to Edit or Delete categories

## API Endpoints

### Admin Panel (Requires Authentication)
- **GET** `/api/categories` - Get all categories (requires auth token)
- **POST** `/api/categories` - Create new category (requires auth token)
- **PUT** `/api/categories/:id` - Update category (requires auth token)
- **DELETE** `/api/categories/:id` - Delete category (requires auth token)

### Frontend (Public)
- **GET** `/api/categories/public` - Get all active categories (no auth required)
- **GET** `/api/categories/public/:id` - Get single category (no auth required)

## Troubleshooting

### Issue: "No categories found" in Admin Panel

**Solution:**
1. Check if backend server is running on port 5000
2. Verify you're logged in (check browser console for auth token)
3. Run `node create-categories.js` to populate the database
4. Check browser console for any API errors

### Issue: "MongoDB connection error"

**Solution:**
1. Verify your `.env` file has `MONGODB_URI` set correctly
2. Check MongoDB Atlas Network Access - ensure your IP is whitelisted
3. Verify your MongoDB connection string is correct

### Issue: "401 Unauthorized" error

**Solution:**
1. Make sure you're logged in to the admin panel
2. Check browser localStorage for the `token` key
3. If token is expired, log out and log back in
4. Check browser console for authentication errors

### Issue: Categories not appearing after creation

**Solution:**
1. Refresh the admin panel page
2. Check browser console for API response
3. Verify the API response format matches what the component expects
4. Check if categories are actually in the database using MongoDB Compass or Atlas

## Testing the API

You can test the API endpoints directly using curl or Postman:

### Test Public Endpoint (No Auth Required):
```bash
curl http://localhost:5000/api/categories/public
```

### Test Admin Endpoint (Auth Required):
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/api/categories
```

## Next Steps

Once categories are visible in the admin panel:
1. ✅ You can edit categories (name, description, icon, display order)
2. ✅ You can add new categories using the "Add Category" button
3. ✅ You can delete categories
4. ✅ Categories will automatically sync with the frontend via `/api/categories/public`

## Summary

The complete flow is:
1. **Database** → Stores categories (MongoDB)
2. **Backend API** → Serves categories via REST endpoints
3. **Admin Panel** → Fetches categories from `/api/categories` (requires auth)
4. **Frontend** → Fetches categories from `/api/categories/public` (no auth)

All components are already connected - you just need to:
1. ✅ Ensure MongoDB is connected
2. ✅ Run `create-categories.js` to populate the database
3. ✅ Start both backend and admin panel servers
4. ✅ Log in to admin panel and view categories

