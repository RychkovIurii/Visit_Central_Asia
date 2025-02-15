import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
/* import heroImage from '../assets/hero1.jpeg'; */
import Destination from '../components/Destination';
import Footer from '../components/Footer';
import { LanguageContext } from "../context/LanguageContext";
import Card from '../components/Card';


function Home(){
	const { t } = useContext(LanguageContext);
	const heroImage = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/heroHome.jpg";
	return(
		<>
			<Navbar/>
			<Hero
			cName = "hero"
			heroImage = {heroImage}
			title = {t("hero.heroHomeTitle")}
			text = {t("hero.heroHomeText")}
			linkText = {t("hero.heroHomeLinkText")}
			linkClass = "show"
			url = "/travel-plan"
			/>
			<Destination/>
			<Card/>
			<Footer/>
		</>
	)
}

export default Home;
