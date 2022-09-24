const { BAD_REQUEST } = require('../utils/statuses');

class ErrBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = { ErrBadRequest };
