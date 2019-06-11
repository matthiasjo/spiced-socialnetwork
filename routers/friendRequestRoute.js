const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router
    .route("/friendStatus/:id")
    .get(async (req, res) => {
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
            } else if (friendStatus.rows[0].accepted == true) {
                res.json({ friendship: true, buttonText: "End Friendship" });
            } else if (
                friendStatus.rows[0].accepted == false &&
                friendStatus.rows[0].sender_id == req.session.userId
            ) {
                res.json({
                    friendship: "cancel",
                    buttonText: "Cancel Friend Request"
                });
            } else if (
                friendStatus.rows[0].accepted == false &&
                friendStatus.rows[0].receiver_id == req.session.userId
            ) {
                // POSSIBLE REJECT BUTTON IN HERE
                res.json({
                    friendship: "pending",
                    buttonText: "Accept Friend Request"
                });
            }
            //console.log(friendStatus);
        } catch (e) {
            console.log(e);
        }
    })
    .post(async (req, res) => {
        console.log("response", req.body.friendship);
        console.log("params", req.params.id);
        if (req.body.friendship == false) {
            // insert and send "accept friendship"
            const qResponse = await db.sendFriendRequest(
                req.params.id,
                req.session.userId
            );
            res.json({
                friendship: "cancel",
                buttonText: "Cancel Friend Request"
            });
        } else if (
            req.body.friendship == true ||
            req.body.friendship == "cancel"
        ) {
            // delete friendship and send "make friend request"
            const qResponse = await db.deleteFriendship(
                req.params.id,
                req.session.userId
            );
            res.json({
                friendship: false,
                buttonText: "Send Friend Request"
            });
        } else if (req.body.friendship == "pending") {
            // establish friendship end send "end friendship"
            const qResponse = await db.establishFriendship(
                req.params.id,
                req.session.userId
            );
            res.json({ friendship: true, buttonText: "End Friendship" });
        }
    });
