let checkLogin = function(req, res, next){
  if(req.isAuthenticated()){
    res.redirect('/api/customer/home');
  }else{
    return next();
  }
}

let checkLogout = function(req, res, next){
  
}

module.exports = {
  checkLogin : checkLogin
}
