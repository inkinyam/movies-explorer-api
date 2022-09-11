const DATABASE_URL = 'mongodb://localhost:27017/moviesdb';

const PRODACTION_SECRET_KEY = 'secret';

const JWT_LIFE_LENGTH = '7d';
const SALT_LENGTH = 10;

module.exports = {
  DATABASE_URL,
  PRODACTION_SECRET_KEY,
  JWT_LIFE_LENGTH,
  SALT_LENGTH,
};
