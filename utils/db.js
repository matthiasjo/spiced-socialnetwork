const spicedPg = require("spiced-pg");

const dbUrl = "postgres:postgres:postgres@localhost:5432/socialnetworkdb";
const db = spicedPg(dbUrl);

module.exports.addUser = function addUser(
    first,
    last,
    username,
    email,
    pwhash,
    bio,
    avatar
) {
    return db.query(
        `INSERT INTO users (first, last, username, email, password, bio, avatar) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [first, last, username, email, pwhash, bio, avatar]
    );
};
