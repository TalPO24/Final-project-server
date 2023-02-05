const Joi = require("joi");
const validate = require("../validation/validate");

//*register Schema
//* This code defines a validation schema using the Joi library for a user registration request.
//* The schema specifies that the request must include a 'name' field with a minimum length of 2 characters,
//* a maximum length of 255 characters, is required and has to be trimmed,
//* an 'email' field that is required and should match an email format,
//* 'password' field that is required, contains at least one uppercase letter, one lowercase letter, one number and one special character, and should be between 6 and 12 characters long.
//* Also, it has an optional 'avatar' field which is a string.
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string()
        .regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
            )
        )
        .required(),
    avatar: Joi.string(),
});

//* login Schema
//* This code defines a validation schema for a login request using the Joi library.
//* The schema defines two fields, email and password.
//* The email field is required, must be a string and must be a valid email address.
//* The password field is also required, must be a string and must match a specific regular expression.
//* The regular expression is checking that the password must have atleast one uppercase letter,
//* atleast one lowercase letter, atleast one digit and atleast one special character and the length of the password should be between 6 and 12 characters.
//* This validation schema is used to check the data received in a login request and ensure that it is in the correct format before processing the request.
const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string()
        .regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
            )
        )
        .required(),
});

//* forgot password schema
const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().trim(),
});

//* validate register schema
//* This code defines a function named validateRegisterSchema which takes in a parameter userInput.
//* This function is using the validate function with the registerSchema object and the userInput as the parameters.
//* The validate function is used to check the userInput against the defined registerSchema object,
//* which has defined rules for fields such as name, email, password, and avatar.
//* If the input does not match the schema, it will return an error.
//* If it matches the schema, it will return the value.
//* this function is used to validate the input data before creating a new user.
const validateRegisterSchema = (userInput) => {
    return validate(registerSchema, userInput);
};

//* validate login schema
//* This code creates a function validateLoginSchema that takes in a user input (an object) as a parameter.
//* It uses the Joi library's validate() function to validate the user input against the loginSchema object,
//* which is an object that defines a specific shape and type of data that the user input should conform to.
//* The function returns the result of the validate() function, which could be an error if the input is invalid, or a value if the input is valid.
const validateLoginSchema = (userInput) => {
    return validate(loginSchema, userInput);
};

//*validate password schema
const validateForgotPasswordSchema = (userInput) => {
    return validate(forgotPasswordSchema, userInput);
};

module.exports = {
    validateRegisterSchema,
    validateLoginSchema,
    validateForgotPasswordSchema,
};