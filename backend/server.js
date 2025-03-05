const express = require ("express");
const mongoose = require("mongoose")
const cors =require("cors")

const app=express();
app.use(cors())
app.use(express.json())




//user routes
const UserRoute = require("./src/routes/UserRoute")
app.use(UserRoute);

//profile routes
const ProfileRoute = require("./src/routes/ProfileRoute");
app.use("/profile",ProfileRoute);


//db connection
mongoose.connect("mongodb://127.0.0.1:27017/petcircle").then(()=>{
    console.log("DataBase Connected")
})

//server connection
const PORT=3000
app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})