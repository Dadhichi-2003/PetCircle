const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema= new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        
    },
    images:[{
        type:String,
        require:true
    }],
    likes:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],

},{
    timestamps:true,
})

module.exports=mongoose.model("Post",postSchema)