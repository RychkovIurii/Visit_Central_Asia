const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
