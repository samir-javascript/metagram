/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link} from 'react-router-dom'
import profile from "../../assets/profile.png"
import { getTimesTamp } from '../../utils'
import {  FaRegHeart, FaRegComment, FaHeart } from 'react-icons/fa'
import savedIcon from "../../assets/icons/save_symbol.png"
import saveIcon from '../../assets/icons/regsave_symbol.png'
import {  useGetUserQuery, useToggleFollowMutation } from '../../slices/UsersApiSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useDeletePostMutation, useToggleLikePostMutation,useToggleSavePostMutation} from "../../slices/PostsApiSlice"
import AddComment from '../search/AddComment'
import { useSelector } from 'react-redux'
import PostModel from '../modals/PostModel'
import { useState } from 'react'


import { useToast } from "@/components/ui/use-toast"
import Dropdown from './Dropdown'

const PostCard = ({item,refetch}) => {
  const [isOpen,setIsOpen] = useState(false)
  const { toast } = useToast()
  const [likePost] = useToggleLikePostMutation()
  const [savePost] = useToggleSavePostMutation()
  const [toggleFollow] = useToggleFollowMutation()
  const {data:currentUser,isLoading,isError,refetch:refetchUserInfo} = useGetUserQuery()


     const dateString = item?.createdAt 
     const dateObject = new Date(dateString);
     const [deletePost] = useDeletePostMutation()
     const  {userInfo} = useSelector(state => state.auth)
    const handleToggleFollow = async()=> {
         const res = await toggleFollow({
            userToFollowId: item?.creator?._id
         })
         if(res.error) {
             toast(
               {
                  title:"Failed to complete this action!",
                  variant: "destructive"
               }
             )
         }
         toast({
            title: currentUser?.following?.includes(item?.creator?._id)  ? "Unfollowed successfuly" : "followed successfuly"
         })
         refetchUserInfo()
    }
     const handleDeletePost = async(id)=> {
        try {
          const res = await deletePost({
            postId : id
           })
        if(res.error) {
          toast({
            title: "Failed to complete this action!",
            variant: "destructive"
          })
          return;
        }
        toast({
          title: "Post Deleted successfuly"
        })
          refetch()
          refetchUserInfo()
        } catch (error) {
           console.log(error)
        }
     }
     const handleLikePost = async()=> {
         try {
           const res = await likePost({
            postId: item?._id
            })
            if(res.error) {
             toast({
              title: "Failed to complete this action!",
              variant: "destructive"
             })
              return;
            }
            toast({
              title: item?.upvotes?.find(item => item?._id === userInfo?._id) ? "Post has been unliked successfuly" : "Post has been liked successfuly"
             
             })
           refetch()
           refetchUserInfo()
           // toast info here
         } catch (error) {
           console.log(error)
         }
     }
     const handleSavePost = async()=> {
      try {
        const res = await savePost({
         postId: item?._id
         })
         if(res.error) {
           toast({
            title: "Failed to complete this action!",
            variant: "destructive"
           })
           return;
         }
         toast({
          title: currentUser?.saved?.includes(item?._id) ? "Post has been removed from your collection successfuly" : "Post has been added to your collection successfuly"
         
         })
        refetch()
        refetchUserInfo()
        // toast info here
      } catch (error) {
        console.log(error)
      }
  }
  if(isLoading) return;
  if(isError) return <p>error</p>

  return (
    <>
    <div className="bg-transparent lg:p-7 w-full flex flex-col mt-5 border-b border-[#DBDBDB] max-w-[500px] ">
        <div className="flex-between gap-3 mb-3">
             <Link className='flex items-center gap-2' to={`/profile/${item?.creator?._id}`}>
                   <img src={item?.creator?.picture || profile} alt="profile"
                    className='w-[40px] h-[40px] rounded-full object-contain ' />
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                           <p className='sm:text-[16px] text-[13px] font-semibold text-black dark:text-white  '>
                               {item?.creator?.name}
                           </p>
                           <p className='text-gray-500 lg:text-[14px] font-semibold text-[12px] lg:font-normal leading-[140%] '>•</p>
                           <p className='text-gray-400 text-[14px] font-normal user-none select-none '>
                               {getTimesTamp(dateObject)}
                           </p>
                        </div>
                        <p className='text-[12px]  dark:text-white text-[#333] font-normal leading-[140%] '>
                          {item?.location}
                        </p>
                    </div>
             </Link>
             <Dropdown item={item}
              handleDeletePost={handleDeletePost}
              handleToggleFollow={handleToggleFollow}
              currentUser={currentUser}
              userInfo={userInfo}
              handleSavePost={handleSavePost} />

        </div>
        <Link to={`/post/${item?._id}`}>
            <img src={item?.media} alt="demo" className='post-card_img' />
        </Link>
        <div className="flex-between gap-3">
             <div className="flex items-center gap-4">
              
 <div onClick={handleLikePost}>
 {item?.upvotes?.find(item => item?._id === userInfo?._id) ? (
<FaHeart  color="red" cursor="pointer"  size={22} />
 ): (
  <FaRegHeart   cursor="pointer" className='text-black dark:text-white' size={22} />)}
 </div>


              
              
                 
                 <FaRegComment cursor="pointer" className='text-black dark:text-white'  size={22} />
             </div>
             <div onClick={handleSavePost}>
               {currentUser?.saved?.includes(item?._id) ? (
               <img src={savedIcon} alt="save icon" className='w-[24px]  cursor-pointer h-[22px] object-contain ' />
               ): (
                <img src={saveIcon} alt="save icon" className='w-[24px] dark:invert-[100%]  cursor-pointer h-[24px] object-contain ' />
               )}
           
             </div>
           
        </div>
        {item?.upvotes.length > 0 && (
 <div className='flex items-center mt-3 gap-1'>
 <img src={item.upvotes[0].picture || profile} className='w-[14px] h-[14px] rounded-full object-contain ' alt="profile" />
 <p className=' text-[#111] dark:text-white text-[13px] font-medium leading-[140%] '>{item?.upvotes?.length} {item.upvotes.length === 1 ? "like" : "likes"} </p>
</div>
        )}
       
        <div className='mt-2 flex flex-col gap-3'>
            <p className=' text-[#000] dark:text-white text-[13px] line-clamp-3 font-normal leading-[140%] '><span className='font-semibold text-black dark:text-white '>{item?.creator?.name} </span>{item?.caption} </p>
            <div className='flex items-center gap-1 flex-wrap' >
            {item?.tags?.map((tag,i)=> (
              
                     <p key={i}  className='text-secondary-200 text-[13px]  font-normal leading-[140%]'>
                       #{tag}
                     </p>
                    
                    ))}
            </div>
            <p  onClick={()=> setIsOpen(true)} className='text-[#737373] font-normal text-[14px] cursor-pointer leading-[140%] '>View all {item?.comments?.length} comments</p>
             <AddComment refetch={refetch} post_id={item?._id} />
        </div>
      
        <PostModel handleLikePost={handleLikePost} handleSavePost={handleSavePost} currentUser={currentUser} refetch={refetch} post={item} isOpen={isOpen} onClose={()=> setIsOpen(false)} />
    </div>
  
    </>
  )
}

export default PostCard