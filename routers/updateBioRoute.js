const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const expressSanitizer = require("express-sanitizer");

module.exports = router;

router.use(expressSanitizer());

router.route("/updateBio").post(async (req, res) => {
    try {
        const newBio = await db.updateBio(
            req.session.userId,
            req.sanitize(req.body.bio)
        );
        res.json({ bio: newBio.rows[0].bio });
    } catch (e) {
        console.log(e);
    }
});
