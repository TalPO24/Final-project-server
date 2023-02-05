const jwt = require("jsonwebtoken");

//*  It takes in two arguments, the first one is the "payload" which is the data you want to include in the token,
//* and the second one is an optional "expDate" which is the expiration date of the token The jwt.sign() method is used to sign the token and add it the specified expiration time.
//* The process.env.JWT is the secret key used to sign the token.
//* The function returns a promise that resolves with the generated token if it is successful and rejects with an error if something goes wrong.
const genToken = (payload, expDate = "30d") => {
  //   console.log(payload);
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT, { expiresIn: expDate }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

//* The function verifyToken takes in a token as an argument, and returns a promise that either resolves with the payload of the token,
//*  or rejects with an error if the token is invalid or has expired.
//* The jwt.verify() method is used to check the authenticity of the token by comparing the signature of the token with the JWT secret key defined in the (process.env.JWT) variable.
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
};
module.exports = { genToken, verifyToken };
