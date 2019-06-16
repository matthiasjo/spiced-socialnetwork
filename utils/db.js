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
    if (!/[^a-z]/i.test(first) && !/[^a-z]/i.test(last) && pwhash != "") {
        return db.query(
            `INSERT INTO users (first, last, username, email, password, bio, avatar) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [first, last, username, email, pwhash, bio, avatar]
        );
    } else {
        return Promise.reject(new Error("Wrong input"));
    }
};

module.exports.getLoginData = function getLoginData(userinfo) {
    return db.query(`SELECT * FROM users WHERE email=$1 OR username=$1`, [
        userinfo
    ]);
};

module.exports.getUserData = function getUserData(userid) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userid]);
};

module.exports.pushImage = function pushImage(id, avatar) {
    return db.query(`UPDATE users SET avatar = $2 WHERE id = $1`, [id, avatar]);
};

module.exports.updateBio = function updateBio(id, bio) {
    return db.query(`UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio`, [
        id,
        bio
    ]);
};

module.exports.searchUsers = function searchUsers(id, name) {
    return db.query(
        `SELECT id, first, last, username, avatar
        FROM users
        WHERE (first ILIKE $2
        OR last ILIKE $2
        OR username ILIKE $2
        OR email = $3)
        AND (users.id <> $1)
        ORDER BY last
        LIMIT 20`,
        [id, `%${name}%`, name]
    );
};

module.exports.getLatestUsers = function getLatestUsers(userid) {
    return db.query(
        `SELECT id, first, last, username, avatar FROM users
        WHERE id!=$1
        ORDER BY id DESC
        LIMIT 6`,
        [userid]
    );
};

module.exports.getFriendship = function getFriendship(requestId, userId) {
    return db.query(
        `SELECT * FROM friendships
        WHERE receiver_id=$1 AND sender_id=$2
        OR receiver_id=$2 AND sender_id=$1`,
        [requestId, userId]
    );
};

module.exports.checkRequestStatus = function checkRequestStatus(
    requestId,
    userId
) {
    return db.query(
        `SELECT EXISTS (SELECT id FROM friendships WHERE receiver_id=$1 AND sender_id=$2
        OR receiver_id=$2 AND sender_id=$1)`,
        [requestId, userId]
    );
};

module.exports.sendFriendRequest = function sendFriendRequest(
    requestId,
    userId
) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id) VALUES($1, $2)`,
        [requestId, userId]
    );
};

module.exports.deleteFriendship = function deleteFriendship(requestId, userId) {
    return db.query(
        `DELETE FROM friendships
        WHERE receiver_id=$1 AND sender_id=$2
        OR receiver_id=$2 AND sender_id=$1`,
        [requestId, userId]
    );
};

module.exports.establishFriendship = function establishFriendship(
    requestId,
    userId
) {
    return db.query(
        `UPDATE friendships SET accepted = true
        WHERE receiver_id=$2 AND sender_id=$1`,
        [requestId, userId]
    );
};

module.exports.getAllFriends = function getAllFriends(userId) {
    return db.query(
        `SELECT users.id, first, last, username, avatar, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
`,
        [userId]
    );
};
