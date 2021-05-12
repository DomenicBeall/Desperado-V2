const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.Now
    }
});

// Hash passwords on creation
UserSchema.pre('save', (next) => {
    let user = this;

    if ( !user.isModified('password') ) return next();

    bcrypt.hash(user.password, 5, (err, hash) => {
        if (err) { return next(err) }

        user.password = hash;

        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;