const Joi = require("joi");
const validate = require("../validation/validate");

//* This code is defining a schema for validating input data 
const newGameSchema = Joi.object({
    gameName: Joi.string().min(2).max(255).required().trim(),
    gameDescription: Joi.string().min(2).max(255).required().trim(),
    gameReleaseDate: Joi.string().min(8).max(10).required().trim(),
    gamePrice: Joi.string().min(0).required().trim(),
    gameImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
    gameCategory: Joi.string().min(2).max(255).required().trim(),

});

//* This code defines a new Joi object schema 
const updateGameSchema = Joi.object({
    gameName: Joi.string().min(2).max(255).trim(),
    gameDescription: Joi.string().min(2).max(255).trim(),
    gameReleaseDate: Joi.string().min(8).max(11).trim(),
    gamePrice: Joi.number(),
    gameImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
    gameCategory: Joi.string().min(2).max(255).required().trim(),


});

//* This code defines a schema 
const deleteGameSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

//* this schema is for the id
const findByIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

//* validation new game schema
const validateNewGameSchema = (userinput) => {
    return validate(newGameSchema, userinput);
};

//* validation updated game schema
const validateUpdateGameSchema = (userinput) => {
    return validate(updateGameSchema, userinput);
};

//* validation delete game schema
const validateDeleteGameSchema = (userInput) => {
    return validate(deleteGameSchema, userInput);
};

//* validation schema for the id
const validateFindByIdSchema = (userInput) => {
    return validate(findByIdSchema, userInput);
};

module.exports = {
    validateNewGameSchema,
    validateUpdateGameSchema,
    validateDeleteGameSchema,
    validateFindByIdSchema,
};