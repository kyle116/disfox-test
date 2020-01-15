import React, { Component } from 'react';
// Services
import userService from '../../services/userService';
// Stylesheets
import './SigninPage.css';

class SigninPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  signinData: {
        signin: '',
        password: ''
      },
      currentUser: userService.getCurrentUser(),
      errorMsg: ''
		}    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const signinData = this.state.signinData;
		signinData[name] = value;

		this.setState({signinData});
	}

	async handleSubmit(e) {
    e.preventDefault();
    const signinData = this.state.signinData;
    var signinCredentials;
    signinCredentials = {
      email: signinData.signin.includes('@') ? signinData.signin : '',
      username: !signinData.signin.includes('@') ? signinData.signin : '',
      password: signinData.password
    }
    console.log(signinCredentials);

    try {
      const signinUser = await userService.signinUser(signinCredentials);
      console.log(signinUser);
      // Signin, sets current user to state, then sets App.js state with currentUser to use globally as props
      this.setState({
        currentUser: signinUser
      }, this.setCurrentUser);
      this.props.history.push('/');
    } catch(error) {
      console.log(error);
    }
	}

  setCurrentUser() {
    this.props.setCurrentUser(this.state.currentUser);
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        {this.state.errorMsg ? (<div>{this.state.errorMsg}</div>) : null}

        {this.state.currentUser ? (<h2>Already Signed In</h2>) : null}

        <form className="col-lg-4 offset-lg-4" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="signin">Username or Email</label>
            <input name="signin" type="text" className="form-control" value={this.state.signinData.signin} onChange={this.handleInputChange} placeholder="Username or Email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="form-control" value={this.state.signinData.password} onChange={this.handleInputChange} placeholder="Password"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SigninPage;