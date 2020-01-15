import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Services
import userService from '../../services/userService';
// Stylesheets
import './Navbar.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
      currentUser: userService.getCurrentUser()
		}    
    this.setCurrentUser = this.setCurrentUser.bind(this);
	}

  setCurrentUser() {
    this.props.setCurrentUser(this.state.currentUser);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <a className="navbar-brand" href="#">Navbar</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarColor02">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item">
			        <Link className="nav-link" to={'/'}>Home</Link>
			      </li>
			      <li className="nav-item">
			      	<Link className="nav-link" to={'/signup'}>Sign Up</Link>
			      </li>
			      <li className="nav-item">
			        <Link className="nav-link" to={'/signin'}>Sign In</Link>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link" href="#">About</a>
			      </li>
			    </ul>
			  </div>
			</nav>
    )
  }
}

export default Navbar;