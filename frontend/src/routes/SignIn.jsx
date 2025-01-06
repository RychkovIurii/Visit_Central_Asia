import React, { useState } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
/* import heroImage from '../assets/hero2.jpeg'; */
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import '../components/SignInStyles.css';


function SignIn() {
	const heroImage = "https://res.cloudinary.com/dilugzsoa/image/upload/tours/heroSearch.jpg";
	const [isLogin, setIsLogin] = useState(true); // State to toggle forms
	
	const toggleForm = () => setIsLogin(!isLogin); // Toggle between login and registration

	return (
		<>
			<Navbar />
			<Hero
				cName="heroSignIn"
				heroImage={heroImage}
			/>
			{isLogin ? <Login onToggleForm={toggleForm} /> : <Register onToggleForm={toggleForm} />}
			<Footer />
		</>
	);
}

export default SignIn;
