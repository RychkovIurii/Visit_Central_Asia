import React, { useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
/* import heroImage from '../assets/hero11.jpeg'; */
import Footer from '../components/Footer';

function ThingsToDo(){
	const heroImage = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/heroThingsToDo.jpg";
	const { t } = useContext(LanguageContext);
	return(
		<>
			<Navbar/>
			<Hero
			cName = "heroToGo"
			heroImage = {heroImage}
			title = {t("hero.heroThingsToDoTitle")}
			text = {t("hero.heroThingsToDoText")}
			linkClass = "hide"
			/>
			<Footer/>
		</>
	)
}

export default ThingsToDo;
