const express = require('express');
const router = express.Router();
const remindersCtrl = require('../controllers/reminders');

// Route: /reminders
// Private Routes
router.get('/:userId', remindersCtrl.get);
router.post('/new', remindersCtrl.create);
router.delete('/delete/:reminderId/:userId', remindersCtrl.delete);

module.exports = router;