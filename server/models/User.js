const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: { type: String, required: [true, 'Username field cannot be blank'], unique: true },
	email: { type: String, required: [true, 'Email field cannot be blank'], unique: true },
	password: { type: String, select: false, required: [true, 'Password field cannot be blank'], unique: true }
});

// hash the PW and encrypt it
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// compare stored PW to currentPW
userSchema.methods.validPassword = function(password) {
  if(!password) return false;
  return bcrypt.compareSync(password, this.password);
};

// encrypt PW before saving PW
userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();
  this.password = this.generateHash(this.password);
  next();
});

module.exports = mongoose.model('User', userSchema);