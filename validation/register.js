const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (body) => {

    let errors = {};

    body.username = !isEmpty(body.username) ? body.username : "";
    body.email = !isEmpty(body.email) ? body.email : "";
    body.password = !isEmpty(body.password) ? body.password : "";
    body.confirmPassword = !isEmpty(body.confirmPassword) ? body.confirmPassword : "";

    // Username validation
    if (Validator.isEmpty(body.username)) {
        errors.username = "A username is required.";
    }

    // Email validation
    if (Validator.isEmpty(body.email)) {
        errors.email = "An email is required.";
    } else if (!Validator.isEmail(body.email)) {
        errors.email = "The email entered is invalid.";
    }

    // Password validation
    if (Validator.isEmpty(body.password)) {
        errors.password = "A password is required.";
    }
    if (Validator.isEmpty(body.confirmPassword)) {
        errors.password = "A confirmation password is required.";
    }
    if (!Validator.isLength(body.password, { min: 6, max: 20 })) {
        errors.password = "Password must be between 6 and 20 characters long.";
    }
    if (!Validator.equals(body.password, body.confirmPassword)) {
        errors.confirmPassword = "Confirmation password must match password.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}