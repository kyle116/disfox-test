const Reminder = require('../models/Reminder');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

var response = {
  message: '',
  success: true,
  reminder: null
};

// var date = new Date(2020, 0, 15, 22, 30, 0);
 
// var emailReminder = schedule.scheduleJob(/* reminder id, */ date, function(){
//   console.log('Email sent');
//   var transporter = nodemailer.createTransport({
//     host: 'smtp.mail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'thepostalservice@mail.com',
//       pass: 'password111'
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

class ReminderController {
  // Route: /reminders/new
  // Access: public
  create(req, res) {
    Reminder.create(req.body, (err, reminder) => {
      console.log('req.body', req.body);
      if (err) return res.status(500).send(err.message);

      var date = reminder.reminderDate;
      var emailReminder = schedule.scheduleJob(/* reminder id, */ date, function(){
        console.log('Email sent');
        var transporter = nodemailer.createTransport({
          host: 'smtp.mail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'thepostalservice@mail.com',
            pass: 'password111'
          }
        });

        var mailOptions = {
          from: 'thepostalservice@mail.com',
          to: 'kyle11611@yahoo.com',
          subject: 'Test email from Kyle',
          text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('email', error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      });

      response = {success: true, message: 'Reminder created.', reminder: reminder};
      return res.status(200).json(response);
    });
  }
}

module.exports = new ReminderController();