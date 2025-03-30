const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

module.exports= mongoose.model("Message",messageSchema);