const validate = (Schema, userInput) => {
    return Schema.validateAsync(userInput, { abortEarly: false });
};

module.exports = validate;