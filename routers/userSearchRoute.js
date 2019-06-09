const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const expressSanitizer = require("express-sanitizer");

module.exports = router;

router.use(expressSanitizer());

router.route("/userSearch").get(async (req, res) => {
    let name = req.sanitize(req.query.name);
    if (!name || name == "") {
        try {
            const lastestUsers = await db.getLatestUsers(req.session.userId);
            res.json({ users: lastestUsers.rows });
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            const userArr = await db.searchUsers(req.session.userId, name);
            res.json({ users: userArr.rows });
        } catch (e) {
            console.log(e);
        }
    }
});
