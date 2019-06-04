const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/user").get((req, res) => {
    db.getUserData(req.session.userId)
        .then(qResponse => {
            const avatar = qResponse.rows[0].avatar || "/img/default.png";
            res.json({
                id: req.session.userId,
                first: qResponse.rows[0].first,
                last: qResponse.rows[0].last,
                bio: qResponse.rows[0].bio,
                avatar: avatar
            });
        })
        .catch(err => {
            console.log(err);
        });
});
