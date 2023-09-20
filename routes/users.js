const express = require('express');

const router = express.Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');

const { getCurrentUserValidataion, updateProfileValidation } = require('../middlewares/validation');

router.get('/users/me', getCurrentUserValidataion, getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
