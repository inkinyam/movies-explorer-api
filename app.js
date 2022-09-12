require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./middlewares/auth');
const limiter = require('./middlewares/limiter');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { ErrNotFound } = require('./errors/errors');

const { DATABASE_URL } = require('./utils/config');

const { PORT = 3002 } = process.env;

mongoose.connect(DATABASE_URL);

const app = express();

app.use(cors());

app.use(helmet());
app.use(limiter); // защита от ддос атак
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/login'));

app.use(auth);
app.use(require('./routes/userRoutes'));
app.use(require('./routes/movieRoutes'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new ErrNotFound('Неверный адрес запроса'));
});

// обработчики ошибок
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT}`);
});
