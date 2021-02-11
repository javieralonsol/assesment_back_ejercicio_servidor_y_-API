'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const errorsManage = require('../../errors/errors-manage.js');

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
});

async function userRegister(req, res) {
  try {
    await schema.validateAsync(req.body);

    const usersJsonPath = `${__dirname}/../../../users.json`;

    let usersJson = await fs.readFile(usersJsonPath);

    usersJson = usersJson.toString() ? JSON.parse(usersJson) : [];

    const { email, password } = req.body;

    if (usersJson.some((user) => user.email === email)) {
      errorsManage.throwError(409, `A user with email ${email} already exists`);
    }

    const newUser = {
      id: usersJson.length + 1,
      email,
      password: await bcrypt.hash(password, 12),
    };

    usersJson.push(newUser);

    await fs.writeFile(usersJsonPath, JSON.stringify(usersJson));

    res.send({ ...newUser, password: 'OK' });
  } catch (err) {
    errorsManage.createJsonError(err, res);
  }
}

module.exports = userRegister;
