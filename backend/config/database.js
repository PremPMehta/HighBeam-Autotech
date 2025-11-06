const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect with longer timeout to ensure connection
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds - give more time
      socketTimeoutMS: 10000, // 10 seconds
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('⚠️  Server will continue but database operations may fail');
    console.error('💡 To fix: Check MongoDB Atlas Network Access and whitelist your IP');
    throw error; // Re-throw so caller knows connection failed
  }
};

module.exports = connectDB;
