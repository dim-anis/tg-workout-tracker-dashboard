const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Set = require("../models/set");
const subMonths = require("date-fns/subMonths");
const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");

// subtracting One Month from Today to find all sets from the last 30 days
let oneMonthAgo = subMonths(new Date(), 1);

router.get("/workouts", (req, res) => {
  Set.find(
    {
      createdAt: {
        $gte: startOfDay(oneMonthAgo),
      },
    },
    "weight repetitions createdAt",
    function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        return res.json(data);
      }
    }
  );
});

router.get("/last-workout", (req, res) => {
  User.find({}, "last_workout", function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      return res.json(data);
    }
  });
});

module.exports = router;
