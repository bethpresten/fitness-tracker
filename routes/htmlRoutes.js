const path = require("path");
const app = require("express");

module.exports = function (app) {
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/index", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}