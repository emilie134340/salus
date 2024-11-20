const User = require('../models/user'); // Adjust the path as needed

// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieves all users
    res.status(200).json(users); // Sends back the user data as JSON
  } catch (error) {
    console.error('Error retrieving users:', error.message);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// Controller to get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params; // Extracts the id from the request parameters
  try {
    const user = await User.findById(id); // Retrieves the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Sends back the user data as JSON
  } catch (error) {
    console.error(`Error retrieving user with ID ${id}:`, error.message);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

module.exports = { getAllUsers, getUserById };
