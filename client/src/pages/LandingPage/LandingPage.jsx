import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Pages
import SignupPage from '../SignupPage/SignupPage';
// Stylesheets
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<h1>Welcome</h1>
				<Link to={'/signup'}>Sign Up Link</Link>
			</div>
		);
	}
}

export default LandingPage;