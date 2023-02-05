//* This code defines several validation functions, each of which uses the Joi library to validate a specific set of data based on a predefined schema.
//* The validate function is the last one you provided,
//* it takes the schema and the user input as arguments and returns the result of validating the user input against the schema using Joi's validateAsync method with the option { abortEarly: false }.
//* This method is used to validate the user input against the predefined schema and return an error object if validation fails,
//* otherwise it will return the value of user input.
//* The schema that is being passed as an argument to the validate function is one of the following: registerSchema, loginSchema, forgotPasswordSchema, newGameSchema, updateGameSchema, deleteGameSchema, findByIdSchema.
//* Each of the other functions (e.g. validateRegisterSchema, validateLoginSchema, validateForgotPasswordSchema, validateNewGameSchema, validateUpdateGameSchema, validateDeleteGameSchema, validateFindByIdSchema)
//* are simply calling the validate function with the appropriate schema as the first argument.
const validate = (Schema, userInput) => {
    return Schema.validateAsync(userInput, { abortEarly: false });
};

module.exports = validate;