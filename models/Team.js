const mongoose = require("mongoose");
const {Schema} = mongoose;

const teamSchema = Schema({
    "name": {
        type:String,
        unique: true,
    },
    "members":[
        {
            type: Schema.Types.ObjectId,
            ref:'User',
        }
    ],
})

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;