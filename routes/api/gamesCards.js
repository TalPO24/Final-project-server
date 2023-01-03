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

//* get
router.get("/", async(req, res) => {
    try {
        const allGamecards = await showAllGameCards();
        res.json({ allGamecards });
    } catch (err) {
        res.status(400).json(err);
    }
});

//*post
router.post("/", authMiddleware, async(req, res) => {
    /*
    gameName,
    gameDescription,
    gameReleaseDate,
    gamePrice,
    gameImg
*/
    try {
        const validatedValue = await validateNewGameSchema(req.body);
        const gameData = await createNewGameCards(
            validatedValue.gameName,
            validatedValue.gameDescription,
            validatedValue.gameReleaseDate,
            validatedValue.gamePrice,
            validatedValue.gameImg,
            req.userData.id
        );
        res.status(201).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//* patch
router.patch("/", authMiddleware, allowAccessMiddleware, async(req, res) => {
    try {
        const validatedValue = await validateUpdateGameSchema(req.body);
        const gameData = await showGameCardById(validatedValue.id);
        if (!gameData) throw "game not exists";
        if (gameData.ownerId === req.userData.id || req.userData.allowAccess) {
            await updateGamecardById(
                validatedValue.id,
                validatedValue.gameName,
                validatedValue.gameDescription,
                validatedValue.gameReleaseDate,
                validatedValue.gamePrice,
                validatedValue.gameImg
            );
        } else {
            throw "invalid operation";
        }
        res.status(201).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//* delete
router.delete(
    "/:id",
    authMiddleware,
    allowAccessMiddleware,
    async(req, res) => {
        try {
            const validatedValue = await validateDeleteGameSchema(req.params);
            const gameData = await showGameCardById(validatedValue.id);
            if (!gameData) throw "game not exists";
            if (gameData.ownerId === req.userData.id || req.userData.allowAccess) {
                const gameDataAfterDelete = await deleteGamecardById(validatedValue.id);
                res.status(200).json(gameDataAfterDelete);
            } else {
                throw "invalid operation";
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