import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js"
import { getReceiverSocketId , io} from "../socket/server.js";
import asyncHandler from "../middlewares/asyncHandler.js";


const sendMessage = asyncHandler (async(req,res)=> {
    try {
        const { receiver_id, message } = req.body;
        const sender_id = req.user._id
        let conversation = await Conversation.findOne({
            participants: {$all: [receiver_id,sender_id]}
        })
        if(!conversation) {
            conversation = await Conversation.create({
                participants: [receiver_id,sender_id]
            })
        }

        const newMsg = new Message({
             receiver_id,
             message,
             sender_id: req.user._id
        })
        if(newMsg) {
            conversation.messages.push(newMsg._id)
        }
        await Promise.all([conversation.save(), newMsg.save()]);
        const receiverSocketId = getReceiverSocketId(receiver_id);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMsg", newMsg);
		}
        res.status(201).json(newMsg)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('internal server error',error)
    }
})
 const getConversation = asyncHandler(async (req, res) => {
  const { id: receiver_id } = req.params;
  const sender_id = req.user._id;

  // Validate receiver_id as a valid ObjectId
  // if (!receiver_id || !mongoose.isValidObjectId(receiver_id)) {
  //    res.status(400)
  //   throw new Error('Invalid receiver ID')
  // }

  
    // Find conversation with the specified participants
    const conversation = await Conversation.findOne({
      participants: { $all: [receiver_id, sender_id] }
    }).populate('messages');

    // If no conversation is found, return an empty array of messages
    

    // Get messages from the conversation (if conversation exists)
    const messages = conversation?.messages;

    // Return messages to the client
    res.status(200).json(messages );
  } );
 


export {
    sendMessage,
    getConversation
}