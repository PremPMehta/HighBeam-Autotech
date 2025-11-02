#!/bin/bash

echo "🚀 Starting Highbeam Autotech Admin System..."
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Start Backend
echo "🔧 Starting Backend Server..."
cd backend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Server Configuration
PORT=5000
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
EOF
    echo "✅ .env file created"
fi

# Start backend server
echo "🚀 Starting backend server on port 5000..."
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 5

# Test backend API
echo "🧪 Testing backend API..."
node test-api.js

echo ""
echo "🎉 Backend is running successfully!"
echo "📊 Backend API: http://localhost:5000"
echo "🔍 Health Check: http://localhost:5000/api/health"
echo ""

# Start Admin Panel
echo "🎨 Starting Admin Panel..."
cd ../admin-panel

# Install admin panel dependencies
echo "📦 Installing admin panel dependencies..."
npm install

# Start admin panel
echo "🚀 Starting admin panel on port 3000..."
npm start &
ADMIN_PID=$!

echo ""
echo "🎉 System is starting up!"
echo "=============================================="
echo "📊 Backend API: http://localhost:5000"
echo "🎨 Admin Panel: http://localhost:3000"
echo "🔐 Admin Login: http://localhost:3000/login"
echo ""
echo "💡 To stop the system, press Ctrl+C"
echo ""

# Wait for user to stop
wait
