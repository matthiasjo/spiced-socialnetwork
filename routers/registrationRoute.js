const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
const expressSanitizer = require("express-sanitizer");

module.exports = router;

router.use(expressSanitizer());

router.route("/welcome").get((req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(`${process.cwd()}/index.html`);
    }
});

router.route("/register").post(async (req, res) => {
    if (req.body.first.includes("@")) {
        res.json({ error: "Username must not contain @ Symbol" });
    } else {
        try {
            const pwHash = await bc.hashPassword(req.body.password);
            const userInfo = await db.addUser(
                req.sanitize(req.body.first),
                req.sanitize(req.body.last),
                req.sanitize(req.body.username),
                req.sanitize(req.body.email),
                pwHash
            );
            req.session.userId = userInfo.rows[0].id;
            res.json({ success: true });
        } catch (e) {
            console.log(e);
        }

        // bc.hashPassword(req.body.password)
        //     .then(pwHash => {
        //         db.addUser(
        //             req.sanitize(req.body.first),
        //             req.sanitize(req.body.last),
        //             req.sanitize(req.body.username),
        //             req.sanitize(req.body.email),
        //             pwHash
        //         )
        //             .then(qResponse => {
        //                 req.session.userId = qResponse.rows[0].id;
        //                 res.json({ success: true });
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //                 res.json({ error: "Username or Email already exists" });
        //             });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.json({ error: "Oops! Something went wrong. Try again" });
        //     });
    }
});
