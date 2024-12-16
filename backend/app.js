const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies or Authorization headers
}));

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
