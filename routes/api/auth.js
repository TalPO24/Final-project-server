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


router.post("/register", async(req, res) => {
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
        if (err.details && Array.isArray(err.details)) {
            const errors = err.details.map((detail) => detail.message);
            res.status(400).json({ errors });
        } else {
            res.status(400).json({ err });
        }
    }
});


router.post("/login", async(req, res) => {
    try {
        const validatedValue = await validateLoginSchema(req.body);
        const user = await findUserByEmail(validatedValue.email);
        console.log("r");
        if (!user) {
            throw { message: "Invalid email or password", status: 401 };
        }
        const isEqual = await cmpHash(validatedValue.password, user.password);
        if (!isEqual) {
            throw { message: "Invalid email or password", status: 401 };
        }
        const token = await genToken({
            name: user.name,
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
            wishList: user.wishList,
        });
        res.status(200).json({ token });
    } catch (err) {
        console.log("Error:", err);
        res.status(err.status || 500).json({ message: err.message || "Internal server error" });
    }
});



//* Auto login
router.post("/userinfo", async(req, res) => {
    try {
        let token = req.headers.token;
        let verifyUser = await verifyToken(token);
        res.json({ user: verifyUser });
    } catch (err) {
        res.status(400).json(err);
    }
});

//* forgot password
// router.post("/forgotpassword", async(req, res) => {
//     try {
//         const validatedValue = await validateForgotPasswordSchema(req.body);
//         const userData = await findUserByEmail(validatedValue.email);
//         if (!userData) throw "check your inbox";
//         const jwt = await genToken({ email: userData.email }, "1h");
//         res.json({ msg: "check your inbox" });
//     } catch (err) {
//         res.json({ msg: err });
//     }
// });

//* reset password
// router.post("/resetpassword/:token", async(req, res) => {
//     try {
//         const userData = await findUserByEmail(payload.email);
//         if (!userData) throw "something went wrong";
//         const hashedPassword = await createHash(req.body.password);
//         await updatePasswordById(userData._id, hashedPassword);
//         res.json({ msg: "password updated" });
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// });

module.exports = router;