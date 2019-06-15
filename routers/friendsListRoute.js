const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/friends-list").get(async (req, res) => {
    const friendsList = await db.getAllFriends(req.session.userId);
    res.json({ friends: friendsList.rows });
});

// USING POST ROUTES OF FRIEND REQUEST BUTTON
