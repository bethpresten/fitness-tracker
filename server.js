// 1. Require Express
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;

// const db = require("./models");
app.use(logger("dev"));
// 5. Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
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
require("./routes/htmlRoutes")(app)
require("./routes/apiRoutes")(app)

// 4. Listen on the PORT.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});