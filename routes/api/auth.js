const express = require("express");
const router = express.Router();

const {
  validateRegisterSchema,
  validateLoginSchema,
  validateForgotPasswordSchema,
} = require("../../validation/auth.validation");

const {
  findUserByEmail,
  createNewUser,
  updatePasswordById,
} = require("../../models/users.model");

const { createHash, cmpHash } = require("../../config/bcrypt");

const { genToken, verifyToken } = require("../../config/jwt");

//* This code is a route handler for a POST request to the "/register" endpoint using the Express.js router.
//* When this route is hit, it first attempts to validate the request body against a validation schema using the validateRegisterSchema function.
//* It then checks if a user already exists with the email provided in the request body using the findUserByEmail function.
//* If a user already exists with that email, an error message is thrown.
//* If not, the password provided in the request body is hashed using the createHash function.
//* The newly hashed password is then added to the validated request body, and a new user is created using the createNewUser function.
//* If no errors occur, a JSON object with a message of "user created" and a status code of 201 is sent in the response.
//* If any errors occur during this process, a JSON object with the error message and a status code of 400 is sent in the response instead.
router.post("/register", async (req, res) => {
  try {
    const validatedValue = await validateRegisterSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (user) {
      throw "try different email";
    }
    const hashedPassword = await createHash(validatedValue.password);
    validatedValue.password = hashedPassword;
    await createNewUser(validatedValue);
    res.status(201).json({ msg: "user created" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//* This code is a route handler for a POST request to the "/login" endpoint using the Express.js router.
//* When this route is hit, it first attempts to validate the request body against a validation schema using the validateLoginSchema function.
//* It then checks if a user already exists with the email provided in the request body using the findUserByEmail function.
//* If the user does not exist, an error message of "invalid email/password" is thrown.
//* If the user does exist, the plaintext password provided in the request body is compared with the hashed password stored in the user object using the cmpHash function.
//* If they do not match, an error message of "invalid email/password" is thrown.
//* If they do match, a token is generated using the genToken function and passed a payload of the user's name, email, id, admin status, and wishlist.
//* This token is then sent in the response along with a status code of 201.
//* If any errors occur during this process, the error message is sent in the response instead, with a status code of 400.
router.post("/login", async (req, res) => {
  try {
    const validatedValue = await validateLoginSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (!user) {
      throw "invalid email/password";
    }
    const isEqual = await cmpHash(validatedValue.password, user.password);
    if (!isEqual) {
      throw "invalid email/password";
    }
    const token = await genToken({
      name: user.name,
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
      wishList: user.wishList,
    });
    res.status(201).json({ token });
  } catch (err) {
    res.json(err);
  }
});

//* Auto login
//* This code is a route handler for a POST request to the "/userinfo" endpoint using the Express.js router.
//* When this route is hit, it extracts the token from the headers of the request and assigns it to the variable "token".
//* Then it uses a function called verifyToken with the token variable as an argument, this function will verify the token and return the payload associated with the token.
//* If the token is valid, it will respond with a json object containing the user information that was passed in the payload of the token.
//* If any error occurs during the process, such as an invalid token, it will respond with an error message and a status code of 400.
router.post("/userinfo", async (req, res) => {
  try {
    let token = req.headers.token;
    console.log(token);
    let verifyUser = await verifyToken(token);
    console.log(verifyUser);
    res.json({ user: verifyUser });
  } catch (err) {
    res.status(400).json(err);
  }
});

//* forgot password
router.post("/forgotpassword", async (req, res) => {
  try {
    const validatedValue = await validateForgotPasswordSchema(req.body);
    const userData = await findUserByEmail(validatedValue.email);
    if (!userData) throw "check your inbox";
    const jwt = await genToken({ email: userData.email }, "1h");
    console.log("http://localhost:3030/resetpassword/", jwt);
    res.json({ msg: "check your inbox" });
  } catch (err) {
    res.json({ msg: err });
  }
});

//* reset password
router.post("/resetpassword/:token", async (req, res) => {
  try {
    const userData = await findUserByEmail(payload.email);
    if (!userData) throw "something went wrong";
    const hashedPassword = await createHash(req.body.password);
    await updatePasswordById(userData._id, hashedPassword);
    res.json({ msg: "password updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
