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
		  },
      errorMsg: ''
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
		if(!this.validateEmail(signupData.email)) return;
    var signinCredentials = {};
		try {
		  const signupUser = await userService.signupUser(signupData);
      signinCredentials = {
        email: signupUser.email,
        password: this.state.signupData.password
      }
		} catch(error) {
		  console.error('signup', error);
		}

    try {
      const signinUser = await userService.signinUser(signinCredentials);
      // Signin, sets current user to state, then sets App.js state with currentUser to use globally as props
        this.setState({
          currentUser: signinUser
        }, this.setCurrentUser);
      this.props.history.push('/');
    } catch(error) {
      console.error('signin', error);
    }
	}

  setCurrentUser() {
    this.props.setCurrentUser(this.state.currentUser);
  }

	validateEmail(email) {
		if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      this.setState({
        errorMsg: 'Please enter a valid email'
      });
			return false;
		}
		return true;
	}

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        {this.state.errorMsg ? (<div>{this.state.errorMsg}</div>) : null}

        <form className="col-lg-4 offset-lg-4" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" type="text" className="form-control" value={this.state.signupData.firstName} onChange={this.handleInputChange} placeholder="First Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" type="text" className="form-control" value={this.state.signupData.lastName} onChange={this.handleInputChange} placeholder="Last Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input name="username" type="text" className="form-control" value={this.state.signupData.username} onChange={this.handleInputChange} placeholder="Username"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input name="email" className="form-control" value={this.state.signupData.email} onChange={this.handleInputChange} placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="form-control" value={this.state.signupData.password} onChange={this.handleInputChange} placeholder="Password"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
          </div>
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