const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adoptionSchema = new Schema({
    petId:{
        type:Schema.Types.ObjectId,
        ref:"Pet"
    },
    ownerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    adopterId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        enum:['Pending','Approved','Rejected']
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Adoption",adoptionSchema)