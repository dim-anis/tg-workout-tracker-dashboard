const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/verifyJWT");

const workout_controller = require("../controllers/workoutController");

router.get("/", authenticateToken, workout_controller.getAllWorkouts);

module.exports = router;
