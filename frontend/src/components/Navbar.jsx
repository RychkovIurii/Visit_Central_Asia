import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import "./NavbarStyles.css";
import logo from "../images/logo_visit.png";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { AuthContext } from '../context/AuthContext';

export default class Navbar extends Component {
	static contextType = LanguageContext;
	state = { clicked: false, isScrolled: false };

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (window.scrollY > 0) {
			this.setState({ isScrolled: true });
		} else {
			this.setState({ isScrolled: false });
		}
	}
	handleClick = () => {
		this.setState({ clicked: !this.state.clicked });
	}
	render() {
		const { clicked, isScrolled } = this.state;
		const { t, language, updateLanguage } = this.context;
		return (
			<AuthContext.Consumer>
				{({ isAuthenticated, logout }) => (
					<nav className={`NavbarItems ${isScrolled ? 'scrolled' : ''}`}>
						<Link className="navbar-logo" to="/">
							<img src={logo} width={100} height={100} alt="logo" />
							Visit Central Asia
						</Link>
						<div className="menu-icons" onClick={this.handleClick}>
							<i className={clicked ? "fas fa-times" : "fa-solid fa-bars"}></i>
						</div>
						<ul className={clicked ? "nav-menu active" : "nav-menu"}>
							{MenuItems.map((item, index) => (
								<li key={index}>
									<Link className={item.cName} to={item.url}>
										{t(`navbar.${item.id}`)}
									</Link>
								</li>
							))}
							<li>
								{isAuthenticated ? (
									<Link className="nav-links" to="/logout" onClick={logout}>
									{t("navbar.logout")}
									</Link>
								) : (
									<Link className="nav-links" to="/sign-in">
										{t("navbar.signIn")}
									</Link>
								)}
							</li>
							<li className='language'>
								<i className="fa-solid fa-globe"></i>
								<select value={language} onChange={(e) => updateLanguage(e.target.value)}>
									<option value="en">EN</option>
									<option value="it">IT</option>
									<option value="fi">FI</option>
									<option value="ru">RU</option>
								</select>
							</li>
						</ul>
					</nav>
				)}
			</AuthContext.Consumer>
		);
	}
}
