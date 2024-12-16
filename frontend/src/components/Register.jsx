import React, { useState } from 'react';
import API from '../api/axios';

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: ''
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post('/users/register', formData);
			console.log('Registration successful:', response.data);
		} catch (error) {
			console.error('Error registering:', error);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username:</label>
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
