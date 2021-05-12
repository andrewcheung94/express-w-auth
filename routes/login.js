const router = require('express').Router();
const { loginUser } = require('../controllers/authController');

// /login/
router.post('/', loginUser , (req, res) => res.send("You have logged in successfully!"));

module.exports = router;