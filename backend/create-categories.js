require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const connectDB = require('./config/database');

// Connect to database with longer timeout
async function init() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 30000,
    });
    console.log('✅ Connected to MongoDB');
    await createCategories();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\n💡 Solutions:');
    console.error('   1. Check your MongoDB Atlas IP whitelist');
    console.error('   2. Verify your MONGODB_URI in .env file');
    console.error('   3. Check your internet connection');
    process.exit(1);
  }
}

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

async function createCategories() {
  try {
    console.log('🔄 Creating categories...\n');

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const categoryData of categories) {
      try {
        // Check if category exists by name
        const existingCategory = await Category.findOne({ name: categoryData.name });

        if (existingCategory) {
          // Update existing category
          existingCategory.icon = categoryData.icon;
          existingCategory.description = categoryData.description;
          existingCategory.isActive = categoryData.isActive;
          existingCategory.displayOrder = categoryData.displayOrder;
          await existingCategory.save();
          console.log(`✅ Updated: ${categoryData.name}`);
          updated++;
        } else {
          // Create new category
          await Category.create(categoryData);
          console.log(`✅ Created: ${categoryData.name}`);
          created++;
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⏭️  Skipped (duplicate): ${categoryData.name}`);
          skipped++;
        } else {
          console.error(`❌ Error with ${categoryData.name}:`, error.message);
        }
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total: ${categories.length}\n`);

    // Display all categories
    const allCategories = await Category.find().sort({ displayOrder: 1 });
    console.log('📋 All Categories in Database:');
    allCategories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (Icon: ${cat.icon}, Order: ${cat.displayOrder})`);
    });

    console.log('\n✨ Categories setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating categories:', error);
    process.exit(1);
  }
}

// Initialize and run
init();

