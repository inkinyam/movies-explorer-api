const DATABASE_URL = 'mongodb://localhost:27017/moviesdb';

const PRODACTION_SECRET_KEY = 'secret';

const JWT_LIFE_LENGTH = '7d';
const SALT_LENGTH = 10;

const allowedCors = {
  origin: ['http://movies.inkinyam.nomoredomains.sbs', 'https://movies.inkinyam.nomoredomains.sbs', 'http://api.movies.inkinyam.nomoredomains.sbs', 'https://api.movies.inkinyam.nomoredomains.sbs, http://localhost:3000'],
  credentials: true,
};

module.exports = {
  DATABASE_URL,
  PRODACTION_SECRET_KEY,
  JWT_LIFE_LENGTH,
  SALT_LENGTH,
  allowedCors,
};
