const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

router.post('/', async (req, res) => {
	try {
		const { userData, cart } = req.body;

		// Validate the request body
		if (!userData || !cart || cart.length === 0) {
			return res.status(400).json({ message: 'Invalid request. Missing userData or cart.' });
		}

		// Extract details from the first item in the cart (assuming single booking per request)
		const { _id: tourId, price: amount, startDate, endDate } = cart[0];

		// Calculate the total amount (Stripe requires cents)
		const totalAmount = Math.round(amount * 100);
		if (isNaN(totalAmount)) {
			return res.status(400).json({ message: 'Invalid amount value. Must be a number.' });
		}

		// Create a payment intent using Stripe
		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalAmount,
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
		});

		// Save the booking in the database
		const booking = new Booking({
			userId: userData.firstName + ' ' + userData.lastName, // Save user info (modify as needed)
			tourId,
			price: amount,
			startDate,
			endDate,
		});
		await booking.save();

		// Save the payment details in the database
		const payment = new Payment({
			userId: userData.firstName + ' ' + userData.lastName, // Modify this if userId is available
			bookingId: booking._id,
			amount,
			paymentMethod: 'card',
			status: 'pending',
			stripePaymentIntentId: paymentIntent.id,
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

