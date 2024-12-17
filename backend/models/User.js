const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user', 'admin'], default: 'user' },
	cart: [
		{
			tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
			name: String,
			price: Number,
			startDate: Date,
			endDate: Date
		}
	],
});

module.exports = mongoose.model('User', UserSchema);
