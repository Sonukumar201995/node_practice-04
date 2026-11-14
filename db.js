
const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/library";

// Connect to MongoDB
mongoose.connect(mongoURL);

const db = mongoose.connection;

// Connection successful
db.on("connected", () => {
    console.log("Connected to MongoDB server");
});

// Connection disconnected
db.on("disconnected", () => {
    console.log("Disconnected from MongoDB server");
});

// Connection error
db.on("error", (error) => {
    console.log("MongoDB connection error:", error);
});

module.exports = db;
