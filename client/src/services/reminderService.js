import axios from 'axios';
import userService from './userService';

class ReminderService {
  constructor() {
    // token is passed into headers to access protected routes
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    this.request = axios.create({
      baseURL: baseURL,
      headers: {
        common: {
          token: userService.getToken()
        }
      }
    });
  }

  createReminder(reminderData) {
    return this.request({method: 'POST', url: '/reminders/new', data: reminderData})
      .then((response) => response.data.reminder)
      .catch(err => console.log(err));
  }

  getReminders(userId) {
    return this.request({method: 'GET', url: `/reminders/${userId}`})
      .then((response) => response.data.reminders)
      .catch(err => console.log(err));
  }
  deleteReminder(reminderId, userId) {
    return this.request({method: 'DELETE', url: `/reminders/delete/${reminderId}/${userId}`})
      .then((response) => response.data)
      .catch(err => console.log(err));
  }
}

export default new ReminderService();