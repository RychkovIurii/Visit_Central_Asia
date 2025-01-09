const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');

const router = express.Router();

// Configure Multer to store file in memory before uploading to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to Upload Image
router.post('/upload', upload.single('image'), async (req, res) => {
	try {
		// Convert image buffer to Cloudinary format
		const result = await cloudinary.uploader.upload_stream(
			{ folder: 'tours', resource_type: 'image' },
			(error, result) => {
				if (error) {
					console.error('Error uploading to Cloudinary:', error);
					return res.status(500).json({ message: 'Image upload failed', error: error.message });
				}
				res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url });
			}
		).end(req.file.buffer); // Stream the file buffer to Cloudinary
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message });
	}
});

module.exports = router;
