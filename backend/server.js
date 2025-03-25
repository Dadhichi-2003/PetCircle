const express = require ("express");
const mongoose = require("mongoose")
const cors =require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")

dotenv.config({});
const app=express();

PORT=process.env.PORT || 5000


//middleware

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const corsOptions ={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

//user routes
const UserRoute = require("./src/routes/UserRoute")
app.use(UserRoute);

//pet routes

const PetRoutes=require("./src/routes/PetRoutes")
app.use("/pet",PetRoutes)

//post routes

const PostRoutes = require("./src/routes/PostRoutes");
app.use("/posts",PostRoutes)

//message routes

const MessageRoutes = require("./src/routes/MessageRoutes");
app.use("/messages",MessageRoutes)

//community routes

const CommunityRoutes = require("./src/routes/CommunityRoutes");
app.use("/community",CommunityRoutes)

//Adoption routes

const AdoptionRoutes = require("./src/routes/AdoptionRoutes");
app.use("/Adoption",AdoptionRoutes)

//db connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DataBase Connected")
})

//server connection

app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})