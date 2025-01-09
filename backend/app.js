const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB();

const app = express();


// Remove CORS for production!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow only specific frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies or Authorization headers
}));

app.use(express.json());
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingAndPaymentRoutes');


app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/uploads', uploadRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
