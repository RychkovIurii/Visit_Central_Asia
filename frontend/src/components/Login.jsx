import React, { useState } from 'react';
import API from '../api/axios';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post('/users/login', formData);
			alert('Login successful!');
			console.log(response.data);

			// Save token to localStorage
			localStorage.setItem('token', response.data.token);
		} catch (error) {
			if (error.response) {
				console.error(error.response.data);
				alert(error.response.data.message || 'Login failed!');
			} else {
				console.error('Error:', error.message);
				alert('Login failed! Server is unreachable.');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
				required
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
