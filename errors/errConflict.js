const { CONFLICT } = require('../utils/statuses');

class ErrConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = { ErrConflict };
