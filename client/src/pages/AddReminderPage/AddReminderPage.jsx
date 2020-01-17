import React, { Component } from 'react';
// Services
import reminderService from '../../services/reminderService';
import userService from '../../services/userService';
// Stylesheets
import './AddReminderPage.css';

class AddReminderPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  reminderData: {
        reminderTitle: '',
        date: '',
        time: '',
        userId: userService.getCurrentUser()._id
      },
      currentUser: userService.getCurrentUser(),
      reminder: '',
      errorMsg: ''
		}    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		const reminderData = this.state.reminderData;
		reminderData[name] = value;

		this.setState({reminderData});
	}

	async handleSubmit(e) {
    e.preventDefault();
    const reminderData = this.state.reminderData;

    try {
      const createdReminder = await reminderService.createReminder(reminderData);
      this.setState({
        reminder: createdReminder
      });
      this.props.history.push(`/reminders/${this.state.currentUser._id}`);
    } catch(error) {
      console.log(error);
    }
	}

  render() {
    return (
      <div>
        <h2>Create Reminder</h2>
        {this.state.errorMsg ? (<div>{this.state.errorMsg}</div>) : null}

        <form className="col-lg-4 offset-lg-4" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="reminderTitle">Reminder</label>
            <input name="reminderTitle" type="text" className="form-control" value={this.state.reminderData.reminderTitle} onChange={this.handleInputChange} placeholder="Reminder Title"/>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input name="date" type="date" className="form-control" value={this.state.reminderData.date} onChange={this.handleInputChange} placeholder="Date"/>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input name="time" type="time" className="form-control" value={this.state.reminderData.time} onChange={this.handleInputChange} placeholder="Time"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Add Reminder</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddReminderPage;