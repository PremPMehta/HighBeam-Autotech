require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Check if admin user exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { email: 'admin@highbeamautotech.com' },
        { username: 'admin' }
      ] 
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Username:', existingAdmin.username);
      console.log('\n📧 Login Credentials:');
      console.log('Email: admin@highbeamautotech.com');
      console.log('Password: admin123');
      await mongoose.connection.close();
      return;
    }

    // Create new admin user
    console.log('Creating admin user...');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@highbeamautotech.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('Email: admin@highbeamautotech.com');
    console.log('Password: admin123');
    console.log('\n🎉 You can now login to the admin panel!');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('buffering') || error.message.includes('timeout')) {
      console.error('\n🔧 MongoDB Connection Issue:');
      console.error('1. Check if your IP is whitelisted in MongoDB Atlas');
      console.error('2. Go to MongoDB Atlas → Network Access → Add your IP');
      console.error('3. Or add 0.0.0.0/0 to allow all IPs (for testing only)');
      console.error('4. Wait 1-2 minutes after adding IP to take effect');
    }
    
    process.exit(1);
  }
}

createAdmin();
