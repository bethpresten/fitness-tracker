// 1. Require Express
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const Workout = require("./models/workout");

const app = express();

const PORT = process.env.PORT || 3000;


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose connected successfully.");
});

connection.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
});

// requiring the api and html routes

const apiRoutes = require("./routes/apiRoutes")(app);
const htmlRoutes = require("./routes/htmlRoutes")(app);

// 4. Listen on the PORT.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});