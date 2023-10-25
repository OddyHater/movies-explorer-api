const express = require('express');

const router = express.Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');

const { updateProfileValidation } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
