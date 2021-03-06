const Validator = require("validator");
const isEmpty = require("is-empty");
const { validate } = require("../models/user");

module.exports = (body) => {

    let errors = [];

    body.username = !isEmpty(body.username) ? body.username : "";
    body.email = !isEmpty(body.email) ? body.email : "";
    body.password = !isEmpty(body.password) ? body.password : "";
    body.confirmPassword = !isEmpty(body.confirmPassword) ? body.confirmPassword : "";
    body.rating = !isEmpty(body.rating) ? body.rating : 0;

    // Username validation
    if (Validator.isEmpty(body.username)) {
        errors.push("A username is required.");
    }

    // Email validation
    if (Validator.isEmpty(body.email)) {
        errors.push("An email is required");
    } else if (!Validator.isEmail(body.email)) {
        errors.push("The email entered is invalid.");
    }

    // Password validation
    if (Validator.isEmpty(body.password)) {
        errors.push("A password is required.");
    }
    if (Validator.isEmpty(body.confirmPassword)) {
        errors.push("A confirmation password is required.");
    }
    if (!Validator.isLength(body.password, { min: 6, max: 20 })) {
        errors.push("Password must be between 6 and 20 characters long.");
    }
    if (!Validator.equals(body.password, body.confirmPassword)) {
        errors.push("Confirmation password must match password.");
    }

    // Rating validation
    if (body.rating <= 0) {
        errors.push("Please add a valid approximate rating.");
    }
    if (body.rating > 3000) {
        errors.push("Who are you? Magnus Carlsen? Bring that rating down below the moon please.");
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}