import React, { Component } from 'react';
import { bool } from 'prop-types';
// Services
import userService from '../../services/userService';
// Stylesheets
import './SignupPage.css';

class SignupPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  signupData: {
		    firstName: '',
		    lastName: '',
		    username: '',
		    email: '',
		    password: ''
		  }
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		const signupData = this.state.signupData;
		signupData[name] = value;

		this.setState({signupData});
	}

	async handleSubmit(e) {
		e.preventDefault();
		const signupData = this.state.signupData;
		// Checks to ensure there is both email and password
		if(!signupData.hasOwnProperty('email') || !signupData.hasOwnProperty('password')) return console.error('User signup failed');
		// Checks for valid email
		// if(!this.validateEmail(signupData.email)) return;
		try {
		  const createUser = await userService.createUser(signupData);
		} catch(error) {
		  console.error(error);
		}
	}

	validateEmail(email) {
		if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			return false;
		}
		return true;
	}

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              name="firstName"
              type="text"
              value={this.state.signupData.firstName}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Last Name:
            <input
              name="lastName"
              type="text"
              value={this.state.signupData.lastName}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.signupData.username}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={this.state.signupData.email}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.signupData.password}
              onChange={this.handleInputChange} />
          </label>
          <button>Create User</button>
        </form>
      </div>
    )
  }
}

SignupPage.defaultProps = {
};

SignupPage.propTypes = {
};

export default SignupPage;