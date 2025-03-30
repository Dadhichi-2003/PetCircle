const Message = require ("../models/MessageModel")
const Conversation = require ("../models/CoversationModel");
const { getReceiverSocketId, io } = require("../socket/socket");


const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { textMessage: message } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // Establish the conversation if not started yet.
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add message to conversation
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Emit socket event before sending response
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        // Now send the response
        res.status(200).json({
            message: "Message sent successfully",
            newMessage
        });

    } catch (error) {
        if (!res.headersSent) {  // Prevent multiple responses
            res.status(500).json({
                message: "Error sending message",
                error: error.message
            });
        }
    }
};



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