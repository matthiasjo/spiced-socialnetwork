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
                res.json({ friendship: true, buttonText: "Disconnect" });
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
                    buttonText: "Accept Friend Request",
                    rejectText: "Reject Friend Request",
                    rejectFlag: "reject"
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
    .post(async (req, res) => {
        try {
            if (req.body.friendship == false) {
                const statusCheck = await db.checkRequestStatus(
                    req.params.id,
                    req.session.userId
                );
                // insert and send "accept friendship"
                if (statusCheck.rows[0].exists == false) {
                    await db.sendFriendRequest(
                        req.params.id,
                        req.session.userId
                    );
                    res.json({
                        friendship: "cancel",
                        buttonText: "Cancel Friend Request"
                    });
                } else {
                    await db.establishFriendship(
                        req.params.id,
                        req.session.userId
                    );
                    res.json({
                        friendship: true,
                        error: "You won a immediate friendship",
                        buttonText: "Disconnect"
                    });
                }
            } else if (
                req.body.friendship == true ||
                req.body.friendship == "cancel" ||
                req.body.rejectFlag == "reject"
            ) {
                // delete friendship and send "make friend request"
                await db.deleteFriendship(req.params.id, req.session.userId);
                res.json({
                    success: true,
                    friendship: false,
                    buttonText: "Send Friend Request",
                    rejectText: false,
                    rejectFlag: false
                });
            } else if (req.body.friendship == "pending") {
                // establish friendship end send "end friendship"
                await db.establishFriendship(req.params.id, req.session.userId);
                res.json({
                    success: true,
                    friendship: true,
                    buttonText: "End Friendship"
                });
            }
        } catch (err) {
            console.log("error", err);
        }
    });
