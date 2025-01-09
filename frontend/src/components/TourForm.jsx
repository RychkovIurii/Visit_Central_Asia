import React, { useState, useEffect } from 'react';

const ReuseTourForm = () => {
	const [tours, setTours] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		startDate: '',
		endDate: '',
		images: []
	});

	// Fetch existing tours
	useEffect(() => {
		const fetchTours = async () => {
			const response = await fetch('/api/tours/reuse-tours', { credentials: 'include' });
			const data = await response.json();
			setTours(data);
		};
		fetchTours();
	}, []);

	// Select an existing tour and reuse its images
	const handleReuse = (tour) => {
		setFormData({
			...formData,
			name: tour.name,
			images: tour.images // Reuse existing image paths
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch('/api/tours/reuse', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(formData)
		});
		alert('New tour created successfully!');
	};

	return (
		<div>
			<h2>Reuse Existing Tour</h2>
			<ul>
				{tours.map((tour) => (
					<li key={tour._id}>
						{tour.name} ({tour.locationName})
						<button onClick={() => handleReuse(tour)}>Reuse</button>
					</li>
				))}
			</ul>

			<form onSubmit={handleSubmit}>
				<label>Name:</label>
				<input
					type="text"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>

				<label>Price:</label>
				<input
					type="number"
					value={formData.price}
					onChange={(e) => setFormData({ ...formData, price: e.target.value })}
					required
				/>

				<label>Start Date:</label>
				<input
					type="date"
					value={formData.startDate}
					onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
					required
				/>

				<label>End Date:</label>
				<input
					type="date"
					value={formData.endDate}
					onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
					required
				/>

				<p>Reused Images:</p>
				{formData.images.map((img, index) => (
					<img key={index} src={img} alt="tour" width="100" />
				))}

				<button type="submit">Create New Tour</button>
			</form>
		</div>
	);
};

export default ReuseTourForm;
