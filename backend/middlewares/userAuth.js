const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
	const token = req.cookies.token; // Get token from cookies

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized: No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
		const user = await User.findById(decoded.id); // Find user by decoded ID

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		req.user = user; // Attach user info to the request
		next(); // Proceed to the next middleware
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: 'Unauthorized: Invalid token' });
	}
};

module.exports = userAuth;
