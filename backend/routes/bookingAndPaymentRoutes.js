const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

router.post('/', async (req, res) => {
	try {
		const { userId, tourId, paymentMethod, amount, startDate, endDate } = req.body;

		// Calculate the total amount (if necessary)
		const totalAmount = Math.round(amount * 100); // Stripe requires amount in cents

		// Create a payment intent using Stripe
		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalAmount,
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
		});

		// Save the booking in the database
		const booking = new Booking({
			userId,
			tourId,
			price: amount,
			startDate,
			endDate,
		});
		await booking.save();

		// Save the payment details in the database
		const payment = new Payment({
			userId,
			bookingId: booking._id,
			amount,
			paymentMethod,
			status: 'pending', // Status will update after payment confirmation
			stripePaymentIntentId: paymentIntent.id, // Save Stripe Payment Intent ID
		});
		await payment.save();

		// Respond with the client secret for Stripe payment confirmation
		res.status(201).json({ clientSecret: paymentIntent.client_secret, booking, payment });
	} catch (error) {
		console.error('Error processing booking:', error.message);
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;

