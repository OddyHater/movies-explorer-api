const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const { errors } = require('celebrate');

// Routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
// Routes

// Controllers
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
// Controllers

// Middlewares
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
// Middlewares

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', login);
app.use('/signup', createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', movieRouter);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(PORT, 'here we go again');
});
