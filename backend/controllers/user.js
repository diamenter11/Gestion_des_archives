// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user with the encrypted password
        const newUser = new User({ name, email, password: hashedPassword, department });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Store user information in session
        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            department: user.department
            // Add more user info as needed
        };
        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Logout a user
exports.logoutUser = async (req, res) => {
    try {
        // Clear the user's session data
        req.session.destroy((err) => {
            if (err) {
                console.error('Error logging out user:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update password of a user
exports.updatePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;
        // Find the user by ID and update the password
        await User.findByIdAndUpdate(userId, { password: newPassword });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id; // Assuming the user ID is available from the auth middleware
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };