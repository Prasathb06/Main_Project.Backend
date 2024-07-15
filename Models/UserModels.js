const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username :{type:String,require:true},
    email : {type:String,require:true},
    contact : {type:String,require:true},
    role : {type:String,default:'user'}, 
    password : {type:String,require:true}
}) 
const UserModels = mongoose.model("user",UserSchema)
module.exports = UserModels