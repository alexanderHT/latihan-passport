var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // req mongoose *
var session = require('express-session'); // req express-session *
var passport = require('passport'); // req passport *
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// setup mongoose database / tell where your database name *
mongoose.connect('mongodb://localhost/latihan_passport');
mongoose.Promise = global.Promise;

// req models for auth local *
const customer = require('./models/model.customer');

// Auth
const localStrategy = require('passport-local').Strategy; // req passport-local *

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// set session *
app.use(session({
  secret : 'session',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 60000
  }
}))

// local password / customer is your model and you must load model to this page *
passport.use(new localStrategy(customer.authenticate()));

// use static serialize and deserialize of model for passport session support *
passport.serializeUser(customer.serializeUser());
passport.deserializeUser(customer.deserializeUser());
//
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', routes);
app.use('/users', users);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
