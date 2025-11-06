require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function diagnose() {
  console.log('🔍 DIAGNOSING CATEGORIES ISSUE\n');
  console.log('='.repeat(50));
  
  // Step 1: Check .env file
  console.log('\n1️⃣ Checking Environment Variables:');
  if (!process.env.MONGODB_URI) {
    console.log('   ❌ MONGODB_URI is NOT set in .env file');
    console.log('   💡 Create a .env file in backend folder with:');
    console.log('      MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
    console.log('\n   ⚠️  This is why categories are not appearing!');
    console.log('   ⚠️  The server is running but cannot connect to MongoDB');
    return;
  } else {
    console.log('   ✅ MONGODB_URI is set');
    // Mask the password for security
    const maskedUri = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':***@');
    console.log(`   📝 URI: ${maskedUri}`);
  }
  
  // Step 2: Test MongoDB Connection
  console.log('\n2️⃣ Testing MongoDB Connection:');
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    console.log('   ✅ Successfully connected to MongoDB');
    console.log(`   📍 Host: ${conn.connection.host}`);
    console.log(`   📊 Database: ${conn.connection.name}`);
    
    // Step 3: Check if categories exist
    console.log('\n3️⃣ Checking Categories in Database:');
    const categoryCount = await Category.countDocuments();
    console.log(`   📊 Total categories found: ${categoryCount}`);
    
    if (categoryCount === 0) {
      console.log('   ❌ NO CATEGORIES FOUND IN DATABASE');
      console.log('   💡 This is why admin panel shows "No categories found"');
      console.log('\n   🔧 SOLUTION: Run this command to create categories:');
      console.log('      node create-categories.js');
    } else {
      console.log('   ✅ Categories exist in database');
      const categories = await Category.find().sort({ displayOrder: 1 }).limit(5);
      console.log('\n   📋 Sample categories:');
      categories.forEach((cat, index) => {
        console.log(`      ${index + 1}. ${cat.name} (Order: ${cat.displayOrder}, Active: ${cat.isActive})`);
      });
    }
    
    // Step 4: Check connection state (what server sees)
    console.log('\n4️⃣ MongoDB Connection State Check:');
    const readyState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    console.log(`   📍 Connection state: ${readyState} (${states[readyState]})`);
    
    if (readyState === 1) {
      console.log('   ✅ Server can query database');
    } else {
      console.log('   ❌ Server CANNOT query database');
      console.log('   💡 Restart your backend server after fixing MongoDB connection');
    }
    
    await mongoose.disconnect();
    
    console.log('\n' + '='.repeat(50));
    console.log('\n📋 SUMMARY:');
    if (categoryCount === 0) {
      console.log('   ❌ Categories do not exist in database');
      console.log('   ✅ MongoDB connection works');
      console.log('   🔧 ACTION: Run "node create-categories.js"');
    } else {
      console.log('   ✅ Categories exist in database');
      console.log('   ✅ MongoDB connection works');
      console.log('   💡 If admin panel still shows empty:');
      console.log('      1. Check if you are logged in (check browser console)');
      console.log('      2. Check if backend server is running on port 5000');
      console.log('      3. Check browser Network tab for API errors');
    }
    
  } catch (error) {
    console.log('   ❌ FAILED to connect to MongoDB');
    console.log(`   Error: ${error.message}`);
    console.log('\n   💡 COMMON FIXES:');
    console.log('      1. Check MongoDB Atlas Network Access - whitelist your IP');
    console.log('      2. Verify your MONGODB_URI is correct in .env file');
    console.log('      3. Check your internet connection');
    console.log('      4. Make sure MongoDB Atlas cluster is running');
    console.log('\n   ⚠️  This is why categories are not appearing!');
    console.log('   ⚠️  Server cannot connect to database to fetch categories');
  }
}

diagnose();

