const { FORBIDDEN } = require('../utils/statuses');

class ErrForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = { ErrForbidden };
