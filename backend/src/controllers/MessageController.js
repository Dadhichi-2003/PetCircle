const Message = require ("../models/MessageModel")
const Conversation = require ("../models/CoversationModel");


const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {textMessage:message} = req.body;
      
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });
        // establish the conversation if not started yet.
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message 
        });

       
        if(newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(),newMessage.save()])

        res.status(200).json({
            message:"message sent succesfully",
            newMessage
        })

        // implement socket io for real time data transfer
      
    } catch (error) {
        res.status(500).json({
            message:"not happeninig",
            error:error.message
        })
    }
}


const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');
        if(!conversation) return res.status(200).json({success:true, messages:[]});

        return res.status(200).json({success:true, messages:conversation?.messages});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getMessage,
    sendMessage
}