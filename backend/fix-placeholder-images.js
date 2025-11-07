require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function fixPlaceholderImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');

    // Remove placeholder image URLs and set to empty string
    const result = await Product.updateMany(
      { image: { $regex: 'via.placeholder.com' } },
      { $set: { image: '' } }
    );

    console.log(`✅ Updated ${result.modifiedCount} products with placeholder images`);
    console.log(`   Products now have empty image field (will show icon instead)`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixPlaceholderImages();

