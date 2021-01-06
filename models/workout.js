const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now()
  },

  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Please enter an exercise type."
      },
      name: {
        type: String,
        trim: true,
        required: "Please enter an exercise name."
      },
      duration: {
        type: Number,
        required: false,
      },
      weight: {
        type: Number,
        required: false,
      },
      reps: {
        type: Number,
        required: false,
      },
      sets: {
        type: Number,
        required: false,
      },
      distance: {
        type: Number,
        required: false,
      },
    }
  ],
}, { toJSON: { virtual: true } }
);
{
  toJSON: {
    virtual: true
  }
};

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;