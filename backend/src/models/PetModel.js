const mongoose = require("mongoose");
const { schema } = require("./UserModel");

const Schema = mongoose.Schema;

const petSchema = new Schema({

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    petName:{
        type:String,
        required:true
    },
    species:{
        type:String,
        require:true
    },
    breed:{
        type:String,
        require:true,
    },
    age:{
        type:Number,

    },
    gender:{
        type:String,
        Enum:["male","female","other"]
    },
    medicalHistory:[{
        type:String,
    }],
    profilePic: {
        type: String,
      },
},{
    timestamps:true
})

module.exports=mongoose.model("Pet",petSchema)