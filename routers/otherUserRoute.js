const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/otherUser/:id").get(async (req, res) => {
    if (req.params.id == req.session.userId) {
        res.json({ success: false });
    } else {
        try {
            const userInfo = await db.getUserData(req.params.id);
            const avatar = userInfo.rows[0].avatar || "/img/default.png";
            res.json({
                success: true,
                first: userInfo.rows[0].first,
                last: userInfo.rows[0].last,
                bio: userInfo.rows[0].bio,
                avatar: avatar
            });
        } catch (e) {
            console.log(e);
        }
    }
});
