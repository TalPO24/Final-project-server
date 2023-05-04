//* This code defines several validation functions, each of which uses the Joi library to validate a specific set of data based on a predefined schema.
const validate = (Schema, userInput) => {
    return Schema.validateAsync(userInput, { abortEarly: false });
};

module.exports = validate;