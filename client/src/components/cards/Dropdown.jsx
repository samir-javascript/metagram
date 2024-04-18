/* eslint-disable react/prop-types */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

const Dropdown = ({userInfo,currentUser,item,handleDeletePost,handleSavePost,handleToggleFollow}) => {
  
  return (
    <DropdownMenu>
  <DropdownMenuTrigger className='border-none outline-none bg-transparent'>
      <div className="border-none no-focus outline-none text-[25px] dark:text-white text-black ">...</div>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white z-[99999999999999999999999] dark:bg-secondary-300 shadow w-[300px] border
   border-secondary-100 dark:border-[#222] flex flex-col text-center items-center justify-center">
   {item?.creator?._id !== userInfo?._id && (
    <DropdownMenuItem onClick={handleToggleFollow} className="p-2 cursor-pointer hover:!bg-secondary-100 dark:!hover:bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#222] w-full ">
         <p className='text-red-500 dark:text-white font-semibold leading-[1.7]   text-[14px] '>
            {currentUser?.following?.includes(item?.creator?._id) ? 'Unfollow' : "Follow"}
         </p>
    </DropdownMenuItem>
   )}
    
     {item?.creator?._id === currentUser?._id && (
  <DropdownMenuItem  onClick={()=> handleDeletePost(item?._id)} className="p-2 cursor-pointer hover:!bg-secondary-100 dark:hover:!bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#222] w-full ">
  <p className='text-red-500 dark:text-white font-semibold leading-[1.7]   text-[14px] '>Delete Post</p>
</DropdownMenuItem>
     )}
  {item?.creator?._id === currentUser?._id && (
    <DropdownMenuItem className="p-2 cursor-pointer hover:!bg-secondary-100 dark:hover:!bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#222] w-full ">
  <Link to={`/edit_post/${item?._id}`}>
    <p className='text-green-500 dark:text-white font-semibold leading-[1.7]   text-[14px] '>Edit Post</p>
    </Link>
</DropdownMenuItem>
  )} 
   
    <DropdownMenuItem onClick={handleSavePost} className="p-2 cursor-pointer hover:!bg-secondary-100 dark:hover:!bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#222] w-full ">
         <p className='text-black dark:text-white font-medium leading-[1.7]   text-[14px] '>
         {currentUser?.saved?.includes(item?._id) ? "Remove from saved posts" : "Save Post"}
         </p>
    </DropdownMenuItem>
    <DropdownMenuItem className="p-2 cursor-pointer hover:!bg-secondary-100 dark:hover:!bg-transparent text-center flex justify-center border-b border-secondary-100  dark:border-[#222] w-full ">
        <Link to={`/post/${item?._id}`}>
         <p className='text-black dark:text-white font-medium leading-[1.7]   text-[14px] '>
          Go To Post</p>
          </Link>
    </DropdownMenuItem>
    <DropdownMenuItem className="p-2 cursor-pointer hover:!bg-secondary-100 dark:hover:!bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#222] w-full ">
         <p className='text-black dark:text-white font-medium leading-[1.7]   text-[14px] '>Cancel</p>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default Dropdown