/* eslint-disable no-unused-vars */

//import { useDispatch, useSelector } from "react-redux"
import ConversationArea from "../../components/shared/ConversationArea"
import MessagesBar from "../../components/shared/MessagesBar"
import MessagesTab from "../../components/shared/MessagesTab"
// import { useGetMessagesQuery } from "../../slices/ConversationApiSlice"
// import { setMessagese } from "../../slices/conversationSlice"
// import { useEffect } from "react"
// import { useSocketContext } from "../../context/socketContext"
// import useListenMessages from "../../utils/useListenMessages"



const Chat = () => {
  // const dispatch = useDispatch()
  // const { socket} = useSocketContext()
  // const {selectedConvesation} = useSelector(state => state.conversation)
    
 
 
  
  // const { data: messages, isLoading: fetching, isError, refetch } =  useGetMessagesQuery(selectedConvesation?._id !== undefined && selectedConvesation?._id);
 
  //  const { messages :message} = useSelector(state => state.conversation)
 
 
  //   useEffect(()=> {
     
  //         dispatch(setMessagese(messages))
     
  // },[dispatch,messages])
  // useListenMessages()
 
  return (
    <div className="flex  ">
      <MessagesBar />
      <MessagesTab />
      <ConversationArea   />
    </div>
  )
}

export default Chat