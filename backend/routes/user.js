// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
//const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);
// Login a user
router.post('/login', userController.loginUser);
// Logout a user
router.get('/logout', userController.logoutUser);

// Delete a user
router.delete('/:userId', userController.deleteUser);

// Get all users
router.get('/', userController.getAllUsers);

// Update password of a user
router.put('/:userId/password', userController.updatePassword);


router.post('/change-password',  userController.changePassword);

module.exports = router;
