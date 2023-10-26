const express = require('express');

const router = express.Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

const { auth } = require('../middlewares/auth');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);
router.use('/signup', createUserValidation, createUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

module.exports = router;
