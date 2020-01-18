// Source: https://stackoverflow.com/questions/47670921/express-jwt-exclude-certain-routes
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function isLoggedIn(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers.token;
  // decode token
  if (token) {
    // verifies secret and checks exp, ignores expiration to return custom message
    jwt.verify(token, process.env.SECRET_TOKEN, {ignoreExpiration: true}, function(err, decoded) {
      var currentTime = new Date().getTime() / 1000;
      // not a valid login token or if there is no expiration on the JWT
      if (typeof decoded.exp === 'undefined') {
        return res.status(401).send({
          success: false,
          message: 'Invalid login'
        });
      }
      // JWT has expired
      if (currentTime > decoded.exp) {
        return res.status(401).send({
          success: false,
          message: 'For security, your login session has expired, please login again to continue.'
        });
      }
      // accessing a route that is restricted by user auth
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Sign in to continue.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      }
    });
  } else {
    // if there is no token return an error
    return res.status(401).send({
      success: false,
      message: 'Sign in to continue.'
    });
  }
}

module.exports = {
  isLoggedIn
};
