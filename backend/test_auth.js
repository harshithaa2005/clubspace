const axios = require('axios');

async function testAuth() {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test Auto',
      email: 'auto@test.com',
      password: 'password123'
    });
    console.log('Register Success:', res.data);
  } catch (err) {
    console.error('Register failed:', err.response?.data || err.message);
  }
}

testAuth();
