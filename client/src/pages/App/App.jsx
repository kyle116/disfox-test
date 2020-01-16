import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Services
import userService from '../../services/userService';
// Components
import Navbar from '../../components/Navbar/Navbar';
// Pages
import SignupPage from '../SignupPage/SignupPage';
import SigninPage from '../SigninPage/SigninPage';
import LandingPage from '../LandingPage/LandingPage';
// Stylesheets
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: userService.getCurrentUser()
    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.removeCurrentUser = this.removeCurrentUser.bind(this);
  }
  setCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  removeCurrentUser() {
    userService.clearToken();
    this.setState({
      currentUser: null
    });
  }

  render() {
  return (
    <Router>
      <Navbar currentUser={this.state.currentUser} removeCurrentUser={this.removeCurrentUser} />
      <div className="App">
        <Route 
          exact path='/' 
          render={(props) => <LandingPage {...props} currentUser={this.state.currentUser} />}
        />
        <Route
          exact path='/signup'
          render={(props) => <SignupPage {...props} setCurrentUser={this.setCurrentUser} />}
        />
        <Route
          exact path='/signin'
          render={(props) => <SigninPage {...props} setCurrentUser={this.setCurrentUser} />}
        />
      </div>
    </Router>
  );
  }
}

export default App;