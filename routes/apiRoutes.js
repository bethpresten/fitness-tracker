const db = require("../models/index");
const Workout = require('../models/workout.js');
// const router = require('express').Router();

module.exports = function (app) {
    app.get("/api/config", (req, res) => {
        res.json({
            success: true,
        })

        console.log("/api/config route has been hit!");
        // .catch(err => {
        //     console.log(err)
        // });
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
        ]).sort({ _id: -1 })
            .then(function (allWorkouts) {
                res.json(allWorkouts);
                console.log(allWorkouts);
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.put("/api/workouts/:id", ({ body }, res) => {
        db.Workout.findByIdAndUpdate(
            id,
            { $push: { exercises: body } },
        ).then(function (allWorkouts) {
            res.json(allWorkouts);
        });
    });
};
