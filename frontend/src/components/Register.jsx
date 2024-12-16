import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { LanguageContext } from '../context/LanguageContext';
import './RegisterStyles.css';

const Register = ({ onToggleForm }) => {
	const { t } = useContext(LanguageContext); // Translation function
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
			alert(t("register.successMessage"));
			console.log('Registration successful:', response.data);
		} catch (error) {
			alert(t("register.errorMessage"));
			console.error('Error registering:', error);
		}
	};

	return (
		<div className="register-container">
			<h2 className="register-title">{t("register.title")}</h2>
			<form className="register-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<label>{t("register.usernameLabel")}</label>
					<input
						type="text"
						name="username"
						placeholder={t("register.usernamePlaceholder")}
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-group">
					<label>{t("register.emailLabel")}</label>
					<input
						type="email"
						name="email"
						placeholder={t("register.emailPlaceholder")}
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-group">
					<label>{t("register.passwordLabel")}</label>
					<input
						type="password"
						name="password"
						placeholder={t("register.passwordPlaceholder")}
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className="submit-button">
					{t("register.submitButton")}
				</button>
				<div className="register-buttons">
					<button
						type="button"
						className="secondary-button"
						onClick={onToggleForm}
					>
						{t("register.loginButton")}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
