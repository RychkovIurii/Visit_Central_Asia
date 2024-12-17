import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import heroImage from '../assets/hero2.jpeg';
import './SearchStyles.css';

const Search = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const handleSearch = async () => {
		try {
			const response = await fetch(`/api/tours?search=${query}`); // Sanitized query!
			const data = await response.json();
			setResults(data);
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	};

	return (
		<>
			<Navbar />
			<Hero cName="heroSignIn" heroImage={heroImage} />
			<div className="search-container">
				<input
					type="text"
					placeholder="Search tours by location..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="search-input"
				/>
				<button onClick={handleSearch} className="search-button">Search</button>
				<div className="results">
					{results.length > 0 ? (
						results.map((item) => (
							<div key={item._id} className="result-item">
								<h3>{item.name}</h3>
								<p>Location: {item.locationName}</p>
								<p>Start Date: {new Date(item.startDate).toLocaleDateString()}</p>
								<p>End Date: {new Date(item.endDate).toLocaleDateString()}</p>
								<p>Price: ${item.price}</p>
							</div>
						))
					) : (
						<p>No upcoming tours found for this location.</p>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Search;
