
const { dirname } = require("path");
const path = require("path");

module.exports = function (app) {
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });

    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });
}