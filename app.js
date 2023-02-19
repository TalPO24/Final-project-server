const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");
const cors = require("cors");
const helmet = require("helmet");
const apiRouter = require("./routes/api");
const app = express();

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build"))); //* gives access to public folder (react UI (images, texts, etc)).

//*sub-Route
app.use("/api", apiRouter);

module.exports = app;
