const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/verifyJWT");

const workout_controller = require("../controllers/workoutController");

router
  .route("/", authenticateToken)
  .get(workout_controller.getAllWorkouts)
  .patch(workout_controller.updateWorkout);

module.exports = router;
