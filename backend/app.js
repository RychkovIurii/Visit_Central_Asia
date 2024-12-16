const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();


// Remove CORS for production!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies or Authorization headers
}));

app.use(express.json());
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
