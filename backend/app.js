const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
/* const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes); */

module.exports = app;
