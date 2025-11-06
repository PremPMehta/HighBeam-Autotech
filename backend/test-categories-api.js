require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function testAPI() {
  console.log('🧪 Testing Categories API Connection\n');
  console.log('='.repeat(50));
  
  try {
    // Connect to MongoDB
    console.log('\n1️⃣ Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    console.log('   ✅ Connected to MongoDB');
    console.log(`   📍 Host: ${conn.connection.host}`);
    console.log(`   📊 Database: ${conn.connection.name}`);
    
    // Check connection state
    console.log('\n2️⃣ Checking Connection State...');
    const readyState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    console.log(`   📍 State: ${readyState} (${states[readyState]})`);
    
    // Query categories (like the API does)
    console.log('\n3️⃣ Querying Categories (like API does)...');
    const categories = await Category.find().sort({ displayOrder: 1, name: 1 }).maxTimeMS(3000);
    console.log(`   ✅ Found ${categories.length} categories`);
    
    if (categories.length > 0) {
      console.log('\n   📋 Categories:');
      categories.forEach((cat, index) => {
        console.log(`      ${index + 1}. ${cat.name} (ID: ${cat._id})`);
      });
      
      // Test API response format
      console.log('\n4️⃣ Testing API Response Format...');
      const apiResponse = {
        success: true,
        data: { categories }
      };
      console.log('   ✅ API would return:');
      console.log(`      success: ${apiResponse.success}`);
      console.log(`      categories count: ${apiResponse.data.categories.length}`);
      
    } else {
      console.log('   ❌ No categories found!');
      console.log('   💡 Run: node create-categories.js');
    }
    
    await mongoose.disconnect();
    
    console.log('\n' + '='.repeat(50));
    console.log('\n✅ Test Complete!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Restart your backend server: npm start');
    console.log('   2. Check server console for "✅ MongoDB Connected" message');
    console.log('   3. Open admin panel and check Categories page');
    console.log('   4. Open browser console (F12) and check Network tab');
    console.log('   5. Look for /api/categories request - should return 200 OK');
    
  } catch (error) {
    console.log('   ❌ Test Failed:');
    console.log(`   Error: ${error.message}`);
    console.log('\n💡 Make sure MongoDB connection string is correct in .env file');
  }
}

testAPI();

