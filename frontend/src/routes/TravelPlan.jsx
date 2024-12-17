import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TravelPlanStyles.css';

const TravelPlan = () => {
	const [cart, setCart] = useState([]);

	// Example tours (replace with API calls in the future)
	const tours = [
		{ id: 1, name: 'Almaty Adventure', price: 150, date: '2024-07-15' },
		{ id: 2, name: 'Silk Road Tour', price: 250, date: '2024-08-10' },
		{ id: 3, name: 'Ala-Kul Trek', price: 200, date: '2024-09-05' },
	];

	const addToCart = (tour) => {
		setCart((prevCart) => [...prevCart, tour]);
		alert(`${tour.name} added to your travel plan!`);
	};

	const removeFromCart = (id) => {
		setCart(cart.filter((item) => item.id !== id));
	};

	return (
		<>
			<Navbar />
			<div className="travel-plan-container">
				<h1>Choose your journey</h1>
				<div className="tour-list">
					{tours.map((tour) => (
						<div key={tour.id} className="tour-item">
							<h3>{tour.name}</h3>
							<p>Price: ${tour.price}</p>
							<p>Date: {tour.date}</p>
							<button onClick={() => addToCart(tour)}>Add to Plan</button>
						</div>
					))}
				</div>
				<div className="cart-section">
					<h2>Selected Tours</h2>
					{cart.length > 0 ? (
						<ul>
							{cart.map((item) => (
								<li key={item.id}>
									{item.name} - ${item.price} - {item.date}
									<button onClick={() => removeFromCart(item.id)}>Remove</button>
								</li>
							))}
						</ul>
					) : (
						<p>No tours added yet.</p>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default TravelPlan;
