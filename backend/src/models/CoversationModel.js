const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message"
    }],
    
},{
    timestamps:true
})

module.exports= mongoose.model("Coversation",conversationSchema)