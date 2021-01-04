const db = require("../public");

module.exports = function (app) {
    app.get("/api/config", (req, res) => {
        res.json({
            success: true,
        });
        // .catch((err)) => {
        //     console.log(err);
        // };
    });

    app.get("/api/workouts", (req, res) => {
        db.Workout.find().then((workouts) => {
            res.json(workouts);
        });
        // .catch((err)) => {
        //     console.log(err);
        // };
    });


    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find().then((workouts) => {
            res.json(workouts);
        });
        // .catch((err)) => {
        //     console.log(err);
        // };
    });

    app.get("/api/workouts/:id", (req, res) => {
        db.Workout.findById(req.params.id).then((workouts) => {
            res.json(workouts);
        });
        // .catch(err) => {
        //     console.log(err);
        // };
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body).then((workouts) => {
            res.json(workouts);
        })
        // .catch((err)) => {
        //     console.log(err);
        // };
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
            (workouts) => {
                res.json(workouts);
            });
        //     .catch(err) => {
        //     console.log(err);
        // }
    });

    app.delete("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndDelete(req.params.id).then((result) => {
            res.json(result);
        });
    });
}