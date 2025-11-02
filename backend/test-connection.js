require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB Atlas connection...');
    console.log('📍 Your current IP should be whitelisted in MongoDB Atlas\n');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });

    console.log('✅ SUCCESS! Connected to MongoDB Atlas!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}\n`);
    console.log('🎉 You can now login to the admin panel!\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log('❌ CONNECTION FAILED!\n');
    console.log('Error:', error.message);
    console.log('\n📋 TO FIX THIS:\n');
    console.log('1. Go to: https://cloud.mongodb.com/');
    console.log('2. Click "Network Access" (left sidebar)');
    console.log('3. Click "Add IP Address"');
    console.log('4. Click "Add Current IP Address" (or enter: 0.0.0.0/0 for testing)');
    console.log('5. Wait 1-2 minutes for changes to take effect');
    console.log('6. Run this script again to verify\n');
    console.log('📍 Your current IP: 42.104.160.22');
    console.log('   (This IP needs to be whitelisted)\n');
    
    process.exit(1);
  }
}

testConnection();

