const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    dateTime: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng : {
            type: Number,
            required: true
        },
        placeName: {
            type: String,
            required: true
        }
    },
    timeControl: {
        type: String,
        required: true
    },
    challenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    responder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;