const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});

module.exports = limiter;
