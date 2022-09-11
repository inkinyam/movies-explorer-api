const { NOT_FOUND } = require('../utils/statuses');

class ErrNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = { ErrNotFound };
