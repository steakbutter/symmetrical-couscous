const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // Redirect the starting session to the Login page if you are not do a loged in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
