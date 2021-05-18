const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (body) => {

    let errors = [];

    body.dateTime = !isEmpty(body.dateTime) ? body.dateTime : "";
    body.timeControl = !isEmpty(body.timeControl) ? body.timeControl : "";

    // Location validation
    if (body.location.lat === null || body.location.lng === null) {
        errors.push("A location is required.");
    }

    // Date time validation
    if (Validator.isEmpty(body.dateTime)) {
        errors.push("A date and time is required.");
    }

    // Time control validation
    if (Validator.isEmpty(body.timeControl)) {
        errors.push("A time control is required.");
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}