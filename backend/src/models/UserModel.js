const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
    role: { type: String, enum: ["User", "Admin", "Expert"] ,default:"User"},
   
    profilePic: {
      type: String,
    },
    bio:{
      type:String,
    },
    location:{
      type:String,
    },
    pets:[{
      type:Schema.Types.ObjectId,
      ref:"Pet",
    }],
    joinedCommunities:[{
      type:Schema.Types.ObjectId,
      ref:"Communities"
    }],
    
    followers:[{
      type:Schema.Types.ObjectId,
      ref:"User"
    }],

    following:[{
      type:Schema.Types.ObjectId,
      ref:"User"
    }],

    posts:{
      type:Schema.Types.ObjectId,
      ref:"Post"
    },
    profilePicture : {
      type:String,

    },
    //for experts only  

    expertise: { type: String, 
                default: function(){return this.role==="Expert"?null:undefined;}},
    experience: { type: Number, 
                  default:function(){return this.role==="Expert"?null:undefined;} },
    services: { type: [String], 
                default:function(){return this.role==="Expert"?[]:undefined;} },
    contact:{type:String}
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model("User", userSchema);
