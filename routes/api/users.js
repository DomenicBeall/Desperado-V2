const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");

const models = require("../../models");
const registerValidator = require("../../validation/register.js");

// Route for registering a new user
router.post('/register', (req, res) => {
    // Form validation
    const { errors, isValid } = registerValidator(req.body);

    // Return errors if the form data is invalid
    if (!isValid) {
        return res.status(400).json({ errors: errors });
    }

    // Create a new user
    const user = new models.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // Save the user and send back a JWT
    user.save((err) => {
        const token = jwt.sign({user: user, expiry: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_KEY, { expiresIn: "1h" });

        res.json({ token: token });
    });
});

// Route for logging in an already created user
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {

    const token = jwt.sign( { user: req.user, expiry: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_KEY );

    res.json({ token: token });

});

module.exports = router;