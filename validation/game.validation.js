const Joi = require("joi");
const validate = require("../validation/validate");

//* This code is defining a schema for validating input data for a new game, using the Joi validation library.
//* The schema defines several fields that the input data must match in order to be considered valid.
//* The fields include "gameName", "gameDescription", "gameReleaseDate", "gamePrice", "gameImg" and "gameCategory".
//* Each field has specific validation rules, such as min and max string length, required, specific format, and so on.
//* This schema will be used to validate the input data before it is used to create a new game.
const newGameSchema = Joi.object({
    gameName: Joi.string().min(2).max(255).required().trim(),
    gameDescription: Joi.string().min(2).max(255).required().trim(),
    gameReleaseDate: Joi.string().min(8).max(10).required().trim(),
    gamePrice: Joi.string().min(0).required().trim(),
    gameImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
    gameCategory: Joi.string().min(2).max(255).required().trim(),
});

//* This code defines a new Joi object schema called newGameSchema and updateGameSchema that validates the structure of an incoming game data object.
//* The schema specifies that certain fields such as gameName, gameDescription, gameReleaseDate, gamePrice, gameImg, gameCategory.
//* must be present and have certain constraints such as minimum and maximum length, format, and regex validation.
//* The newGameSchema requires all fields to be present and all fields have specific constraints.
//* The updateGameSchema all fields are not required, but fields that are present must meet the specific constraints.
const updateGameSchema = Joi.object({
    gameName: Joi.string().min(2).max(255).trim(),
    gameDescription: Joi.string().min(2).max(255).trim(),
    gameReleaseDate: Joi.string().min(8).max(11).trim(),
    gamePrice: Joi.number(),
    gameImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
    gameCategory: Joi.string().min(2).max(255).required().trim(),
});

//* This code defines a schema using the Joi library for validating a request to delete a game.
//* The schema defines an object with one property, 'id', which must be a string of 24 characters, in the format of a hexadecimal value, and it must be required and trimmed.
//* This schema will be used to validate the request body when a user makes a DELETE request to the endpoint that uses this schema.
//* If the validation fails, an error will be thrown.
const deleteGameSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

//* this schema is for the id
const findByIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

//* validation new game schema
//*  this function is validating an input object (userinput) against a specific schema (newGameSchema) using the Joi library.
//*  this function is used to check that the input object contains the correct keys with the expected data types and string lengths,
//* and to return an error if it doesn't match the schema.
const validateNewGameSchema = (userinput) => {
    return validate(newGameSchema, userinput);
};

//* validation updated game schema
//* This code defines a function named validateUpdateGameSchema which takes in a parameter userinput.
//* Inside the function, it uses the validate function and passes in updateGameSchema and userinput as arguments.
//* The validate function validates the userinput against the updateGameSchema and returns an error if the input is invalid.
//* This function is used to validate user input before making updates to a game in the database.
const validateUpdateGameSchema = (userinput) => {
    return validate(updateGameSchema, userinput);
};

//* validation delete game schema
//* This code creates a function called "validateDeleteGameSchema" that takes in a parameter called "userInput".
//* This function is used to validate the data passed in as "userInput" against the "deleteGameSchema" which is a Joi object that defines specific rules for validating the input.
//* If the input is valid, it will return the validation result, otherwise it will return an error.
const validateDeleteGameSchema = (userInput) => {
    return validate(deleteGameSchema, userInput);
};

//* validation schema for the id
//* This code defines a function "validateNewGameSchema", "validateUpdateGameSchema", "validateDeleteGameSchema" and "validateFindByIdSchema" respectively,
//* which accept a user input object as a parameter and validate it against the corresponding Joi object schema (newGameSchema, updateGameSchema, deleteGameSchema and findByIdSchema),
//* using the "validate" function.
//* If the input object is valid according to the schema, the function will return the input object, otherwise it will return an error detailing why the validation failed.
const validateFindByIdSchema = (userInput) => {
    return validate(findByIdSchema, userInput);
};

module.exports = {
    validateNewGameSchema,
    validateUpdateGameSchema,
    validateDeleteGameSchema,
    validateFindByIdSchema,
};