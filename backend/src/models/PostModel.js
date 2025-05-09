    const mongoose = require("mongoose");

    const Schema = mongoose.Schema;

    const postSchema= new Schema({
        pet:{
            type:Schema.Types.ObjectId,
            ref:"Pet"
        },//post belong to pet
        caption:{
            type:String,
        },
        media:[{
            type:String,
            required:true
        }],
        likes:[{
            type:Schema.Types.ObjectId,
            ref:"User",
            default: [] 
        }],
        comments:[{
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }],
        postedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        community:{
            type:Schema.Types.ObjectId,
            ref:"Community"
        }

    },{
        timestamps:true,
    })

    module.exports=mongoose.model("Post",postSchema)