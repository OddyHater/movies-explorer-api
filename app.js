const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;
const app = express();

const { errors } = require('celebrate');

// Routes
const router = require('./routes/index');
// Routes

// Middlewares
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const errorHandle = require('./middlewares/error-handle');
// Middlewares

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandle);

app.listen(PORT, () => {
  console.log(PORT, 'here we go again');
});
