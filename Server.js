const express = require("express")
const mongoose = require("mongoose")
const app  = express()

app.use(express.json())
app.use(express.urlencoded())

const cors = require("cors")
app.use(cors())

const UserRouter = require("./Router/UserRouter")
app.use(UserRouter)

mongoose.connect("mongodb://127.0.0.1:27017/bookhub002")
.then(()=>{
  console.log("DB connected successfully");
})
.catch((err)=>{
  console.log("Connection Failed",err);
})

const port = 4000;
app.listen(port,()=>{
  console.log('Server running on 4000');
})