import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const BookingConfirmation = ({ onConfirm }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [travelers, setTravelers] = useState(1);
	const [error, setError] = useState('');

	const handleConfirm = () => {
		if (!firstName || !lastName || travelers < 1) {
			setError('Please fill in all fields and ensure the number of travelers is at least 1.');
			return;
		}
		setError('');
		onConfirm({ firstName, lastName, travelers });
	};

	return (
		<div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
			<Typography variant="h5">Booking Confirmation</Typography>
			<TextField
				label="First Name"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Last Name"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Number of Travelers"
				type="number"
				value={travelers}
				onChange={(e) => setTravelers(Number(e.target.value))}
				fullWidth
				margin="normal"
				inputProps={{ min: 1 }}
			/>
			{error && <Typography color="error">{error}</Typography>}
			<Button
				variant="contained"
				color="primary"
				onClick={handleConfirm}
				style={{ marginTop: '1rem' }}
			>
				Confirm and Proceed to Payment
			</Button>
		</div>
	);
};

export default BookingConfirmation;
