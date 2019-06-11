const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/friendStatus/:id").get(async (req, res) => {
    try {
        const friendStatus = await db.getFriendship(
            req.params.id,
            req.session.userId
        );
        if (!friendStatus.rows[0]) {
            res.json({
                friendship: false,
                buttonText: "Send Friend Request"
            });
        } else if (friendStatus.rows[0]) {
            res.json({ friendship: true, buttonText: "End Friendship" });
        } else if (friendStatus.rows[0].accepted == false) {
            res.json({
                friendship: "pending",
                buttonText: "Accept Friend Reqeust"
            });
        }
        //console.log(friendStatus);
    } catch (e) {
        console.log(e);
    }
});
