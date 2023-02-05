const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Mongoose schema for collection of game cards.
//* A game card has several properties including a name, description, release date, price, image, category and owner Id.
//* The properties are defined as various types such as String, Number, and ObjectId.
//* Some properties like name and description are required fields which means they are mandatory to be provided while creating a new game card.
//* The ownerId field is a reference to the users collection.
//* This means that the ownerId field stores the _id of a user document and it links the game card document with the user document in the users collection.
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

//* This function creates a new game card object, it takes several parameters as inputs:
//* . gameName: name of the game.
//* . gameDescription: description of the game.
//* . gameReleaseDate: release date of the game.
//* . gamePrice: number representing the price of the game.
//* . gameImg: image of the game.
//* . gameCategory: category of the game.
//* . ownerId: id of the owner of the game card.
//* It creates a new instance of the 'Gamecards' model using the input parameters, and then saves it to the database using the save() method, and return the saved instance.
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

//* This code defines a function called updateGamecardById that takes in several parameters including an id, gameName, gameDescription, gameReleaseDate, gamePrice, gameCategory, and gameImg.
//* This function uses the Mongoose method (findByIdAndUpdate) to find a document in the Gamecards collection with the matching id,
//* and updates the fields of the document with the new values passed in as arguments.
//* The function returns the updated document.
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

//* (deleteGamecardById) which takes in a single argument id and uses it to delete the Gamecards document that has that specific id.
//* The function does this by using the Mongoose method (findByIdAndDelete) which takes in the id and deletes the document with that id.
//* Once the delete is successful, it returns the deleted document.
const deleteGamecardById = (id) => {
    return Gamecards.findByIdAndDelete(id);
};

//* ("showAllGameCards") retrieves all documents from the "Gamecards" collection and returns them as a result.
//* It does this using the Mongoose method (.find()) with an empty object as the parameter, which retrieves all documents in the collection.
//* The result is an array of all the Gamecards documents in the collection.
const showAllGameCards = () => {
    return Gamecards.find({});
};

//* This function takes in an "id" parameter and uses it to query the Gamecards collection in the database.
//* It returns a single game card object that has a matching id.
//* This is done using the Mongoose findById() method which queries the database for a document with the matching id.
//* If a match is found, the document is returned otherwise it returns null.
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