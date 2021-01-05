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
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ]).then(function (allWorkouts) {
            res.json(allWorkouts);
        });
    });

    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
            .then(function (allWorkouts) {
                res.json(allWorkouts);
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ]).then(function (allWorkouts) {
            res.json(allWorkouts);
        });
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate(
            params.id,
            { $push: { exercises: body } },
        ).then(function (allWorkouts) {
            res.json(allWorkouts);
        });
    });
}
