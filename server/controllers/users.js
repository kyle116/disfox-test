const User = require('../models/User');
const jwt = require('jsonwebtoken');

var response = {
  message: '',
  success: true,
  user: null
};

class UserController {
  // Route: /users/new
  // Access: public
  signup(req, res) {
    User.create(req.body, (err, user) => {
      console.log('req.body', req.body)
      if (err) return res.status(500).send(err.message);
      response = {success: true, message: 'User created.', user: user};
      return res.status(200).json(response);
    });
  }

  signin(req, res) {
    // first, find user by the email/username in the request body.
    const loginData = req.body.email ? {email: req.body.email} : {username: req.body.username};
    console.log(loginData);
    // When retrieving the user from database, include the password for authentication:
    User.findOne(loginData, '+password', (err, user) => {
      // Error check
      if(err) return res.status(500).send(err);
      // Not being able to find a user is not an error, handles null
      if(user === null) {
        response = {success: false, message: 'Could not find registered user with the email/username'};
        return res.status(500).send(response);
      }
      // if there's no user found, or they put a wrong password:
      if(!user || (user && !user.validPassword(req.body.password))) {
        // stop here and let the client know that the info is incorrect:
        response = {success: false, message: 'Incorrect email/username or password.'};
        return res.status(500).send(response);
      }
      // otherwise, use mongoose document's toObject() method to get a stripped down version of
      // just the user's data (name, email etc) as a simple object:
      const userData = user.toObject()

      // remove the password from this object before creating the token:
      delete userData.password

      userData['iat'] = new Date().getTime() / 1000;
      userData['exp'] = (new Date().getTime() + 10000000) / 1000; // 1000 = 1 second

      // create the token, embedding the user's info in the payload of the token:
      const token = jwt.sign(userData, process.env.SECRET_TOKEN);
      // send the token back to the client in our response:
      response = {success: true, message: 'Logged in successfully.', token};
      return res.status(200).json(response);
    });
  }
}

module.exports = new UserController();