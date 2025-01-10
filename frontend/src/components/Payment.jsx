import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ userData, cart }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/complete', // Replace with your success page
            },
        });

        if (error) {
            console.error('Payment Error:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || !elements}
                style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '0.8rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Pay Now
            </button>
        </form>
    );
};

const Payment = ({ userData, cart }) => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/bookings`, {
                    userData,
                    cart,
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error creating payment intent:', error.message);
            }
        };

        createPaymentIntent();
    }, [userData, cart]);

    if (!clientSecret) return <p>Loading...</p>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm userData={userData} cart={cart} />
        </Elements>
    );
};

export default Payment;
