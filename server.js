// 1. Require Express
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;

const db = require("./models");

// 5. Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", {
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

// VIEW ROUTES
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

// API ROUTES
app.get("/api/config", (req, res) => {
    res.json({
        success: true,
    });
});

app.get("/api/exercise", (req, res) => {
    db.Exercise.find().then((foundExercise) => {
        res.json(foundExercise);
    });
});

app.get("/api/exercise/:id", (req, res) => {
    db.Exercise.findById(req.params.id).then((foundExercise) => {
        res.json(foundExercise);
    });
});

app.post("/api/exercises", (req, res) => {
    db.Exercise.create(req.body).then((newExercise) => {
        res.json(newExercise);
    });
});

app.put("/api/exercise/:id", (req, res) => {
    db.Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (updatedExercise) => {
            res.json(updatedExercise);
        }
    );
});

app.delete("/api/exercise/:id", (req, res) => {
    db.Exercise.findByIdAndDelete(req.params.id).then((result) => {
        res.json(result);
    });
});

// 4. Listen on the PORT.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});