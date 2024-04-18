/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import profile from "../../assets/profile.png"
import { useSelector } from 'react-redux'
import { getTimesTamp } from "../../utils"
const MessageCard = ({message}) => {
  const { userInfo } = useSelector(state => state.auth)
  const  { selectedConvesation }  = useSelector(state => state.conversation)
 const fromMe = message?.sender_id === userInfo?._id;
 
 const chatUserPosition = fromMe ? "chat-end" : "chat-start";
 const profilePic = fromMe ? userInfo?.picture : selectedConvesation?.picture
 const bgColor = fromMe ? 'bg-secondary-200' : "dark:bg-secondary-800 bg-secondary-100 text-black dark:text-white"
  return (
    <div>
        <div  className={`chat  ${chatUserPosition}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic || profile} />
          </div>
        </div>
        <div className={`chat-bubble ${bgColor}`}>
           {message?.message}
        </div>
        <div className="chat-footer  gap-1 items-center flex text-gray-400 text-[12px] font-normal user-none select-none  ">
            {getTimesTamp(new Date(message?.createdAt))}
          </div> 
      </div>
     
      </div>
  )
}

export default MessageCard