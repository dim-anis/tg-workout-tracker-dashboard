const Workout = require("../models/workout");

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate("user", "name").lean();
    if (!workouts) {
      return res.status(400).json({ message: "No workouts found" });
    }
    return res.json(workouts);
  } catch (e) {
    console.log(`Error: ${e}`);
    return res.status(400).json({ error: `Error: ${e}` });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const setId = req.body._id;
    const workout = await Workout.find({ "sets._id": setId });

    const set = await Workout.updateOne(
      { _id: workout[0]._id, "sets._id": setId },
      {
        $set: {
          "sets.$.weight": req.body.weight,
          "sets.$.repetitions": req.body.repetitions,
          "sets.$.rpe": req.body.rpe,
        },
      },
      { runValidators: true }
    );

    res.json({ message: `Set of ${workout.exercise} updated` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllWorkouts,
  updateWorkout,
};
