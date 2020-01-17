const Reminder = require('../models/Reminder');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

var response = {
  message: '',
  success: true,
  reminder: null
};

class ReminderController {
  // Route: /reminders/:userId
  // Access: private
  get(req, res) {
    User.findById(req.params.userId).populate('reminders').exec((err, user) => {
      if (err) return res.status(500).send(err.message);

      response = {success: true, message: 'Reminders for current user.', reminders: user.reminders};
      return res.status(200).json(response);
    });
  }

  // Route: /reminders/new
  // Access: private
  create(req, res) {
    User.findById(req.body.userId, (userErr, user) => {
      if (userErr) return res.status(500).send(userErr.message);

      var reminderData = {
        title: req.body.reminderTitle,
        reminderDate: new Date(req.body.date + ' ' + req.body.time)
      };

      Reminder.create(reminderData, (reminderErr, reminder) => {
        if (reminderErr) return res.status(500).send(reminderErr.message);

        // UTC Date
        var date = reminder.reminderDate;
        var comparedate = new Date(2020, 0, 16, 16, 59, 0);
        // Scheduled email
        var emailReminder = schedule.scheduleJob(reminder._id.toString(), date, function() {
          var transporter = nodemailer.createTransport({
            host: 'smtp.mail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'thepostalservice@mail.com',
              pass: process.env.EMAIL_PASS
            }
          });

          var mailOptions = {
            from: 'thepostalservice@mail.com',
            to: 'kyle11611@yahoo.com',
            subject: 'Take the email',
            text: JSON.stringify(date)
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log('email', error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        });

        // Associate reminder to user
        user.reminders.push(reminder);
        user.save();

        response = {success: true, message: 'Reminder created.', reminder: reminder, user: user};
        return res.status(200).json(response);
      });
    });
  }

  // Route: /reminders/delete/:reminderId/:userId
  // Access: private
  delete(req, res) {
    User.findById(req.params.userId).populate('reminders').exec((userErr, user) => {
      if (userErr) return res.status(500).send(err);

      Reminder.findByIdAndRemove(req.params.reminderId, (reminderErr, deletedReminder) => {
        if (reminderErr) return res.status(500).send(err);

        for(var i = 0; i < user.reminders.length; i++) {
          if (user.reminders[i]._id.toString() === deletedReminder._id.toString()) {
            user.reminders.splice(i, 1)
            break
          }
        }

        // Cancels email reminder
        var emailReminder = schedule.scheduledJobs[req.params.reminderId];
        emailReminder.cancel();

        user.save();
        response = {success: true, message: 'Reminder deleted.', deletedReminder: deletedReminder};
        return res.status(200).json(response);
      });
    });
  }
}

module.exports = new ReminderController();