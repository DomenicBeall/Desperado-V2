const models = require("../models");

module.exports = {
    getAll: function(req, res) {
        models.Game.find().populate("challenger").populate("responder")
        .then(games => res.json(games))
        .catch(err => {
            console.log(err);
        });
    },
    findByUserID: function(id) {
        // Database call to find all games by user id
    },
    createGame: function(req, res) {
        models.Game.create(req.body)
        .then(game => res.json(game))
        .catch(err => {
            console.log(err);
            res.end();
        });
    },
    updateGame: function(details) {

    },
    deleteGameByID: function(id) {

    }
};