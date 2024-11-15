const User = require('../models/user');

const createNewUser = async (req, res) => {
  try {
    const { sub, given_name } = req.body; // Assuming these are provided in the request body!!
    const newUser = await User.create({
      _id: sub,
      firstName: given_name,
    });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

module.exports = { createNewUser };
