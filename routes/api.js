const express = require("express");
const router = express.Router();
const gamescardsrouter = require("./api/gamesCards");
const authRouter = require("./api/auth");
const userRouter = require("./users");

router.get("/newuser", (req, res) => {
    res.json({ msg: "ok" });
});

router.use("/games", gamescardsrouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;