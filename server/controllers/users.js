const
  User = require('../models/User'),
  jwt = require('jsonwebtoken');

var response = {
  message: '',
  success: true,
  user: null
};

class UserController {
  signup(req, res) {
    User.create(req.body, (err, user) => {
      console.log('req.body', req.body)
      if (err) return res.status(500).send(err.message);
      response = {success: true, message: 'User created.', user: user};
      return res.status(200).json(response);
    });
  }
}

module.exports = new UserController();