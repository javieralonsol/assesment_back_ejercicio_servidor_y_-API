'use strict';

const fs = require('fs').promises;

async function userFindByEmail(email) {
  const usersJsonPath = `${__dirname}/../../users.json`;

  let usersJson = await fs.readFile(usersJsonPath);

  usersJson = usersJson.toString() ? JSON.parse(usersJson) : [];

  const [user] = usersJson.filter((user) => user.email === email);

  return user;
}

module.exports = {
  userFindByEmail,
};
