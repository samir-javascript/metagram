/* eslint-disable react/prop-types */

import profile from "../../assets/profile.png"
import savedIcon from "../../assets/icons/save_symbol.png"
import saveIcon from '../../assets/icons/saveicon.png'
import {
    Dialog,
    DialogContent,
    
   
  } from "@/components/ui/dialog"
 import Dropdown from '../cards/Dropdown'
import { Link } from "react-router-dom"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import AddComment from "../search/AddComment"
import { getTimesTamp } from "../../utils"
import {useToast} from "../ui/use-toast"
import { useSelector } from "react-redux"
import { useToggleFollowMutation } from "../../slices/UsersApiSlice"
import { useDeletePostMutation } from "../../slices/PostsApiSlice"
const PostModel = ({isOpen,onClose,post,refetch,currentUser, rf,handleLikePost,handleSavePost}) => {
  const dateString = post.createdAt
  
  const dateObject = new Date(dateString);
  const {toast} = useToast()
  const [toggleFollow]  = useToggleFollowMutation()
  const [deletePost] = useDeletePostMutation()
  const { userInfo} = useSelector(state => state.auth)
  const handleToggleFollow = async()=> {
    const res = await toggleFollow({
       userToFollowId: post?.creator?._id
    })
    if(res.error) {
        toast(
          {
             title:"Failed to complete this action!"
          }
        )
    }
    toast({
       title: currentUser?.following?.includes(post?.creator?._id)  ? "Unfollowed successfuly" : "followed successfuly"
    })
    rf()
}
const handleDeletePost = async(id)=> {
   try {
     const res = await deletePost({
       postId : id
      })
   if(res.error) {
     toast({
       title: "Failed to complete this action!"
     })
     return;
   }
   toast({
     title: "Post Deleted successfuly"
   })
     refetch()
    rf()
   } catch (error) {
      console.log(error)
   }
}
  return (
    <Dialog  className='dark:text-white text-black' open={isOpen} onOpenChange={onClose}>
    
    <DialogContent className='bg-white z-[999999999999] max-lg:h-screen dark:bg-black max-w-5xl p-0 m-0 mx-auto h-[600px] '>
    <div className='flex lg:flex-row  flex-col items-start w-full h-full'>
        <div className="lg:flex-[0.75] w-full lg:h-full h-[500px] max-sm:hidden object-cover">
            <img className="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px] " src={post?.media} alt={post?.caption} />
        </div>
        <div className="flex-1 w-full h-full">
           <div className="flex flex-col">
               <div className="flex-between px-4 w-full gap-4  border-b  border-secondary-100  dark:border-[#222]">
                    <div className="flex items-center gap-3 text-[14px] py-3 w-full " >
                         <img className="w-[40px] h-[40px] rounded-full " src={post?.creator?.picture || profile} alt="profile" />
                         <div className="flex-col flex gap-1">
                            <p className="text-black dark:text-white font-semibold ">
                               {post?.creator?.name}
                            </p>
                            <p className="text-black dark:text-white font-medium text-[12px] leading-[140%] ">Original photo</p>
                         </div>
                         
                    </div>
                    <Dropdown item={post}
              handleDeletePost={handleDeletePost}
              handleToggleFollow={handleToggleFollow}
              currentUser={currentUser}
              userInfo={userInfo}
              handleSavePost={handleSavePost} />
               </div>
               {/* caption section */}
                 <div className="flex w-full px-4 py-6 items-start justify-start gap-3">
                     <div className="">
                         <img className="w-[40px] h-[40px] rounded-full  " src={post?.creator?.picture || profile} alt="profile" />
                     </div>
                     <div className="flex-1 flex flex-col gap-6 ">
                     <Link to='/profile/5455'>
                     <span className="text-black dark:text-white line-clamp-3 text-[13px] font-medium ">{post?.creator?.name}  {post?.caption} </span> 
                     </Link>
                     <div className="flex flex-col gap-2">
                     <div className='flex items-center gap-1 flex-wrap' >
                    {post?.tags?.map((tag,i)=> (
              
                     <p key={i}  className='text-secondary-200 cursor-pointer text-[13px]  font-normal leading-[140%]'>
                       #{tag}
                     </p>
                    
                    ))}
            </div>
              <div className="flex items-center gap-2">
                    <p className="text-gray-400 font-normal text-[12px] ">
                    {getTimesTamp(dateObject)}
                    </p>
                    <p className="dark:text-white  text-black text-[12px] font-normal cursor-pointer ">see transition</p>
              </div>
                     </div>
                    
                     </div>
                     
                 </div>
               {/* caption section ends */}
               {/* people's comments section */}
               <div className="overflow-y-scroll bg-white pt-2 pb-4 dark:bg-black px-6   max-sm:h-[600px] md:h-[250px] lg:h-[200px] flex flex-col gap-5">
    {post?.comments?.length > 0 ? post?.comments.map((item)=> (
        <div className="flex items-start justify-start gap-3" key={item}>
            <img className="w-10 h-10 rounded-full " src={item?.user_id?.picture || profile} alt="profile" />
            <div className="flex-col flex gap-1">
                <p className="text-black dark:text-white text-[15px] font-semibold">
                   {item?.user_id?.name}
                </p>
                <p className="text-black dark:text-white text-[13px] font-medium leading-[140%] ">
               {item?.content} </p>
                <p className="text-gray-400 font-normal text-[12px] "> {getTimesTamp(new Date(item?.createdAt))}</p>
               
            </div>
        </div>
    )): (
        <div className="flex mt-5 items-center justify-center flex-col">
            <h4 className="text-2xl font-bold text-black dark:text-white">No comments yet.</h4>
            <p className="font-normal text-[#111] dark:text-gray-300 text-[14px] leading-[140%] mt-2 ">start the conversation.</p>
        </div>
    )}
</div>
                 {/* people.'s comments section ends */}
                {/* bottom section */}
                  <div className="my-auto border-t flex flex-col border-secondary-100  dark:border-[#111]   w-full">
                    <div className="flex flex-col w-full py-2.5 border-b  border-secondary-100  dark:border-[#222] ">
                    <div className="flex-between px-6   w-full gap-4">
                          <div className="flex items-center gap-5">
                            <div onClick={handleLikePost}>
                              {post?.upvotes.find((item)=> item?._id === userInfo?._id) ? (
                                <FaHeart cursor="pointer" size={20}  color='red' />
                              ): (
                                <FaRegHeart cursor="pointer" size={20}  className="dark:text-white text-black" />
                              )}
                              
                            </div>
                         
                            <FaRegComment  cursor="pointer" size={20} className="dark:text-white text-black" />
                           
                           
                          </div>
                          <div onClick={handleSavePost}>
                           {currentUser?.saved?.includes(post?._id) ? (
                            <img  src={savedIcon}  alt='saved icon' className="w-[24px] cursor-pointer h-[24px] object-contain " />
                           ): (
                            <img  src={saveIcon} alt='save icon' className="w-[24px] dark:invert-[100%] cursor-pointer h-[24px] object-contain " />
                           )}
                        
                         </div>
                        </div>
                       <div className="flex flex-col  gap-1 mt-4 px-6">
                          <p className="text-black dark:text-white font-semibold text-[13px] leading-[140%] "> {post?.upvotes?.length} {post?.upvotes?.length > 1 ? "likes" : "like"} </p>
                          <p className="text-gray-400 text-[12px] font-medium leading-[140%] ">
                          {getTimesTamp(dateObject)} 
                          </p>
                       </div>
                    </div>
                    <div className="px-6 mt-5">
                    <AddComment post_id={post?._id} refetch={refetch} />
                    </div>
                        
                  </div>
                {/* bottom section ends */}
           </div>
        </div>
    </div>
    </DialogContent>
  </Dialog>
  )
}

export default PostModel