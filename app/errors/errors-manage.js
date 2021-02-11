'use strict';

function throwError(code, text) {
  const error = new Error(text);
  error.status = code;
  throw error;
}

function createJsonError(err, res) {
  res.status(err.status || 500);
  res.send({ error: err.message });
}

module.exports = {
  createJsonError,
  throwError,
};
