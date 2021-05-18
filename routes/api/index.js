const router = require("express").Router();
const users = require("./users");
const games = require("./games");

// API Routes here
router.use("/user", users);
router.use("/games", games);

module.exports = router;