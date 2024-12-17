const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const adminAuth = require('../middlewares/adminAuth'); // Import adminAuth middleware


// Fetch all tours (Admin only)
router.get('/reuse-tours', adminAuth, async (req, res) => {
	try {
		const tours = await Tour.find({}, 'name locationName description images'); // Select only reusable fields
		res.status(200).json(tours);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching tours', error: error.message });
	}
});

// Admin creates a new tour (reuse existing data)
router.post('/tours/reuse', adminAuth, async (req, res) => {
	try {
		const { name, locationId, locationName, description, images, price, startDate, endDate, availableSpots } = req.body;

		// Validate required fields
		if (!price || !startDate || !endDate) {
			return res.status(400).json({ message: 'Price, start date, and end date are required' });
		}

		// Create a new tour based on reused details
		const newTour = new Tour({
			name,
			locationId,
			locationName,
			description,
			images,
			price,
			startDate,
			endDate,
			availableSpots: availableSpots || 20
		});

		await newTour.save();
		res.status(201).json({ message: 'New tour created successfully', tour: newTour });
	} catch (error) {
		res.status(500).json({ message: 'Error creating tour', error: error.message });
	}
});

// Admin only: Add a new tour
router.post('/tours', adminAuth, async (req, res) => {
	try {
		const newTour = new Tour(req.body);
		await newTour.save();
		res.status(201).json(newTour);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Admin only: Update a tour
router.put('/tours/:id', adminAuth, async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!tour) {
			return res.status(404).json({ message: 'Tour not found' });
		}
		res.json(tour);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Admin only: Delete a tour
router.delete('/tours/:id', adminAuth, async (req, res) => {
	try {
		const tour = await Tour.findByIdAndDelete(req.params.id);
		if (!tour) {
			return res.status(404).json({ message: 'Tour not found' });
		}
		res.json({ message: 'Tour deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Fetch upcoming tours by location (Public route)
router.get('/', async (req, res) => {
	const { language = 'en', location } = req.query;
	console.log("Query Parameter - Location:", location);

	try {
		const filters = {
			startDate: { $gte: new Date() } // Upcoming tours
		};

		if (location) {
			filters['$or'] = [
				{ 'translations.en.locationName': { $regex: location, $options: 'i' } }, // Match in locationName
				{ 'translations.en.name': { $regex: location, $options: 'i' } },        // Match in name
				{ 'translations.en.description': { $regex: location, $options: 'i' } } // Match in description
			];
		}

		const tours = await Tour.find(filters).sort({ startDate: 1 }).limit(10); // Sort by earliest date and limit to 10 results
		const translatedTours = tours.map((tour) => ({
            name: tour.translations[language]?.name || tour.translations['en'].name,
			locationName: tour.translations[language]?.locationName || tour.translations['en'].locationName,
            description: tour.translations[language]?.description || tour.translations['en'].description,
            price: tour.price,
            startDate: tour.startDate,
            endDate: tour.endDate,
            images: tour.images
		}));
		res.status(200).json(translatedTours);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


module.exports = router;
