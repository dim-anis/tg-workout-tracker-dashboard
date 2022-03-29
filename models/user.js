const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            first: { type: String },
            last: { type: String }
        },
        current_routine: { type: Schema.Types.ObjectId, ref: 'Routine'},
        last_workout: { type: String }
    }
)

module.exports = mongoose.model("User", UserSchema);