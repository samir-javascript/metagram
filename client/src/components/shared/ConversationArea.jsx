/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom"
import profile from "../../assets/profile.png"
import Loader from '../../assets/loadersaver.gif'
import { Button} from "../ui/button"
import { CiSearch} from 'react-icons/ci'
import { useState, useRef, useEffect } from "react"
import { useToast} from '../ui/use-toast'

import messageIcon from '../../assets/message.png'
import { useSendMessageMutation , useGetMessagesQuery} from '../../slices/ConversationApiSlice'
import { useDispatch, useSelector } from "react-redux"
import MessageCard from "../cards/MessageCard"
import { useSocketContext } from "../../context/socketContext"
import { setMessagese } from "../../slices/conversationSlice"
import useListenMessages from "../../utils/useListenMessages"
const ConversationArea = () => {
  const [SendMessage, {isLoading}] = useSendMessageMutation()
   const lastIndexRef = useRef()
  const {toast} = useToast()
  const [value,setValue] = useState('')

  
  const {selectedConvesation} = useSelector(state => state.conversation)
    
  const dispatch = useDispatch()
  const { socket} = useSocketContext()
  
    
 
 const id =  selectedConvesation?._id;
  
  const { data: messages, isLoading: fetching, isError, refetch } =  useGetMessagesQuery(id);
   
   const { messages :message} = useSelector(state => state.conversation)

 
    useEffect(()=> {
     
          dispatch(setMessagese(messages))
     
  },[dispatch,messages])
  useListenMessages()
 
 
 
 const handleSendMessage = async(e)=> {
  e.preventDefault()
  try {
     const res = await SendMessage({
        message: value,
        receiver_id: selectedConvesation?._id,
        id: selectedConvesation?._id
     })
     if(res.error) {
        toast({
         title: "couldn't send message!",
         variant: "destructive"
        }) 
     }
     setValue('')
     refetch()
     toast({
       title: "message has been sent succeesfuly!",
      
      }) 
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
   setTimeout(()=> {
      lastIndexRef.current?.scrollIntoView({behavior: "smooth"})
   } , 100)
}, [message])
if(fetching) {
  return <p>loading...</p>
 }

  return (
    <section className="flex-1 flex  max-md:hidden flex-col h-screen w-full">
{selectedConvesation ? (
  <>
  <div className="fixed z-[99] dark:bg-black bg-white  p-4 top-0 w-full border-b dark:border-[#222] ">
            <Link className="flex items-center h-full w-full  gap-3" to={`/profile/${selectedConvesation?._id}`}>
                <img src={selectedConvesation?.picture  || profile} alt="profile"
                 width={50} height={50} className="object-contain rounded-full" />
                 <p className="font-bold dark:text-white text-black text-[17px] ">
                   {selectedConvesation?.name}
                 </p>
            </Link>
        </div>
        <div  className="overflow-y-auto h-full">
        <div className="w-full pt-[8rem] flex flex-col ">
           <div className="flex flex-col w-full  justify-center items-center">
               <img src={selectedConvesation?.picture || profile} alt="profile"
                width={80} height={80} className="rounded-full" />
                 <p className="text-black mt-2 font-bold text-[20px] leading-[140%] dark:text-white">
                   {selectedConvesation?.name}
                 </p>
                 <p className="text-gray-400 font-medium text-[15px] ">{selectedConvesation?.username}  · Instagram</p>
                 <Link to={`/profile/${selectedConvesation?._id}`}>
                     <Button type="button" className="bg-secondary-100 dark:hover:bg-secondary-300 dark:bg-secondary-800 dark:text-white mt-5">
                        View profile
                     </Button>
                 </Link>
           </div>
      </div>
      <div className="px-6  mt-12">
      {message !== null && message?.length > 0 && message?.map((item)=> (
        <div key={item?._id} ref={lastIndexRef}>
 <MessageCard message={item} />
        </div>
     
     ))}
      </div>
        </div>
       <div className="mt-auto mx-6 mb-3">
           <form onSubmit={handleSendMessage} className="flex py-2.5 mx-auto px-6 rounded-[15px] dark:bg-black bg-white border
            dark:border-[#222] border-secondary-100 items-center w-full
             justify-between gap-4">

                  {!value && <CiSearch color='gray' size={22} /> } 
                  <input value={value} onChange={(e)=> setValue(e.target.value)} className="flex-1 dark:text-white text-black bg-transparent no-focus outline-none border-none" type="text" placeholder="Message..." />
                  {value && isLoading ? <img src={Loader} width={24} height={24} alt="loader" /> :   null}
                 {value && !isLoading &&  <button   type="submit" className="text-secondary-200 capitalize
                  text-[13px] border-none outline-none bg-transparent font-semibold hover:text-blue-700 transition-all duration-150">
                    Post </button>} 
                 
           </form>
       </div>
  </>
): (
     <div className="flex h-full flex-col w-full justify-center items-center">
         <img src={messageIcon} alt="message" width={150} height={150} />
         <p className="text-black dark:text-white font-semibold text-[22px] leading-[140%] ">Your messages</p>
         <p className="text-gray-500 font-medium text-[14px] my-2 ">Send private photos and messages to a friend or group</p>
         <p className="text-gray-400 font-normal text-[12px] ">start the conversation now.</p>
     </div>
)}
        
   
    
    </section>
  )
}

export default ConversationArea