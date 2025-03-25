const mongoose = require("mongoose");
const { schema } = require("./UserModel");

const Schema = mongoose.Schema;

const petSchema = new Schema({

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Pet belongs to a user
    petname: { type: String, required: true },
    species: { type: String, required: true },
    breed:{type:String, require:true,},
    age: { type: Number },
    profilePic: { type: String },
    medicalHistory:[{type:String,}],
    adoptionStatus: { type: Boolean, default: false },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Posts related to pet
    

},{
    timestamps:true
})

module.exports=mongoose.model("Pet",petSchema)