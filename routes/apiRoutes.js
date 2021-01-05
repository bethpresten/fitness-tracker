const db = require("../models/index");

module.exports = function (app) {
    app.get("/api/config", (req, res) => {
        res.json({
            success: true,
        }).catch(err => {
            console.log(err)
        });
    });

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workouts => {
                res.json(workouts)
            }).catch(err => {
                console.log(err)
            });
    });

    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
            .then(db => {
                res.json(db);
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(workouts => {
                res.json(workouts)
            }).catch((err) => {
                console.log(err)
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } }
        ).then((workouts) => {
            res.json(workouts);
        }).catch((err) => {
            console.log(err);
        });
    });
}
