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
    rating: {
        type: Number,
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
UserSchema.pre('save', function(next) {
    let user = this;

    if ( !user.isModified('password') ) return next();

    bcrypt.hash(user.password, 5, (err, hash) => {
        if (err) { return next(err) }

        user.password = hash;

        next();
    });
});

// A function for checking an attempted password against the stored password
UserSchema.methods.login = function(password) {
    let user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) { return reject(err) }

            resolve(result);
        });
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;