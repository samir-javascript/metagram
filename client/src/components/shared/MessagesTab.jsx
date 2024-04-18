/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaEdit, FaAngleDown } from 'react-icons/fa'
import UserConversationTab from '../cards/UserConversationTab'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAllUsersQuery } from '../../slices/UsersApiSlice'

import MessageConveForMobile from './MessageConveFomMobile'



const MessagesTab = () => {
  const {userInfo} = useSelector(state => state.auth)
  const { data:users, isLoading, isError} = useGetAllUsersQuery()
  const { messages :message , selectedConvesation} = useSelector(state => state.conversation)
   
  if(isError || isLoading) return;
  return (
   <>
    {  message && <div className='min-w-full md:hidden '>
        <MessageConveForMobile  />
    </div> }
 <div className={`${message ? "max-md:hidden" : ""} lg:min-w-[400px] max-md:w-full   sticky top-0 border-r h-screen py-7  flex flex-col`}>
 <div className="flex-between px-6 gap-3 mb-4">
  <div className='flex items-center  gap-1'>
     <p className='dark:text-white text-black max-lg:hidden max-md:block
      font-bold text-[17px] '>
        {userInfo?.name}
      </p>
     <FaAngleDown  color="gray" />
  </div>
     <Link to={`/edit_user/${userInfo?._id}`}>
      <FaEdit size={25} className='text-black dark:text-white cursor-pointer' />
      </Link>
 </div>

 <div className='flex px-6 flex-col gap-2'>
     <p className='dark:text-white text-black font-bold text-[15px] '>Messages</p>
 </div>
 <div className='flex flex-col h-full max-md:pb-[1.7rem] mt-2 w-full overflow-y-auto'>
 {users?.map((item)=> (
    <UserConversationTab  user={item} key={item?._id} />
 ))}
 </div>

</div>
    
     
 </>
  )
}

export default MessagesTab