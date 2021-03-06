import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Stylesheets
import './Navbar.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
      currentUser: this.props.currentUser
		}    
    this.removeCurrentUser = this.removeCurrentUser.bind(this);
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

  removeCurrentUser() {
    this.props.removeCurrentUser(this.state.currentUser);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <Link className="navbar-brand" to={'/'}>Disfox</Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarColor02">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item">
			        <Link className="nav-link" to={'/'}>Home</Link>
			      </li>
			      {!this.state.currentUser ? (
							<React.Fragment>
				      	<li className="nav-item">
					      	<Link className="nav-link" to={'/signup'}>Sign Up</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to={'/signin'}>Sign In</Link>
					      </li>
				      </React.Fragment>
			      ) : (
				      <React.Fragment>
					      <li className="nav-item">
					        <Link className="nav-link" to={`/reminders/${this.state.currentUser._id}`}>Reminders</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to={'/reminders/new'}>Add Reminders</Link>
					      </li>
				      </React.Fragment>
			      )}
			    </ul>

			    {this.state.currentUser && 
						<ul className="navbar-nav ml-auto">
						  <li className="nav-item">
						  	<Link className="nav-link" to={'/'} onClick={this.removeCurrentUser}>Sign Out</Link>
						  </li>
						</ul>
					}
			  </div>
			</nav>
    )
  }
}

export default Navbar;