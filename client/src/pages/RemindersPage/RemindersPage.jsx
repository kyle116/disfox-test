import React, { Component } from 'react';
// Services
import reminderService from '../../services/reminderService';
import userService from '../../services/userService';
// Stylesheets
import './RemindersPage.css';

class RemindersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  reminders: [],
      currentUser: userService.getCurrentUser(),
      errorMsg: ''
		}
    this.getReminders = this.getReminders.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
	}
  componentDidMount() {
    this.getReminders(this.props.match.params.userId);
  }

  getReminders(userId) {
    reminderService.getReminders(userId).then(reminders => {
      this.setState({
        reminders: reminders
      });
    })
    .catch(err => console.error(err));
  }

  async deleteReminder(reminderId) {
    try {
      const deletedReminder = await reminderService.deleteReminder(reminderId, this.state.currentUser._id);
      
      reminderService.getReminders(this.state.currentUser._id).then(reminders => {
        this.setState({
          reminders: reminders
        });
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h2>Your Reminders</h2>
        <table className="table table-striped table-hover mx-auto w-auto">
          <thead>
            <tr>
              <th scope="col">Reminder</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reminders && this.state.reminders.map((reminder, idx) => {
              return (
                <tr className={`table-${idx % 2 === 0 ? 'secondary' : 'primary'}`} key={idx}>
                  <th scope="row">{reminder.title}</th>
                  <td>{reminder.reminderDate}</td>
                  <td>{reminder.reminderDate}</td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => this.deleteReminder(reminder._id)}>Delete Reminder</button>
                  </td>
                </tr>)
            })}
          </tbody>
        </table> 
      </div>
    )
  }
}

export default RemindersPage;