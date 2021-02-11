'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const userGot = require('../controllers/users/user-got.js');
const userLogin = require('../controllers/users/user-login.js');
const userRegister = require('../controllers/users/user-register.js');
const validateAuth = require('../middlewares/auth-validate.js');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/register').post((req, res) => userRegister(req, res));

router.route('/login').post((req, res) => userLogin(req, res));

router
  .route('/')
  .all(validateAuth)
  .get((req, res) => res.send('Hello to default page.'));

router
  .route('/got')
  .all(validateAuth)
  .get((req, res) => userGot(req, res));

  router
  .route('/got/:parameter')
  .all(validateAuth)
  .get((req, res) => userGot(req, res));

  router
  .route('/got/:parameter/:parameter2')
  .all(validateAuth)
  .get((req, res) => userGot(req, res));

module.exports = router;
