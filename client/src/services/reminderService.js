import axios from 'axios';
import jwtDecode from 'jwt-decode';

class ReminderService {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {}
    });
  }

  createReminder(reminderData) {
    return this.request({method: 'POST', url: '/reminders/new', data: reminderData})
      .then((response) => response.data.reminder);
  }

  signinUser(signinCredentials) {
    return this.request({method: 'POST', url: '/reminders/signin', data: signinCredentials})
      .then((response) => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token);
        } else {
          return response.data
        }
      });
  }
}

export default new ReminderService();