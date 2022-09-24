const { BAD_AUTORIZATION } = require('../utils/statuses');

class ErrAutorization extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_AUTORIZATION;
  }
}

module.exports = { ErrAutorization };
