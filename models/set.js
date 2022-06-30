const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetSchema = new Schema(
  {
    weight: { type: Number, required: true },
    exercise: { type: String, required: true },
    repetitions: { type: Number, required: true },
    rpe: { type: Number, required: true },
    notes: { type: String }
  },
  { timestamps: true, }
);

module.exports = mongoose.model("Set", SetSchema);