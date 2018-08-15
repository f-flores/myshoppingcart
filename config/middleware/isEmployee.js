// This is middleware for restricting routes to only employee users; otherwise
// reroutes to home
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user.user_type === "employee") {
    return next();
  }

  // If the user isn't logged in, redirect them to the public home page
  return res.redirect("/");
};