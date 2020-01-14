const express = require('express');
const router = express.Router();
const User = require('../models/User');
const usersCtrl = require('../controllers/users');

// Route: /users
// Public Routes
router.post('/new', usersCtrl.signup);
// router.post('/signin', usersCtrl.signin);


module.exports = router;