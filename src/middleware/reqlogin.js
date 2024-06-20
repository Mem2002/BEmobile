// const session = require("express-session");

const requireLogin = (req, res, next) => {
  console.log('Checking session:', req.session);
    if (!req.session || !req.session.loggedIn) {
      console.log('User not logged in');
      return res.redirect("/loginAdmin");
    } else {
       console.log('User logged in');
      next();
    }
  };
  
  module.exports = requireLogin;