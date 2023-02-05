const bcrypt = require("bcryptjs");

//* The createHash function uses the bcrypt library to create a hash of the given password.
//* The bcrypt.hash method takes two arguments: the password to be hashed, and the number of rounds to use when generating the salt (10 in this case).
//* The function returns the generated hash.
const createHash = (password) => bcrypt.hash(password, 10);

//*The cmpHash function uses the bcrypt library to compare the provided password to the provided hash.
//* It will return a boolean indicating whether the password and hash match.
const cmpHash = (password, hash) => bcrypt.compare(password, hash);

module.exports = { createHash, cmpHash };