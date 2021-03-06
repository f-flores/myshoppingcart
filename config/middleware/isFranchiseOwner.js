// This is middleware for restricting routes to only franchise owner users; otherwise
// reroutes to home
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user.user_type === "franchiseOwner") {
    return next();
  }

  // If the user isn't logged in, redirect them to the public home page
  return res.redirect("/");
};