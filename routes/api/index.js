const router = require("express").Router();
const usersRoutes = require("./users/usersRoutes");

router.use("/users", usersRoutes);

module.exports = router;