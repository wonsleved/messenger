const { body } = require('express-validator');
const { user } = require('../config/config');

module.exports = {
  usernameValidation: function () {
    return [
      body('username').trim().toLowerCase(),
      body('username', 'Username is required').exists(),
      body('username', 'Username must not be empty').notEmpty(),
      body(
        'username',
        `Username must be between ${user.username.minLength} and ${user.username.maxLength} characters long`,
      ).isLength({ min: user.username.minLength, max: user.username.maxLength }),
      body('username', 'Username must contain only letters and numbers').isAlphanumeric(),
    ];
  },

  nameValidation: function () {
    return [
      body('name').trim(),
      body('name', 'Name is required').exists(),
      body('name', 'Name must not be empty').notEmpty(),
      body(
        'name',
        `Name must be between ${user.name.minLength} and ${user.name.maxLength} characters long`,
      ).isLength({ min: user.name.minLength, max: user.name.maxLength }),
      body('name', 'Name must contain only letters, numbers and spaces').matches(
        '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$',
      ),
    ];
  },

  passwordValidation: function () {
    return [
      body('password').trim(),
      body('password', 'Password is required').exists(),
      body('password', 'Password must not be empty').notEmpty(),
      body(
        'password',
        `Password must be between ${user.password.minLength} and ${user.password.maxLength} characters long`,
      ).isLength({ min: user.password.minLength, max: user.password.maxLength }),
    ];
  },
};
