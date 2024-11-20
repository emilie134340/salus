const User = require('../models/user');

const createNewUser = async (req, res) => {
  try {
    const { sub, given_name } = req.oidc.user; // Extract Auth0 user info

    // Check if user already exists in DB
    const existingUser = await User.findById(sub);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log(existingUser);

    // Create new user if doesn't exist
    const newUser = await User.create({
      _id: sub,
      firstName: given_name,
    });

    console.log(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating user', error });
  }
};

module.exports = { createNewUser };

