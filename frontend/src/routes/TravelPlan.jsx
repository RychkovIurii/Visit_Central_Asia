import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LanguageContext } from "../context/LanguageContext";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import CardItems from '../components/CardItems';
import BookingConfirmation from '../components/BookingConfirmation';
import Footer from '../components/Footer';
import './TravelPlanStyles.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// Think about implementetion Stepper MUI component for the travel plan
// https://mui.com/components/steppers/
// date picker for the date of the tour
// Think about implenting mui alert
// https://mui.com/components/alert/

const steps = ['Select Tours', 'Review Cart', 'Confirm Booking', 'Payment'];


const TravelPlan = () => {
	const heroImage = "https://res.cloudinary.com/dilugzsoa/image/upload/v1735299197/tours/heroSearch.jpg";
	const { t, language } = useContext(LanguageContext);
	const [tours, setTours] = useState([]);
	const [cart, setCart] = useState([]);
	const [activeStep, setActiveStep] = useState(0);
	const [userData, setUserData] = useState(null);

	// Fetch tours from the backend
	useEffect(() => {
		const fetchTours = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tours/upcoming`); // Backend API endpoint
				setTours(response.data);
			} catch (error) {
				console.error('Error fetching tours:', error);
			}
		};

		fetchTours();
	}, []);

	const addToCart = (tour) => {
		setCart((prevCart) => {
			if (prevCart.find((item) => item._id === tour._id)) {
				alert(`${tour.translations[language]?.name || tour.translations.en.name} is already in your travel plan!`);
				return prevCart; // Return the existing cart without changes
			}
			return [...prevCart, tour]; // Add the tour to the cart if not already present
		});
	};

	const removeFromCart = (id) => {
		setCart(cart.filter((item) => item._id !== id));
	}

	const isStepFailed = (step) => {
		return step === 1 && cart.length === 0; // If cart is empty, mark step 1 as failed
	};

    const handleNext = () => {
        if ((activeStep === 1 && cart.length === 0) || (activeStep === 2 && cart.length === 0)) {
            alert(t("travelPlan.cartEmptyError", "Your cart is empty! Add tours before proceeding."));
            return; // Prevent moving to the next step if cart is empty
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleBookingConfirm = (data) => {
		setUserData(data); // Save user data
		handleNext(); // Navigate to the Payment step
	};

	return (
		<>
			<Navbar />
			<Hero cName="heroSignIn" heroImage={heroImage} />
			<div className="travel-plan-container">
				<h1>Choose Your Journey</h1>
				{/* <Stepper activeStep={activeStep} sx={{ margin: '4rem' }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper> */}
				<Stepper activeStep={activeStep} sx={{ margin: '4rem' }}>
					{steps.map((label, index) => {
						// Define labelProps
						const labelProps = {};
						// Check if the step should show an error
						if (isStepFailed(index)) {
							labelProps.optional = (
								<Typography variant="caption" color="error">
									Cart is empty
								</Typography>
							);
							labelProps.error = true;
						}

						return (
							<Step key={label}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
                {activeStep === 0 && (
				<>
					
					<div className="tour-list">
						{tours.map((tour) => (
							<div key={tour._id} className="tour-item">
								<CardItems
									title={tour.translations[language]?.name || tour.translations.en.name}
									text={tour.translations[language]?.description || tour.translations.en.description}
									img={`https://res.cloudinary.com/dilugzsoa/image/upload${tour.images[0]}`}
								>
									<div className="additional-info">
										<p><strong>Price:</strong> ${tour.price}</p>
										<p>
											<strong>Dates:</strong> {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
										</p>
									</div>
									<button onClick={() => addToCart(tour)}>{t("travelPlan.addToPlan", "Add to Plan")}</button>
								</CardItems>
							</div>
						))}
					</div>
				</>
				)}
                {activeStep === 1 && (
				<div className="cart-section">
					<h2>Selected Tours</h2>
					{cart.length > 0 ? (
						<ul>
							{cart.map((item) => (
								<li key={item._id}>
									{item.translations[language]?.name || item.translations.en.name} - ${item.price} (
									{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()})
									<button onClick={() => removeFromCart(item._id)}>{t("travelPlan.remove", "Remove")}</button>
								</li>
							))}
						</ul>
					) : (
						<p>No tours added yet.</p>
					)}
				</div>
			)}
			{activeStep === 2 && (
				<div className="confirmation">
					<h2>{t("travelPlan.confirmationTitle", "Confirm Your Booking")}</h2>
					<p>{t("travelPlan.confirmationMessage", "Your travel plan is ready. Please confirm to proceed.")}</p>
					<BookingConfirmation onConfirm={handleBookingConfirm} />
				</div>
			)}
			{activeStep === 3 && (
				<div>
					<Typography variant="h5">Payment</Typography>
					<p>Proceed to integrate a payment system like Stripe here.</p>
					{/* Payment Integration Goes Here */}
				</div>
			)}
			{/* Static Cart Icon */}
            <div className="cart-icon-container">
                <button className="cart-icon" onClick={() => setActiveStep(1)}>
                    🛒
                    {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                </button>
            </div>
			<div className="stepper-buttons">
					<Button disabled={activeStep === 0} onClick={handleBack}>
						Back
					</Button>
					<Button variant="contained" onClick={handleNext} disabled={activeStep === 2}>
						{activeStep === steps.length - 1 ? 'Reset' : 'Next'}
					</Button>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default TravelPlan;
