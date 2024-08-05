const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username :{type:String,require:true},
    email : {type:String,require:true},
    contact : {type:String,require:true}, 
    password : {type:String,require:true},
    cPassword : {type:String,require:true}
}) 
const UserModels = mongoose.model("user",UserSchema)
module.exports = UserModels