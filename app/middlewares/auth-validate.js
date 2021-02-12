'use strict';

const jwt = require('jsonwebtoken');

const errorsManage = require('../errors/errors-manage.js');
const usersRepository = require('../repositories/users-repositories.js');

async function authValidate(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      res.redirect('/login');
    }

    const jwtData = jwt.verify(authorization.split(' ')[1], 'assesment_fjal', { expiresIn: '30d' });

    if (await usersRepository.userFindByEmail(jwtData.email)) {
      req.auth = jwtData;
      next();
    } else {
      errorsManage.throwError(403, 'User account not found. Please login.');
    }
  } catch (err) {
    if (err.message && err.message === 'jwt malformed') {
      res.redirect('/login');
    } else {
      errorsManage.createJsonError(err, res);
    }
  }
}

module.exports = authValidate;
