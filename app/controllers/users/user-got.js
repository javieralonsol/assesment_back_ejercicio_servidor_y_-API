'use strict';

const axios = require('axios');

const errorsManage = require('../../errors/errors-manage.js');

async function userGot(req, res) {
  try {
    const url = `https://anapioficeandfire.com/api/${req.params.parameter || ''}${req.params.parameter2 ? `/${req.params.parameter2}` : ''}${req._parsedUrl.search || ''}`;
    console.log(url);
    const response = await axios(url);

    let responseSend = JSON.stringify(response.data);
    responseSend = responseSend.replace(/https:\/\/anapioficeandfire\.com\/api/g, 'http://localhost:3030/got');
    responseSend = JSON.parse(responseSend)

    res.send(responseSend);
  } catch (err) {
    errorsManage.createJsonError(err, res);
  }
}
module.exports = userGot;
