const express = require("express");
const router = express.Router();

const workout_controller =  require('../controllers/workoutController');

router.get("/", workout_controller.getStats);

module.exports = router;
