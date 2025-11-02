const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test API endpoints
async function testAPI() {
  console.log('🧪 Testing Highbeam Autotech Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Create a test lead
    console.log('2. Testing Lead Creation...');
    const leadData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      message: 'I need car service for my Honda Civic',
      source: 'contact_form'
    };

    const leadResponse = await axios.post(`${BASE_URL}/leads`, leadData);
    console.log('✅ Lead Created:', leadResponse.data);
    console.log('');

    // Test 3: Get all leads
    console.log('3. Testing Lead Retrieval...');
    const leadsResponse = await axios.get(`${BASE_URL}/leads`);
    console.log('✅ Leads Retrieved:', leadsResponse.data.data.leads.length, 'leads found');
    console.log('');

    // Test 4: Get lead statistics
    console.log('4. Testing Lead Statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/leads/stats`);
    console.log('✅ Lead Statistics:', statsResponse.data.data);
    console.log('');

    console.log('🎉 All API tests passed successfully!');
    console.log('✅ Backend is working correctly with MongoDB Atlas');

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
    console.log('\n💡 Make sure the backend server is running:');
    console.log('   cd backend && npm install && npm run dev');
  }
}

// Run the tests
testAPI();
