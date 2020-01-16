const Reminder = require('../models/Reminder');
const jwt = require('jsonwebtoken');

var response = {
  message: '',
  success: true,
  reminder: null
};

class ReminderController {
  // Route: /reminders/new
  // Access: public
  create(req, res) {
    Reminder.create(req.body, (err, reminder) => {
      console.log('req.body', req.body);
      if (err) return res.status(500).send(err.message);
      response = {success: true, message: 'Reminder created.', reminder: reminder};
      return res.status(200).json(response);
    });
  }
}

module.exports = new ReminderController();