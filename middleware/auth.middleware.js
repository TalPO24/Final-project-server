const { verifyToken } = require("../config/jwt");

//* This is a middleware function that is used to authenticate a user's request by verifying their token.
//* It uses the verifyToken function to verify the token passed in the request headers.
//* If the token is valid, it decodes the token and attaches the payload (which contains user information) to the request object.
//* Then it calls the next() function to continue with the next middleware or route handler.
//* If the token is invalid, it sends a 401 status code and the error message in the response.
const auth = async(req, res, next) => {
    try {
        const payload = await verifyToken(req.headers["token"]);
        req.userData = payload;
        next();
    } catch (err) {
        res.status(401).json(err);
    }
};
module.exports = auth;