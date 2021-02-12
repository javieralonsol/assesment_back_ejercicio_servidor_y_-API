'use strict';

const express = require('express'); // server

const app = express();
app.use(express.json());

const port = 3030;

app.use('/', require('./app/routes/users-routes.js'));

app.use(function (req, res) {
  if (!req.route) {
    res.status(404).send(`Error ${req.url} vía ${req.method} method returns 404 code\nOoooops, Not found!`);
  }
});

app.listen(port, () => console.log(`Listening ${port}...`));
