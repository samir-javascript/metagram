/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import profile from "../../assets/profile.png"
import { setSelectedConversation } from "../../slices/conversationSlice"
import { useNavigate } from "react-router-dom"
import { useSocketContext} from '../../context/socketContext'
const UserConversationTab = ({user}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = ()=> {
      dispatch(setSelectedConversation({...user}))
   
   
  }
  const {selectedConvesation} = useSelector(state => state.conversation)
  const isSelected = selectedConvesation?._id === user?._id;
  const { onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(user?._id)
  return (
    <div onClick={handleClick} className={`${isSelected ? "bg-secondary-100  dark:bg-secondary-300" : "" }
     flex w-full gap-4 px-6 py-[0.75rem]  
    cursor-pointer hover:bg-secondary-100
     dark:hover:bg-secondary-300 dark:text-white text-black items-center`}>
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-[50px] h-[50px] object-contain rounded-full">
            <img  src={user?.picture || profile} alt="profile" />
            </div>
             
          </div>
          <div className="flex flex-col max-md:flex max-lg:hidden">
               <p className="dark:text-white text-black font-medium text-[15px]  ">
                  {user?.name}
               </p>
               <p className="text-gray-500 font-normal leading-[140%] text-[13px] ">
                  {user?.username}  
               </p>
          </div>
    </div>
  )
}

export default UserConversationTab