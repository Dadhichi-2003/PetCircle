const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const commentSchema =  new Schema({
    postId :{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        require:true
    },
    
},{
    timestamps:true
})

module.exports=mongoose.model("Comments",commentSchema);