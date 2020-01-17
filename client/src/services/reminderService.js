import axios from 'axios';

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

  getReminders(userId) {
    return this.request({method: 'GET', url: `/reminders/${userId}`})
      .then((response) => response.data.reminders);
  }
  deleteReminder(reminderId, userId) {
    return this.request({method: 'DELETE', url: `/reminders/delete/${reminderId}/${userId}`})
      .then((response) => response.data);
  }
}

export default new ReminderService();