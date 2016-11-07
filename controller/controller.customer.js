'use strict'

const customer = require('../models/model.customer');
const passport = require('passport');

// function logout
let logout = function(req, res, next){
  req.logout();
  res.render('login');
}

// function to render home page
let home = function(req, res, next){
  res.render('home');
}

// function to render login
let formLogin = function(req, res, next){
  res.render('login');
}

// function to login and create session customer
let login = function(req, res, next){
  req.session.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('home')
    }
  })
}

// function to get all data customer form database
let getAllCustomer = function(req, res, next) {
  customer.find(function(err, data){
    console.log(data);
    res.json(data)
  })
}

// function to render form register for customer
let formRegisterCustomer = function(req, res, next){
  res.render('customer');
}

// function to register new customer local
let registerCustomer = function(req, res, next){

  console.log(req.body.username);

  customer.register(new customer({
    username : req.body.username,
    email : req.body.email,
    provider : "local"
  }), req.body.password, function(err){
    if(err){
      console.log(err);
      return res.redirect('/api/customer')
    }else{
      passport.authenticate('local')(req, res, function(){
        req.session.save(function(err){
          if(err){
            return  next(next);
          }else{
            console.log(`menuju dashboard`);
            res.redirect('/api/customer')
          }
        })
      })
    }
  }
) // end of regis

} // end of registerCustomer

module.exports = {
  getAllCustomer : getAllCustomer,
  registerCustomer : registerCustomer,
  formRegisterCustomer : formRegisterCustomer,
  formLogin : formLogin,
  login : login,
  logout : logout,
  home : home
}
