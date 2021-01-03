const db = require("../../models");

module.exports = function (app) {
    app.get("/api/config", (req, res) => {
        res.json({
            success: true,
        }).catch(err) => {
            console.log(err);
        };
    });

    app.get("/api/exercise", (req, res) => {
        db.Exercise.find().then((foundExercise) => {
            res.json(foundExercise);
        }).catch(err) => {
            console.log(err);
        };
    });


    app.get("/api/exercise/range", (req, res) => {
        db.Exercise.find().then((foundExercise) => {
            res.json(foundExercise);
        }).catch((err)) => {
            console.log(err);
        };
    });

    app.get("/api/exercise/:id", (req, res) => {
        db.Exercise.findById(req.params.id).then((foundExercise) => {
            res.json(foundExercise);
        }).catch(err) => {
            console.log(err);
        };
    });

    app.post("/api/exercises", (req, res) => {
        db.Exercise.create(req.body).then((newExercise) => {
            res.json(newExercise);
        }).catch((err)) => {
            console.log(err);
        };
    });

    app.put("/api/exercise/:id", (req, res) => {
        db.Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
            (updatedExercise) => {
                res.json(updatedExercise);
            }).catch(err) => {
            console.log(err);
        }
    });

    app.delete("/api/exercise/:id", (req, res) => {
        db.Exercise.findByIdAndDelete(req.params.id).then((result) => {
            res.json(result);
        });
    });
}