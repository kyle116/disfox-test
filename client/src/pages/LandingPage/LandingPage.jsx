import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
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

				<h3>
					<Link to={'/signin'}>Sign In Link</Link>
				</h3>
			</div>
		);
	}
}

export default LandingPage;