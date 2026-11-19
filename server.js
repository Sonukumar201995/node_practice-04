
const db = require("./db");

const express = require("express");
const app = express();

// Import Router
const StaffRouter = require("./routes/StaffRouter");
//passport 
const passport = require("./auth");
app.use(passport.initialize());
const local = passport.authenticate("local", {session: false});

// Body Parser Middleware
app.use(express.json());


// Logging Middleware
const logRequest = (req, res, next) => {
    console.log(
        `${new Date().toLocaleString()} Request Method: ${req.method} URL: ${req.originalUrl}`
    );
    next();
};

app.use(logRequest);

// Router Middleware
app.use("/", StaffRouter);

// Home Route
app.get("/",local,(req, res) => {
    res.send("Welcome to our Library Management System");
});

// Server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
