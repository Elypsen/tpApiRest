const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    pseudo: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    team:{
        type: Schema.Types.ObjectId,
        ref:"Team" 
    }
})
 
const User = mongoose.model('User', userSchema);

module.exports = User;