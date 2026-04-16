const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Establish connection to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Atlas connection established successfully');
    
    // Seed default admin account
    const adminExists = await User.findOne({ email: 'admin@clubspace.com' });
    if(!adminExists) {
      const admin = new User({
        name: 'Super Admin',
        email: 'admin@clubspace.com',
        password: 'password', // will be hashed by pre-save hook
        role: 'admin'
      });
      await admin.save();
      console.log('Default Admin Account Created -> admin@clubspace.com : password');
    }
  })
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('ClubSpace API is running');
});

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
