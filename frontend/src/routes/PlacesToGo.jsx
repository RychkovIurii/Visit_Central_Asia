import React, { useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
/* import heroImage from '../assets/hero8.jpeg'; */
import Footer from '../components/Footer';

function PlacesToGo(){
	const { t } = useContext(LanguageContext);
	const heroImage = "https://res.cloudinary.com/dilugzsoa/image/upload/v1735299197/tours/heroPlaceToGo.jpg";
	return(
		<>
			<Navbar/>
			<Hero
			cName = "heroToGo"
			heroImage = {heroImage}
			title = {t("hero.heroPlacesToGoTitle")}
			text = {t("hero.heroPlacesToGoText")}
			linkClass = "hide"
			/>
			<Footer/>
		</>
	)
}

export default PlacesToGo;
