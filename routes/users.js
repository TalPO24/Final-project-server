var express = require("express");
const { updateUserById } = require("../models/users.model");
const { genToken } = require("../config/jwt");
var router = express.Router();

/* GET users listing. */
//* This code creates a route for the root URL ("/") and sets up a callback function that will be invoked when a GET request is made to the root URL.
//* The callback function takes in three arguments: req, res, and next.
//* . req is an object that contains information about the incoming request, such as the headers, query parameters, and any data sent in the request body.
//* . res is an object that you can use to send a response back to the client.
//* . next is a function that you can call to pass control to the next middleware function in the stack.
//* The function sends a text "respond with a resource" as response to the client.
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* post users listing. */
//* This code defines a route that handles a PATCH request to the root endpoint of the router, with a parameter named id.
//* When this route is accessed, it uses the updateUserById function to update a user document in the database, using the id parameter from the route and the request body as arguments.
//* If the update is successful, it sends a JSON response with a 200 status code.
//* If an error occurs, it logs the error to the console.
router.patch("/:id", async function (req, res, next) {
  try {
    const doc = await updateUserById(req.params.id, req.body, { new: true });

    const token = await genToken({
      name: doc.name,
      email: doc.email,
      id: doc._id,
      isAdmin: doc.isAdmin,
      wishList: doc.wishList,
    });
    res.status(200).json(token);
  } catch (err) {}
});

module.exports = router;
