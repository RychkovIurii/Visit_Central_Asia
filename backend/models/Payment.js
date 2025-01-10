const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
	amount: { type: Number, required: true },
	paymentMethod: { type: String, required: true },
	status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
	stripePaymentIntentId: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
