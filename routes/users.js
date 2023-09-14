const express = require('express');

const router = express.Router();

const { getCurrentUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', () => {

});

module.exports = router;
