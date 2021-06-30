const models = require('../models');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const options = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

// Local Strategy, for logging in
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (username, password, done) => {

    models.User.findOne({ email: username }, (err, user) => {
        
        if (err) { return done(err) }

        if (!user) {
            return done(null, false);
        }

        // Check the submitted password against the hashed password
        user.login(password)
            .then((res) => {
                if (res)
                    return done(null, user);

                return done(err, false);
            })
            .catch((err) => {
                console.error(err);
            });

    });

}));    

// JWT Strategy, for route authentication
passport.use(new JWTStrategy(options, (payload, done) => {
    User.findOne({ _id: payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;