const express = require("express");
const router = express.Router();
const gameController = require("../../controllers/gameController");
const gameValidator = require("../../validation/creategame.js");

// Route for creating a new game
router.post('/create', (req, res) => {
    // Form validation
    const { errors, isValid } = gameValidator(req.body);

    // Return errors if the form data is invalid
    if (!isValid) {
        return res.status(400).json({ errors: errors });
    }

    gameController.createGame(req, res);
});

// Route for accepting a game
router.post('/accept/:id', (req, res) => {
    gameController.acceptGame(req, res);
});

// Route for getting all games
router.get('/getAll', (req, res) => {
    gameController.getAll(req, res);
});

module.exports = router;