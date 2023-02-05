const express = require("express");
const router = express.Router();

const {
    validateNewGameSchema,
    validateUpdateGameSchema,
    validateDeleteGameSchema,
    validateFindByIdSchema,
} = require("../../validation/game.validation");

const {
    createNewGameCards,
    showAllGameCards,
    showGameCardById,
    updateGamecardById,
    deleteGamecardById,
} = require("../../models/gamescards.model");

const authMiddleware = require("../../middleware/auth.middleware");

const allowAccessMiddleware = require("../../middleware/allowModify.middleware");

//* This code is a route handler for a GET request to the root endpoint ("/") using the Express.js router.
//* When this route is hit, it attempts to retrieve all game cards using the showAllGameCards function, which access the database to get all game cards records.
//* If the operation is successful, it will respond with a JSON object containing all the game cards.
//* If any error occurs during this process, it will respond with an error message and a status code of 400.
router.get("/", async(req, res) => {
    try {
        const allGamecards = await showAllGameCards();
        res.json({ allGamecards });
    } catch (err) {
        res.status(400).json(err);
    }
});

//* This code is a route handler for a POST request to the root endpoint ("/") using the Express.js router.
//* When this route is hit, it first uses an authMiddleware function to check the request for valid authentication before proceeding, it likely checks for a valid token in the headers,
//* and decoded the token to get user data.
//* Then it attempts to validate the request body against a validation schema using the validateNewGameSchema function.
//* After that it creates a new game card using the createNewGameCards function, passing in the validated values from the request body, as well as the user's ID from the decoded token,
//* this function access the database to create the new game card.
//* If the operation is successful, it will respond with a JSON object containing the data of the newly created game card and a status code of 201.
//* If any error occurs during this process, such as a problem with the database or an invalid request, it will respond with an error message and a status code of 400.
router.post("/", authMiddleware, async(req, res) => {
    try {
        const validatedValue = await validateNewGameSchema(req.body);
        const gameData = await createNewGameCards(
            validatedValue.gameName,
            validatedValue.gameDescription,
            validatedValue.gameReleaseDate,
            validatedValue.gamePrice,
            validatedValue.gameImg,
            validatedValue.gameCategory,
            req.userData.id
        );
        res.status(201).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//* This code is a route handler for a PATCH request to a specific endpoint ("/:id") using the Express.js router.
//* When this route is hit, it first uses an authMiddleware function to check the request for valid authentication before proceeding,
//* it likely checks for a valid token in the headers, and decoded the token to get user data.
//* Then it uses the allowAccessMiddleware function to check if the user has the permission to access this route.
//* After that it attempts to validate the request body against a validation schema using the validateUpdateGameSchema function.
//* After that, it retrieves the game card with the specified ID from the database using the showGameCardById function.
//* It then checks if the game card exists, if not it throws an error "game not exists",
//* else it checks if the user has permission to update the game card using the allowAccess attribute of the userData from the token.
//* If the user has permission, it updates the game card in the database using the updateGamecardById function and passing in the updated values from the request body,
//* as well as the game card's ID from the request parameters.
//* If the operation is successful, it will respond with the updated game card data and a status code of 201.
//* If any error occurs during this process, such as a problem with the database or an invalid request, it will respond with an error message and a status code of 401.
router.patch(
    "/:id",
    authMiddleware,
    allowAccessMiddleware,
    async(req, res) => {
        try {
            const validatedValue = await validateUpdateGameSchema(req.body);
            const gameData = await showGameCardById(req.params.id);
            if (!gameData) throw "game not exists";
            if (req.userData.allowAccess) {
                await updateGamecardById(
                    req.params.id,
                    validatedValue.gameName,
                    validatedValue.gameDescription,
                    validatedValue.gameReleaseDate,
                    validatedValue.gamePrice,
                    validatedValue.gameCategory,
                    validatedValue.gameImg
                );
            } else {
                throw "invalid operation";
            }
            res.status(201).json(gameData);
        } catch (err) {
            res.status(401).json(err);
            console.log("error", err);
        }
    }
);

//* delete
//* A route for deleting a game card by its ID.
//* This route is protected by an authentication middleware and an access control middleware.
//* If the user is authenticated and has the appropriate access level, the route will proceed to delete the game card.
//* The game card ID is passed as a parameter in the route and is used to find and delete the game card from the database.
//* If the user is not authenticated or does not have the appropriate access level, an error message will be returned.
router.delete(
    "/:id",
    authMiddleware,
    allowAccessMiddleware,
    async(req, res) => {
        try {
            if (req.userData.allowAccess) {
                const validatedValue = await validateDeleteGameSchema(req.params);
                const gameData = await deleteGamecardById(validatedValue.id);
                res.status(204).json(gameData);
            } else {
                throw "you are not allowed";
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

//*query params
// router.get("/qparams", (req, res) => {
//     console.log({ game: gamesArr[req.query.index] });
// });

//*params - getbyid
//* This route is handling a GET request to the "/getbyid/:id" endpoint.
//* It is using a "validateFindByIdSchema" function to validate the request parameters, specifically the "id" parameter in the url.
//* Then it is using a "showGameCardById" function to retrieve the game data associated with the provided id.
//* If the game data is found, it is returned to the client with a status code of 200.
//* If there is an error, it is returned to the client with a status code of 400.
router.get("/getbyid/:id", async(req, res) => {
    try {
        const validatedValue = await validateFindByIdSchema(req.params);
        const gameData = await showGameCardById(validatedValue.id);
        res.status(200).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;