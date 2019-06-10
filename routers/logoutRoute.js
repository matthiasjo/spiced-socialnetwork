const express = require("express");
const router = express.Router();

module.exports = router;

router.route("/logoutUser").get((req, res) => {
    req.session = null;
    res.json({ success: true });
});
