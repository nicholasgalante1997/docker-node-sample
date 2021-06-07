const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signUp = async (req, res, next) => {
  const { user } = req.body;
  const { username, password } = user;
  try {
    const hashed = await bcrypt.hash(password, 15);
    const newUser = await User.create({
      username,
      password: hashed,
    });
    req.session.user = newUser;
    res.status(201);
    res.json({
      status: 'success',
      data: {
        user: newUser,
      },

    });
  } catch (e) {
    res.status(400);
    res.json({
      error: e.message,
    });
  }
};

exports.logIn = async (req, res, next) => {
  const { user } = req.body;
  const { username, password } = user;
  try {
    const userDTO = await User.findOne({ username });

    if (!userDTO) {
      res.status(404).json({
        status: 'error',
        error: 'User not found',
      });
    }

    const validLogIn = await bcrypt.compare(password, userDTO.password);

    if (validLogIn) {
      req.session.user = userDTO;
      res.status(200);
      res.json({
        status: 'success',
        data: userDTO,
      });
    } else {
      res.status(400);
      res.json({
        status: 'error',
        error: 'incorrect username or password',
      });
    }
  } catch (e) {
    res.status(400);
    res.json({
      error: e.message,
    });
  }
}