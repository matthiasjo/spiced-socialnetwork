const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/friends-list").get(async (req, res) => {
    const friendsList = await db.getAllFriends(req.session.userId);
    res.json({ friends: friendsList.rows });
});

// router.route("/end-friendship").post(async (req, res) => {
//     console.log("access");
//     console.log("userid", req.body);
//     // const friendsList = await db.getAllFriends(req.session.userId);
//     // res.json({ friends: friendsList.rows });
// });
