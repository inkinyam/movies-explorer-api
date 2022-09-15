require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');

const limiter = require('./middlewares/limiter');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allroutes = require('./routes/allroutes');

const { DATABASE_URL, allowedCors } = require('./utils/config');

const { PORT = 3002 } = process.env;

mongoose.connect(DATABASE_URL);

const app = express();

app.use(cors(allowedCors));

app.use(helmet());
app.use(requestLogger);
app.use(limiter); // защита от ддос атак
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(allroutes);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT}`);
});
