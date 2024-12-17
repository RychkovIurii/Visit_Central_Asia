import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import './FooterStyles.css';

const Weather = () => {
	const [weatherData, setWeatherData] = useState([]);
	const { t } = useContext(LanguageContext);
	const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Access API key from .env

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const responseAlmaty = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Almaty&appid=${API_KEY}&units=metric`);
				const dataAlmaty = await responseAlmaty.json();
				
				const responseTashkent = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${API_KEY}&units=metric`);
				const dataTashkent = await responseTashkent.json();
				
				const responseBishkek = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Bishkek&appid=${API_KEY}&units=metric`);
				const dataBishkek = await responseBishkek.json();

				setWeatherData([
					{ city: 'Almaty', temperature: dataAlmaty.main.temp },
					{ city: 'Tashkent', temperature: dataTashkent.main.temp },
					{ city: 'Bishkek', temperature: dataBishkek.main.temp }
				]);
			} catch (error) {
				console.error('Error loading weather data:', error);
			}
		};

		fetchWeatherData();
	}, [API_KEY]);

	return (
		<div className='weather'>
			<h4>{t("footer.weather")}</h4>
			<ul>
				{weatherData.map((cityData, index) => (
					<li key={index}>
						{cityData.city}: {cityData.temperature}°C
					</li>
				))}
			</ul>
		</div>
	);
};

export default Weather;
