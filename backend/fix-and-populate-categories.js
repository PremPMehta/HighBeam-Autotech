require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Category = require('./models/Category');

const categories = [
  {
    name: 'Periodic Services',
    icon: 'FaCar',
    description: 'Regular maintenance services for your vehicle',
    isActive: true,
    displayOrder: 1
  },
  {
    name: 'AC Service & Repair',
    icon: 'FaSnowflake',
    description: 'Air conditioning service and repair',
    isActive: true,
    displayOrder: 2
  },
  {
    name: 'Batteries',
    icon: 'FaBatteryFull',
    description: 'Car battery replacement and service',
    isActive: true,
    displayOrder: 3
  },
  {
    name: 'Tyres & Wheel Care',
    icon: 'FaDotCircle',
    description: 'Tyre replacement and wheel alignment',
    isActive: true,
    displayOrder: 4
  },
  {
    name: 'Denting & Painting',
    icon: 'FaPaintRoller',
    description: 'Body denting and painting services',
    isActive: true,
    displayOrder: 5
  },
  {
    name: 'Detailing Services',
    icon: 'FaTools',
    description: 'Professional car detailing services',
    isActive: true,
    displayOrder: 6
  },
  {
    name: 'Car Spa & Cleaning',
    icon: 'FaSoap',
    description: 'Complete car spa and cleaning services',
    isActive: true,
    displayOrder: 7
  },
  {
    name: 'Car Inspections',
    icon: 'FaClipboardList',
    description: 'Comprehensive vehicle inspection services',
    isActive: true,
    displayOrder: 8
  },
  {
    name: 'Windshields & Lights',
    icon: 'FaLightbulb',
    description: 'Windshield and lighting repair',
    isActive: true,
    displayOrder: 9
  },
  {
    name: 'Suspension & Fitments',
    icon: 'FaWrench',
    description: 'Suspension repair and fitments',
    isActive: true,
    displayOrder: 10
  },
  {
    name: 'Clutch & Body Parts',
    icon: 'FaCogs',
    description: 'Clutch and body parts replacement',
    isActive: true,
    displayOrder: 11
  },
  {
    name: 'Insurance Claims',
    icon: 'FaShieldAlt',
    description: 'Assistance with insurance claims',
    isActive: true,
    displayOrder: 12
  },
  {
    name: 'SOS Service',
    icon: 'FaUserClock',
    description: 'Emergency roadside assistance',
    isActive: true,
    displayOrder: 13
  }
];

async function fixAndPopulate() {
  console.log('🔧 FIXING AND POPULATING CATEGORIES\n');
  console.log('='.repeat(60));
  
  // Step 1: Check/Create .env file
  console.log('\n1️⃣ Checking .env file...');
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('   ⚠️  .env file does NOT exist!');
    console.log('   📝 Creating .env file template...');
    
    const envTemplate = `# MongoDB Connection String
# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Port
PORT=5000

# JWT Secret (change this to a random string)
JWT_SECRET=your-secret-key-change-this-in-production
`;
    
    fs.writeFileSync(envPath, envTemplate);
    console.log('   ✅ Created .env file template');
    console.log('\n   ⚠️  IMPORTANT: You must edit .env file and add your MongoDB connection string!');
    console.log('   📝 Steps:');
    console.log('      1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
    console.log('      2. Click "Connect" on your cluster');
    console.log('      3. Choose "Connect your application"');
    console.log('      4. Copy the connection string');
    console.log('      5. Replace <password> with your actual password');
    console.log('      6. Paste it in .env file as MONGODB_URI');
    console.log('      7. Run this script again\n');
    
    console.log('   💡 Also make sure to whitelist your IP in MongoDB Atlas Network Access');
    return;
  } else {
    console.log('   ✅ .env file exists');
  }
  
  // Step 2: Check MONGODB_URI
  console.log('\n2️⃣ Checking MONGODB_URI...');
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('mongodb+srv://username:password')) {
    console.log('   ❌ MONGODB_URI is not set or is using template value');
    console.log('   💡 Edit .env file and add your actual MongoDB connection string');
    return;
  } else {
    console.log('   ✅ MONGODB_URI is set');
    const maskedUri = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':***@');
    console.log(`   📝 URI: ${maskedUri}`);
  }
  
  // Step 3: Connect to MongoDB
  console.log('\n3️⃣ Connecting to MongoDB...');
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 15000,
    });
    console.log('   ✅ Successfully connected to MongoDB');
    console.log(`   📍 Host: ${conn.connection.host}`);
    console.log(`   📊 Database: ${conn.connection.name}`);
    
    // Step 4: Check existing categories
    console.log('\n4️⃣ Checking existing categories...');
    const existingCount = await Category.countDocuments();
    console.log(`   📊 Found ${existingCount} existing categories`);
    
    // Step 5: Create/Update categories
    console.log('\n5️⃣ Creating/Updating categories...');
    let created = 0;
    let updated = 0;
    let errors = 0;
    
    for (const categoryData of categories) {
      try {
        const existing = await Category.findOne({ name: categoryData.name });
        
        if (existing) {
          // Update existing
          existing.icon = categoryData.icon;
          existing.description = categoryData.description;
          existing.isActive = categoryData.isActive;
          existing.displayOrder = categoryData.displayOrder;
          await existing.save();
          console.log(`   ✅ Updated: ${categoryData.name}`);
          updated++;
        } else {
          // Create new
          await Category.create(categoryData);
          console.log(`   ✅ Created: ${categoryData.name}`);
          created++;
        }
      } catch (error) {
        console.error(`   ❌ Error with ${categoryData.name}:`, error.message);
        errors++;
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${categories.length}`);
    
    // Step 6: Verify categories
    console.log('\n6️⃣ Verifying categories...');
    const finalCount = await Category.countDocuments();
    console.log(`   📊 Total categories in database: ${finalCount}`);
    
    if (finalCount > 0) {
      const sampleCategories = await Category.find().sort({ displayOrder: 1 }).limit(5);
      console.log('\n   📋 Sample categories:');
      sampleCategories.forEach((cat, index) => {
        console.log(`      ${index + 1}. ${cat.name} (Order: ${cat.displayOrder})`);
      });
    }
    
    await mongoose.disconnect();
    
    console.log('\n' + '='.repeat(60));
    console.log('\n✅ SUCCESS! Categories are now in the database!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Make sure your backend server is running (npm start)');
    console.log('   2. Restart backend server if it was already running');
    console.log('   3. Go to admin panel and refresh the Categories page');
    console.log('   4. You should now see all 13 categories!');
    console.log('\n✨ Done!');
    
  } catch (error) {
    console.log('   ❌ FAILED to connect to MongoDB');
    console.log(`   Error: ${error.message}`);
    console.log('\n💡 COMMON FIXES:');
    console.log('   1. Check MongoDB Atlas Network Access - whitelist your IP (0.0.0.0/0 for testing)');
    console.log('   2. Verify your MONGODB_URI is correct in .env file');
    console.log('   3. Make sure you replaced <password> with actual password');
    console.log('   4. Check your internet connection');
    console.log('   5. Make sure MongoDB Atlas cluster is running');
    console.log('\n⚠️  Categories will NOT appear in admin panel until MongoDB is connected!');
  }
}

fixAndPopulate();

