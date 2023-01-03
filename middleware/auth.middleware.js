const { verifyToken } = require("../config/jwt");

const auth = async(req, res, next) => {
    try {
        const payload = await verifyToken(req.headers["x-auth-token"]);
        // we may need to find user
        req.userData = payload;
        next();
    } catch (err) {
        res.status(401).json(err);
    }
};
module.exports = auth;