const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("../utils/s3");
const bodyParser = require("body-parser");

module.exports = router;

router.use(bodyParser.json());

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `${process.cwd()}/uploads`);
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

router
    .route("/upload")
    .post(uploader.single("file"), s3.upload, function(req, res) {
        // If nothing went wrong the file is already in the uploads directory
        console.log("THIS IS MY CONSOLE LOG", req.body);
        const url =
            `https://s3.amazonaws.com/spiced-salt-image-board/` +
            req.file.filename;
        db.pushImage(req.session.userId, url)
            .then(() => res.json(url))
            .catch(err => {
                console.log(err);
                res.json({ error: "Upload failed. Please try again" });
            });
    });
