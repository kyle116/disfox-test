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

// var date = new Date(2020, 0, 15, 22, 42, 0);
// console.log('date', date);
 
// var emailReminder = schedule.scheduleJob(/* reminder id, */ date, function(){
//   console.log('Email sent');
//   var transporter = nodemailer.createTransport({
//     host: 'smtp.mail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'thepostalservice@mail.com',
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   var mailOptions = {
//     from: 'thepostalservice@mail.com',
//     to: 'kyle11611@yahoo.com',
//     subject: 'Test email from Kyle',
//     text: 'That was easy!'
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log('email', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// });

// var my_job = schedule.scheduledJobs['123'];
// my_job.cancel();
// console.log('schedule.scheduledJobs', schedule.scheduledJobs)

// Create reminder front end
// Link reminder to user
// Create delete reminder function
// Associate email reminder to signed in user

class ReminderController {
  // Route: /reminders/new
  // Access: public
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
        console.log('date', date);
        console.log('comparedate', comparedate);
        console.log('reminder', JSON.stringify(reminder._id));
        // Scheduled email
        var emailReminder = schedule.scheduleJob(JSON.stringify(reminder._id), date, function() {
          console.log('Email sent');
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
}

module.exports = new ReminderController();