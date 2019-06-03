const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
const expressSanitizer = require("express-sanitizer");

module.exports = router;

router.use(expressSanitizer());

router.route("/login").post((req, res) => {
    db.getLoginData(req.body.user)
        .then(qResponse => {
            const pwHash = qResponse.rows[0].password;

            bc.checkPassword(req.body.password, pwHash)
                .then(result => {
                    if (result) {
                        req.session.userId = qResponse.rows[0].id;
                        res.json({ success: true });
                    } else if (!result) {
                        res.json({ error: "Wrong Password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({ error: "Oops! Please try again!" });
                });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: "Wrong input. User does not exist" });
        });
});
