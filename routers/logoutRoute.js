const express = require("express");
const router = express.Router();

module.exports = router;

router.route("/logout").get((req, res) => {
    req.session = null;
    res.redirect("/welcome");
});
