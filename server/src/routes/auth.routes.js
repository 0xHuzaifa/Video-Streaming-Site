const express = require('express');
const {register, login, logout} = require('../controllers/auth.controller');
const { default: isLogin } = require('../middlewares/isLogin.middleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', isLogin, logout);

module.exports = router;