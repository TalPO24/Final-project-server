const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
module.exports = mongoose.connect(process.env.CONSTR);
// module.exports = mongoose.connect("mongodb://localhost:27017/gamecardsdb");