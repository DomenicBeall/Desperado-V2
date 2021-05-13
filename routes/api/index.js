const router = require("express").Router();
const users = require("./users");

// API Routes here
router.use("/user", users);

module.exports = router;