const Workout = require("../models/workout");

const getAllWorkouts = async (req, res) => {
  try {
    const data = await Workout.find().populate("user", "name").lean();
    return res.json(data);
  } catch (e) {
    console.log(`Error: ${e}`);
    return res.status(400).json({ error: `Error: ${e}` });
  }
};

module.exports.getAllWorkouts = getAllWorkouts;
