const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
	translations: {
        en: {
            name: { type: String, required: true },
			locationName: { type: String, required: true }, // e.g., "Almaty, Kazakhstan"
            description: { type: String, required: true }
        },
        it: {
            name: { type: String },
			locationName: { type: String },
            description: { type: String }
        },
        fi: {
            name: { type: String },
			locationName: { type: String },
            description: { type: String }
        },
        ru: {
            name: { type: String },
			locationName: { type: String },
            description: { type: String }
        }
    },
	locationId: { type: String, required: true }, // Unique ID for the location
	price: { type: Number, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	availableSpots: { type: Number, default: 20 },
	images: [String]
});

// Add indexing for optimized search by locationName and startDate
TourSchema.index({ locationName: 1, startDate: 1 });

module.exports = mongoose.model('Tour', TourSchema);
