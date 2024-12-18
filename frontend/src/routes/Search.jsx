import React, { useState, useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import heroImage from '../assets/hero2.jpeg';
import './SearchStyles.css';

const Search = () => {
	const { t } = useContext(LanguageContext);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const handleSearch = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tours?location=${query}`); //Sanitaze query
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
					placeholder={t("search.searchPlaceholder")}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="search-input"
				/>
				<button onClick={handleSearch} className="search-button">{t("search.submitButton")}</button>
				<div className="results">
					{results.length > 0 ? (
						results.map((item, index) => (
							<div key={item._id || index} className="result-item">
								<h3>{item.name}</h3>
								<p>{t("search.location")}: {item.locationName}</p>
								<p>{t("search.startDate")}: {new Date(item.startDate).toLocaleDateString()}</p>
								<p>{t("search.endDate")}: {new Date(item.endDate).toLocaleDateString()}</p>
								<p>{t("search.price")}: ${item.price}</p>
							</div>
						))
					) : query ? (
						<p>{t("search.noFoundMessage")}</p>
					) : null}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Search;
