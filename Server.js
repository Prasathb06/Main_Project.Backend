const express = require("express")
const app  = express()


app.use(express.json())
app.use(express.urlencoded())

const cors = require("cors")
app.use(cors())

const mongoose = require("mongoose")
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/bookhub002"

const UserRouter = require("./Router/UserRouter")
app.use(UserRouter)

mongoose.connect(MONGOOSE_URL)
.then(()=>{
  console.log("DB connected successfully");
})
.catch((err)=>{
  console.log("Connection Failed",err);
})


app.listen(4000,()=>{
  console.log('Server running on 4000');
})