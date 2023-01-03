const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: Number },
    isAdmin: { type: Boolean, default: false },
});

//* mongoose.model : 1) create collection ,  2)connect collection to Schema
const Users = mongoose.model("users", userSchema);

const findUserByEmail = (email) => Users.findOne({ email });

const createNewUser = (userData) => {
    const newUser = new Users(userData);
    return newUser.save();
};

const updatePasswordById = (id, password) => {
    return Users.findByIdAndUpdate(id, { password });
};

module.exports = { findUserByEmail, createNewUser, updatePasswordById };