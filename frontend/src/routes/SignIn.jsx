import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import heroImage from '../assets/hero-sign-in.jpg';
import Login from '../components/Login';
import Footer from '../components/Footer';
import { LanguageContext } from "../context/LanguageContext";



function SignIn(){
	const { t } = useContext(LanguageContext);
	return(
		<>
			<Navbar/>
			<Hero
			cName = "heroToGo"
			heroImage = {heroImage}
			title = {t("hero.heroPlacesToGoTitle")}
			text = {t("hero.heroPlacesToGoText")}
			/>
			<Login/>
			<Footer/>
		</>
	)
}

export default SignIn;
