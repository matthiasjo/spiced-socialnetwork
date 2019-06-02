const express = require("express");
const app = express();
const compression = require("compression");
const serveStatic = require("serve-static");
const registerRouter = require("./routers/registration");
//const csurf = require("csurf");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
//const bodyParser = require("body-parser");
const port = 8080;

app.use(helmet());
app.use(compression());

app.use(express.json());

app.use(
    cookieSession({
        name: "session",
        secret: `trail of cookie crumbs to the secret.`,
        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);

// app.use(csurf());
// app.use(function(req, res, next) {
//     res.locals.csrfToken = req.csrfToken();
//     res.setHeader(`X-FRAME-OPTIONS`, `DENY`);
//     next();
// });

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(registerRouter);

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.use(serveStatic("./public"));

app.listen(port, () => console.log(`This server is listening on port ${port}`));
