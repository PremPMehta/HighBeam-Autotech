const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect with shorter timeout to not block server startup
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds - don't wait too long
      socketTimeoutMS: 5000, // 5 seconds
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed (using development bypass):', error.message);
    console.warn('⚠️ Server will continue - login will use development bypass');
    console.warn('⚠️ To fix: Whitelist your IP in MongoDB Atlas Network Access');
    // Don't exit - allow server to continue but database operations will fail gracefully
    // Login will use development bypass
  }
};

module.exports = connectDB;
