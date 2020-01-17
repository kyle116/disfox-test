import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Stylesheets
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
		// A user logs in
		if(!prevState.currentUser && nextProps.currentUser) {
			return { currentUser: nextProps.currentUser };
		}
		// A user logs out
		if(prevState.currentUser && !nextProps.currentUser) {
			return { currentUser: nextProps.currentUser };
		}
	  else return null; // Triggers no change in the state
	}

	render() {
		return (
			<div className="container-fluid">
			  <div className="row no-gutter">
			    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
			    <div className="col-md-8 col-lg-6">
			      <div className="login d-flex align-items-center py-5">
			        <div className="container">
			          <div className="row">
			            <div className="col-md-9 col-lg-8 mx-auto">
			              <h3 className="login-heading mb-4">Welcome!</h3>
			              {!this.state.currentUser ? (
			              	<React.Fragment>
				                <Link to={'/signup'}>
				                	<button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign Up</button>
				                </Link>
				                <Link to={'/signin'}>
				                	<button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
				                </Link>
			                </React.Fragment>
		                ) : (
		                	<React.Fragment>
			                	<Link to={`/reminders/${this.state.currentUser._id}`}>
				                	<button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Reminders</button>
				                </Link>
				                <Link to={'/reminders/new'}>
				                	<button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Add Reminders</button>
				                </Link>
			                </React.Fragment>
		                )}
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

export default LandingPage;