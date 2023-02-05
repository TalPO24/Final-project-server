const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Mongoose schema for user model.
//* The schema includes fields for the user's name, email, password, avatar, and admin status, as well as a wishlist field that is an array of references to gamecard documents.
//* The type property of each field specifies the data type that the field should hold.
//* The required property specifies that certain fields are required and must have a value when a new user document is created.
//* The unique property on the email field ensures that the email is unique across all documents in the user collection.
//* The default property on the isAdmin field sets a default value of false if the value is not provided.
//* The wishList field is an array of reference to gamecards collection.
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: Number },
  isAdmin: { type: Boolean, default: false },
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "gamecards" }],
});

//* This code is adding a Mongoose middleware to the "find" method of the User model.
//* The middleware uses the "populate" function on the "wishList" property of the User schema, which is an array of references to "gamecards" documents.
//* This will automatically populate the "wishList" property with the corresponding "gamecards" documents when a "find" query is executed on the User model.
//* The ("next()") function is called at the end of the middleware, allowing the query to continue executing.
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "wishList",
  });
  next();
});

//* mongoose.model : 1) create collection ,  2)connect collection to Schema
const Users = mongoose.model("users", userSchema);

//* This function takes an email as an argument and uses the findOne method provided by Mongoose to search the Users collection for a document with a matching email.
//* If a match is found, the matching document will be returned, otherwise, it will return null.
const findUserByEmail = (email) => Users.findOne({ email });

//* This function creates a new user in the database using the data passed as the argument.
//* It creates a new instance of the Users model using the userData object and calls the save() method to save it to the database.
//* The function returns a promise that resolves with the saved user object or rejects with an error if there was a problem saving the user.
const createNewUser = (userData) => {
  const newUser = new Users(userData);
  return newUser.save();
};

//* This function updates the password of a user by finding the user by their id and updating their password to the value passed in as an argument.
//* The findByIdAndUpdate method is used to find the user by their id and update their password.
//* The updated user document is returned.
const updatePasswordById = (id, password) => {
  return Users.findByIdAndUpdate(id, { password });
};

//* "updateUserById" that takes in two parameters, "id" and "detailesBody".
//* The function uses the Mongoose method "findByIdAndUpdate()" to find a user in the "Users" collection by its id and update it with the data provided in the "detailesBody" parameter.
//* This method returns the updated user.
const updateUserById = (id, detailesBody, option) => {
  return Users.findByIdAndUpdate(id, detailesBody, option);
};

module.exports = {
  findUserByEmail,
  createNewUser,
  updatePasswordById,
  updateUserById,
};
