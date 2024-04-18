import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext"
import { useDispatch, useSelector } from "react-redux";
import notificationSound from "../assets/sound.mp3"
import { setMessagese } from "../slices/conversationSlice";
const useListenMessages = ()=> {
    const dispatch = useDispatch()
    const { socket } = useSocketContext()
    const {messages} = useSelector(state => state.conversation)
    useEffect(()=> {
        socket?.on("newMsg",(newMsg)=> {
            const sound = new Audio(notificationSound)
            sound.play()
            dispatch(setMessagese([...messages,newMsg]))
        })
      
        return ()=> socket?.off('newMsg')
    },[socket,dispatch,messages])
}
export default useListenMessages