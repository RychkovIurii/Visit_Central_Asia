const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register a new admin
router.post('/register', adminAuth, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, password: hashedPassword });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login an admin
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,           // Prevent access by JavaScript
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'Strict',       // CSRF protection
            maxAge: 1 * 60 * 60 * 1000 // 1 hour
        });
        res.json({ message: 'Admin login successful', admin: { id: admin._id, name: admin.name, email: admin.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected route: Manage users (dummy example)
router.get('/manage-users', adminAuth, (req, res) => {
    res.json({ message: 'Admin access granted', admin: req.admin });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Strict' });
    res.json({ message: 'Admin logged out successfully' });
});

module.exports = router;
