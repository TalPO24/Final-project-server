const Joi = require("joi");
const validate = require("../validation/validate");

//*register Schema
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

//*validate register schema
const validateRegisterSchema = (userInput) => {
    return validate(registerSchema, userInput);
};

//* validate login schema
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