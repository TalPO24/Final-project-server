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


router.get("/", async(req, res) => {
    try {
        const allGamecards = await showAllGameCards();
        res.json({ allGamecards });
    } catch (err) {
        res.status(400).json(err);
    }
});


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
        }
    }
);

//* delete
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