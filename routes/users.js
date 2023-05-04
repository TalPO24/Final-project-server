var express = require("express");
const { updateUserById } = require("../models/users.model");
const { genToken } = require("../config/jwt");
var router = express.Router();

/* GET users listing. */
//* This code creates a route for the root URL ("/") and sets up a callback function.
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

/* post users listing. */
//* This code defines a route that handles a PATCH request.
router.patch("/:id", async function(req, res, next) {
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