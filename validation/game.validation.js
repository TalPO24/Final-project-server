const Joi = require("joi");
const validate = require("../validation/validate");

const newGameSchema = Joi.object({
    gameName: Joi.string().min(2).max(255).required().trim(),
    gameDescription: Joi.string().min(5).max(255).required().trim(),
    gameReleaseDate: Joi.string().min(8).max(10).required().trim(),
    gamePrice: Joi.number().required(),
    gameImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
});

const updateGameSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
    gameName: Joi.string().min(2).max(255).trim(),
    gameDescription: Joi.string().min(5).max(255).trim(),
    gameReleaseDate: Joi.string().min(8).max(10).trim(),
    gamePrice: Joi.number(),
    gameImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
});

const deleteGameSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

const findByIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

const validateNewGameSchema = (userinput) => {
    return validate(newGameSchema, userinput);
};

const validateUpdateGameSchema = (userinput) => {
    return validate(updateGameSchema, userinput);
};

const validateDeleteGameSchema = (userInput) => {
    return deleteGameSchema, userInput;
};

const validateFindByIdSchema = (userInput) => {
    return validate(findByIdSchema, userInput);
};

module.exports = {
    validateNewGameSchema,
    validateUpdateGameSchema,
    validateDeleteGameSchema,
    validateFindByIdSchema,
};

/*
    gameName,
    gameDescription,
    gameReleaseDate,
    gamePrice,
    gameImg
*/