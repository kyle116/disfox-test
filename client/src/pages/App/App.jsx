import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Pages
import SignupPage from '../SignupPage/SignupPage';
import LandingPage from '../LandingPage/LandingPage';
// Stylesheets
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
  return (
    <Router>
      <div className="App">
        <Route 
          exact path='/' 
          render={(props) => <LandingPage {...props} currentUser={this.state.currentUser} />}
        />
        <Route
          exact path='/signup'
          render={(props) => <SignupPage {...props} setCurrentUser={this.setCurrentUser} />}
        />
      </div>
    </Router>
  );
  }
}

export default App;