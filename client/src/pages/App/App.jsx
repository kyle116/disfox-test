import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Services
import userService from '../../services/userService';
// Components
import Navbar from '../../components/Navbar/Navbar';
// Pages
import SignupPage from '../SignupPage/SignupPage';
import SigninPage from '../SigninPage/SigninPage';
import LandingPage from '../LandingPage/LandingPage';
import AddReminderPage from '../AddReminderPage/AddReminderPage';
import RemindersPage from '../RemindersPage/RemindersPage';
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
  // Set and remove current user are passed into appropriate components where applicable
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
        <Switch>
          <Route
            exact path='/reminders/new'
            render={(props) => <AddReminderPage {...props} currentUser={this.state.currentUser} />}
          />
          <Route
            exact path='/reminders/:userId'
            render={(props) => <RemindersPage {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
  }
}

export default App;