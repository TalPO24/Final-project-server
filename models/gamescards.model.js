const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const gameCardsSchema = new Schema({
    gameName: { type: String, required: true },
    gameDescription: { type: String, required: true },
    gameReleaseDate: { type: String, required: true },
    gamePrice: { type: Number, required: true },
    gameImg: { type: String },
    gameCategory: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: "users" },
});

//* mongoose.model : 1) create collection ,  2)connect collection to Schema
const Gamecards = mongoose.model("gamecards", gameCardsSchema);


const createNewGameCards = (
    gameName,
    gameDescription,
    gameReleaseDate,
    gamePrice,
    gameImg,
    gameCategory,
    ownerId
) => {
    const gamecard = new Gamecards({
        gameName,
        gameDescription,
        gameReleaseDate,
        gamePrice,
        gameImg,

        gameCategory,
        ownerId,
    });
    return gamecard.save();
};


const updateGamecardById = (
    id,
    gameName,
    gameDescription,
    gameReleaseDate,
    gamePrice,
    gameCategory,
    gameImg
) => {
    return Gamecards.findByIdAndUpdate(id, {
        gameName,
        gameDescription,
        gameReleaseDate,
        gamePrice,

        gameCategory,
        gameImg,
    });
};

const deleteGamecardById = (id) => {
    return Gamecards.findByIdAndDelete(id);
};


const showAllGameCards = () => {
    return Gamecards.find({});
};

const showGameCardById = (id) => {
    return Gamecards.findById(id);
};

module.exports = {
    createNewGameCards,
    showAllGameCards,
    showGameCardById,
    updateGamecardById,
    deleteGamecardById,
};