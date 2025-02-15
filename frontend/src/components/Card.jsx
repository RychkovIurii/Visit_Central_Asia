import React, { useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import "./CardStyles.css";
import CardItems from './CardItems';
/* import cardImage6 from '../assets/card6.jpg';
import cardImage5 from '../assets/card5.jpg';
import cardImage4 from '../assets/card4.jpg';
import cardImage3 from '../assets/card3.jpg';
import cardImage2 from '../assets/card2.jpg';
import cardImage1 from '../assets/card1.jpg'; */

const Card = () => {
	const { t } = useContext(LanguageContext);
	const cardImage6 = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/turkestan1.jpg";
	const cardImage5 = "https://res.cloudinary.com/dilugzsoa/image/upload/v1735299164/tours/kolsay1.jpg";
	const cardImage4 = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/furmanov1.jpg";
	const cardImage3 = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/kel-suu1.jpg";
	const cardImage2 = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/nomadgames1.jpg";
	const cardImage1 = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/grigoriev1.jpg";
	return(
		<div className="card">
			<h1>{t("card.H1")}</h1>
			<p>{t("card.P")}</p>
			<div className='setOf3cards'>
				<CardItems 
				title = {t("card.Title1")}
				text = {t("card.Text1")}
				img = {cardImage1}
				/>
				<CardItems 
				title = {t("card.Title2")}
				text = {t("card.Text2")}
				img = {cardImage2}
				/>
				<CardItems 
				title = {t("card.Title3")}
				text = {t("card.Text3")}
				img = {cardImage3}
				/>
			</div>
			<div className='setOf3cards'>
				<CardItems 
				title = {t("card.Title4")}
				text = {t("card.Text4")}
				img = {cardImage4}
				/>
				<CardItems 
				title = {t("card.Title5")}
				text = {t("card.Text5")}
				img = {cardImage5}
				/>
				<CardItems 
				title = {t("card.Title6")}
				text = {t("card.Text6")}
				img = {cardImage6}
				/>
			</div>
		</div>
	)
}


export default Card;
