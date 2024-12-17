const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

router.post('/bookings', async (req, res) => {
	try {
		const { userId, tourId, paymentMethod, amount } = req.body;

		// Save the booking
		const booking = new Booking({ userId, tourId, price: amount, startDate: req.body.startDate, endDate: req.body.endDate });
		await booking.save();

		// Save the payment
		const payment = new Payment({ userId, bookingId: booking._id, amount, paymentMethod, status: 'completed' });
		await payment.save();

		res.status(201).json({ booking, payment });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
