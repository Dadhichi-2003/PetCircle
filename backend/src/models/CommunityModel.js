const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const communitySchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    poster:{
        type:String,
        
    },
    description:{
        type:String,
        required:true
    },
    //members who joined 
    members:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    //user who created the community
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }]

    
    
},{
    timestamps:true
})


module.exports=mongoose.model("Community",communitySchema);

