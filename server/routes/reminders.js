const express = require('express');
const router = express.Router();
const remindersCtrl = require('../controllers/reminders');

// Route: /reminders
// Private Routes
router.post('/new', remindersCtrl.create);
// router.post('/signin', usersCtrl.signin);

module.exports = router;