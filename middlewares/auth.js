const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ErrAutorization } = require('../errors/errors');
const { errAutorizationMessage } = require('../utils/errorsMessages');

const { NODE_ENV, SECRETKEY } = process.env;
const { PRODACTION_SECRET_KEY } = require('../utils/config');

const extractBearerToken = (header) => {
  const token = header.replace('Bearer ', '');
  return token;
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrAutorization(errAutorizationMessage);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRETKEY : PRODACTION_SECRET_KEY);
  } catch (err) {
    throw new ErrAutorization(errAutorizationMessage);
  }

  req.user = payload;

  return next();
};
