require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

async function testConnection() {
  console.log('🔍 Testing API Connection...\n');
  
  try {
    // 1. Check MongoDB Connection
    console.log('1️⃣ Checking MongoDB Connection...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    console.log('   ✅ MongoDB Connected');
    console.log(`   📊 Database: ${mongoose.connection.name}`);
    console.log(`   🔌 Connection State: ${mongoose.connection.readyState} (1 = connected)\n`);

    // 2. Check Categories
    console.log('2️⃣ Checking Categories...');
    const categoryCount = await Category.countDocuments();
    console.log(`   📊 Total Categories: ${categoryCount}`);
    if (categoryCount > 0) {
      const sampleCategory = await Category.findOne();
      console.log(`   ✅ Sample Category: ${sampleCategory.name} (ID: ${sampleCategory._id})`);
    }
    console.log('');

    // 3. Check Products
    console.log('3️⃣ Checking Products...');
    const productCount = await Product.countDocuments();
    console.log(`   📊 Total Products: ${productCount}`);
    if (productCount > 0) {
      const sampleProduct = await Product.findOne().populate('category', 'name');
      console.log(`   ✅ Sample Product: ${sampleProduct.name}`);
      console.log(`   📦 Category: ${sampleProduct.category?.name || 'No category'}`);
    }
    console.log('');

    // 4. Test Query (like the API does)
    console.log('4️⃣ Testing API Query...');
    const products = await Product.find()
      .populate('category', 'name slug displayOrder')
      .sort({ displayOrder: 1, name: 1 })
      .limit(5);
    console.log(`   📊 Found ${products.length} products in query`);
    if (products.length > 0) {
      console.log('   ✅ Query successful!');
      console.log(`   📦 First product: ${products[0].name} (Category: ${products[0].category?.name || 'None'})`);
    }
    console.log('');

    // 5. Test Categories Query
    console.log('5️⃣ Testing Categories Query...');
    const categories = await Category.find()
      .sort({ displayOrder: 1, name: 1 })
      .limit(5);
    console.log(`   📊 Found ${categories.length} categories in query`);
    if (categories.length > 0) {
      console.log('   ✅ Query successful!');
      console.log(`   📦 First category: ${categories[0].name}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Possible issues:');
    console.error('   1. MongoDB connection failed - check MONGODB_URI in .env');
    console.error('   2. MongoDB Atlas IP whitelist - add your IP');
    console.error('   3. Network connection issues');
    process.exit(1);
  }
}

testConnection();

