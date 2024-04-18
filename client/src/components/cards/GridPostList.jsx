/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import saveIcon from "../../assets/icons/saveicon.png"
import savedIcon from "../../assets/icons/save_symbol.png"
import profile from "../../assets/profile.png"
import { useToggleLikePostMutation, useToggleSavePostMutation } from '../../slices/PostsApiSlice';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../slices/UsersApiSlice';
import { useToast } from "@/components/ui/use-toast"

const GridPostList = ({item,showStates = false, user, showUser = false, showIndicators = false, refetch}) => {
  const [LikePost] = useToggleLikePostMutation()
  const {userInfo} = useSelector(state => state.auth)
  const [savePost] = useToggleSavePostMutation()
  const {data:currentUser,isLoading,isError,refetch:refetchUserInfo} = useGetUserQuery()
  const [hoveredPost, setHoveredPost] = useState(null);
  const { toast } = useToast()
  if(isLoading) return <p>Loading</p>
  if(isError) return <p>error </p>

     const handleToggleLikePost = async ()=> {
        try {
          const res = await LikePost({
               postId: item?._id
           })
           if(res.error) {
            toast({
              title: "Failed to complete this action!"
            })
           }
           
           refetch()
           toast({
            title: item?.upvotes?.includes(userInfo?._id) ? "Post has been Unliked successfuly" : "Post has been liked successfuly"
           })

        } catch (error) {
           console.log(error)
        }
     }
     const handleToggleSavePost = async()=> {
         try {
           const res = await savePost({
              postId: item?._id
           })
           if(res.error) {
              toast({
                title: "Failed to complete this action!"
              })
           }
           toast({
            title: currentUser?.saved?.includes(item?._id) ? "Post has been removed from your collection successfuly" : "Post has been added to your collection successfuly"
           })
          refetchUserInfo()
         } catch (error) {
           console.log(error)
         }
     }
  
  const truncate = (string,number)=> {
        return string.length > number ? string.substring(0,number) + "..." : string;
  }
  return (
    <>
    <li onMouseEnter={() => setHoveredPost(item._id)}
          onMouseLeave={() => setHoveredPost(null)} className="relative h-[320px] ">
      <Link to={`/post/${item?._id}`} className="flex   rounded-[24px] dark:border-none border border-[#DBDBDB] overflow-hidden cursor-pointer w-full h-full">
         <img width={1000} height={1000} className='w-full h-full object-cover' src={item.media} alt="" />
      </Link>
      {showUser && (
          <div className='absolute bottom-0 px-1 py-5 flex-between gap-2
           rounded-b-[24px] bg-gradient-to-t from-[#101012] to-transparent w-full  '>
            <Link className='flex items-center gap-1' to={`/profile/${item?.creator?._id}`}>
              <img src={item?.creator?.picture || profile }
               alt={item?.creator?.name} width={24} height={24}
                className='rounded-full object-contain  cursor-pointer' />
                <p className='text-white font-bold text-base '>{truncate(item?.creator?.name,8)} </p>
                </Link>
            {showIndicators && (
               <div className='flex items-center gap-2'>
                 <div className='flex items-center gap-1 mr-1'>
                  <div onClick={handleToggleLikePost}>
                     {item?.upvotes?.includes(user?._id) ? (
                       <FaHeart cursor="pointer" size={19} color='red' />
                     ): (
                      <FaRegHeart cursor="pointer" size={19} color='white' />
                     )}
                    
                  </div>
                   
                   <p className='font-bold text-white text-sm '>
                     {item?.upvotes.length}
                   </p>
                 </div>
                  
                   <FaComment size={19} color="white" />
                   <div onClick={handleToggleSavePost}>
                     {user?.saved.includes(item?._id) ? (
                       <img className='w-[30px] h-[24px] cursor-pointer  object-contain ' src={savedIcon} alt="icon"  />
                     ): (
                      <img className='w-[30px] h-[24px] cursor-pointer invert-[100%] object-contain ' src={saveIcon} alt="icon"  />
                     )}
                      
                   </div>
                  
               </div>
            )}
          </div>
      )}
        {showStates &&  hoveredPost === item?._id  && (
           <Link to={`/post/${item?._id}`} className='absolute rounded-[24px] bg top-0 w-full left-0  h-full inset-0 flex items-center gap-7 justify-center '>
           <div className="flex  items-center gap-2">
             <FaHeart color='white' size={22} />
             <p className='text-white font-medium'>
               {item?.upvotes?.length}
             </p>
           </div>
           <div className="flex  items-center gap-2">
             <FaComment color='white' size={22} />
             <p className='text-white font-medium'>
               {item?.comments?.length}
             </p>
           </div>
         </Link>
        )}
    </li>
       
    </>
  )
}

export default GridPostList