const express = require("express");
const app = express();
const compression = require("compression");
const serveStatic = require("serve-static");
const registerRouter = require("./routers/registrationRoute");
const loginRouter = require("./routers/loginRoute");
const userRouter = require("./routers/userRoute");
const uploadRouter = require("./routers/picUploadRoute");
const updateBioRoute = require("./routers/updateBioRoute");
const otherUserRoute = require("./routers/otherUserRoute");
const userSearchRoute = require("./routers/userSearchRoute");
const logoutRoute = require("./routers/logoutRoute");
const friendRequestRoute = require("./routers/friendRequestRoute");
const friendsListRoute = require("./routers/friendsListRoute");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const db = require("./utils/db");
const port = 8080;
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 127.0.0.1:8080"
});

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    console.log("i am here");
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    res.setHeader(`X-FRAME-OPTIONS`, `DENY`);
    next();
});

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
app.use(loginRouter);
app.use(userRouter);
app.use(uploadRouter);
app.use(updateBioRoute);
app.use(otherUserRoute);
app.use(userSearchRoute);
app.use(logoutRoute);
app.use(friendRequestRoute);
app.use(friendsListRoute);

app.use(serveStatic("./public"));

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(port, () =>
    console.log(`This server is listening on port ${port}`)
);

///////////////////////     SOCKET IO STUFF \\\\\\\\\\\\\\\\\\\\\\\\

io.on("connection", socket => {
    console.log(`Socket with id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        socket.on("disconect", function() {
            console.log(`Socket with id ${socket.id} disconnected`);
        });
    }

    db.getMostRecentChatMsgs()
        .then(results => {
            // console.log("got chat messages: ", results.rows);
            socket.emit("chatMessages", results.rows);
        })
        .catch(err => {
            console.log(err);
        });
});
// socket.on("chatMessage", msg => {
//     console.log("received message: ", msg);
//     console.log("user id: ", socket.request.session.userId);
//     db.updateChat(msg, socket.request.session.userId)
//         .then(results => {
//             console.log("updateChat db response: ", results.rows[0]);
//             socket.emit("chatMessage", results.rows);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

// io.on("connection", function(socket) {
//     console.log(`Socket with id ${socket.id} just connected`);
//     if (!socket.request.session.userId) {
//         return socket.disconnect(true);
//     }
//     const userId = socket.request.session.userId;
//
//     socket.on(
//         "chatMessages",
//         db
//             .getMostRecentChatMsgs()
//             .then(msgs => socket.emit("chatMessages", msgs.rows.reverse()))
//     );

// socket.on("chatMessages", msg => {
//     console.log(`Socket with id ${socket.id} just disconnected`);
// });
//});
