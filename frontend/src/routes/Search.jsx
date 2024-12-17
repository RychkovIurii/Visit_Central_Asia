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
			const response = await fetch(`/api/destinations?search=${query}`);
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
					placeholder="Search destinations..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="search-input"
				/>
				<button onClick={handleSearch} className="search-button">Search</button>
				<div className="results">
					{results.map((item) => (
						<div key={item.id} className="result-item">{item.name}</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Search;
