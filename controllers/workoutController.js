const Set = require("../models/set");
const subMonths = require("date-fns/subMonths");
const startOfDay = require("date-fns/startOfDay");

let oneMonthAgo = subMonths(new Date(), 1);
let twoMonthsAgo = subMonths(new Date(), 2);

const getStats = async (req, res) => {
  try {
    const data = await Set.find({ createdAt: 
      { $gte: startOfDay(twoMonthsAgo) }}, 
      'weight exercise repetitions rpe createdAt').lean();
      return res.json(data);
  }
  catch (e) {
    console.log(`Error: ${e}`);
    return res.status(400).json({error: `Error: ${e}`});
  }
}

module.exports.getStats = getStats;