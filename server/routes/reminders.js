const express = require('express');
const router = express.Router();
const remindersCtrl = require('../controllers/reminders');
const tools = require('../tools/tools');

// Route: /reminders
// Private Routes
router.get('/:userId', tools.isLoggedIn, remindersCtrl.get);
router.post('/new', tools.isLoggedIn, remindersCtrl.create);
router.delete('/delete/:reminderId/:userId', tools.isLoggedIn, remindersCtrl.delete);

module.exports = router;