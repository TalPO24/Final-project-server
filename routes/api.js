const express = require("express");
const router = express.Router();
const gamescardsrouter = require("./api/gamesCards");
const authRouter = require("./api/auth");

router.get("/newuser", (req, res) => {
    res.json({ msg: "ok" });
});

router.use("/games", gamescardsrouter);
router.use("/auth", authRouter);

module.exports = router;