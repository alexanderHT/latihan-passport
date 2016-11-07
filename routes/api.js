'use strict'

var express = require('express');
var router = express.Router();
const controller = require('../controller/controller.customer');
const passport = require('passport');
const middleware = require('../helper/middleware');

/* GET home page. */
router.get('/customer', controller.getAllCustomer);
router.post('/customer', controller.registerCustomer);
router.get('/customer/register', controller.formRegisterCustomer);
router.get('/customer/login', middleware.checkLogin, controller.formLogin);
router.post('/customer/login', passport.authenticate('local', {failureRedirect : '/api/customer/login'}) , controller.login);
router.get('/customer/home', controller.home);
router.get('/customer/logout', controller.logout);




module.exports = router;
