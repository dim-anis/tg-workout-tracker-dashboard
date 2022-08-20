const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
    sets: [
      {
        weight: {
          type: Number,
          required: true,
        },
        exercise: {
          type: String,
          required: true,
        },
        repetitions: {
          type: Number,
          required: true,
        },
        rpe: {
          type: Number,
          min: 5,
          max: 10,
          required: true,
        },
        notes: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, collection: "workouts" }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
