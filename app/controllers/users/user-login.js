'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const errorsManage = require('../../errors/errors-manage.js');
const usersRepository = require('../../repositories/users-repositories.js');

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
});

async function userLogin(req, res) {
  try {
    await schema.validateAsync(req.body);

    const user = await usersRepository.userFindByEmail(req.body.email);

    if (!user) {
      errorsManage.throwError(403, 'Login failed');
    }

    const { id, email, password } = user;

    const isValidPassword = await bcrypt.compare(req.body.password, password);

    if (!isValidPassword) {
      errorsManage.throwError(403, 'Login failed');
    }

    const token = jwt.sign(
      {
        id,
        email,
      },
      'assesment_fjal',
      { expiresIn: '30d' }
    );

    res.send({
      accessToken: token,
      expiresIn: '30d',
    });
  } catch (err) {
    errorsManage.createJsonError(err, res);
  }
}

module.exports = userLogin;
