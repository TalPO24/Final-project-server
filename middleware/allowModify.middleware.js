//* This is a middleware function that exports an asynchronous function.
//* The function takes in three parameters - req, res, and next.
//* It checks if the req object has a property userData. If it does, it checks if (req.userData.isAdmin) is true.
//* If it is, it sets (req.userData.allowAccess) to true, otherwise it sets it to false.
//* After the check, it calls the next function, which is used to move on to the next middleware or the final request handler.
module.exports = async(req, res, next) => {
    if (req.userData) {
        if (req.userData.isAdmin) {
            req.userData.allowAccess = true;
        } else {
            req.userData.allowAccess = false;
        }
    }
    next();
};