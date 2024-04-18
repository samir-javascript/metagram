/* eslint-disable no-unused-vars */
import arrowBack from "../../assets/back.svg"
import {Link, useParams} from "react-router-dom"
import savedIcon from '../../assets/icons/save_symbol.png'
import profile from "../../assets/profile.png"
import {useToast} from "../../components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddComment from "../../components/search/AddComment"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import saveIcon from "../../assets/icons/saveicon.png"
import { useDeletePostMutation, useGetPostByIdQuery , useToggleLikePostMutation, useToggleSavePostMutation} from "../../slices/PostsApiSlice"
import { useGetUserQuery, useToggleFollowMutation } from "../../slices/UsersApiSlice"
import { getTimesTamp } from "../../utils"
import Dropdown from "../../components/cards/Dropdown"
import { useSelector } from "react-redux"
const PostDetails = () => {
  const {id} = useParams()
  const {userInfo} = useSelector(state => state.auth)
  const { toast} = useToast()
   const { data:post,isLoading,isError,refetch} = useGetPostByIdQuery(id)
   const {data:currentUser,isLoading:fetching,refetch:reftchUserInfo } = useGetUserQuery()
   const [LikePost] = useToggleLikePostMutation()
   const [SavePost] = useToggleSavePostMutation()
   const [deletePost] = useDeletePostMutation()
   const [toggleFollow] = useToggleFollowMutation()
   if(isLoading || isError || fetching) return;
  const handleToggleLikePost = async()=> {
       try {
           const res = await LikePost({
               postId: post?._id
           })
           if(res.error) {
               toast({
                    title: "Failed to complete this action!",
                    variant: "destructive"
               }) 
           }
           
           refetch()
           toast({
            title: post?.upvotes?.includes(currentUser?._id) ? "Post has been unliked successfuly" : "Post has been liked successfuly"
        })

       } catch (error) {
          console.log(error)
       }
  }
  const handleToggleSavePost = async()=> {
     try {
          const res = await SavePost({
               postId: post?._id
           })
           if(res.error) {
               toast({
                    title: "Failed to complete this action!",
                    variant: "destructive"
               }) 
           }
           toast({
               title: currentUser?.saved?.includes(post?._id) ? "Post has been removed from your collection successfuly" : "Post has been added to your collection successfuly"
           })
           reftchUserInfo()
     } catch (error) {
           console.log(error)
     }
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
     reftchUserInfo()
    } catch (error) {
       console.log(error)
    }
 }
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
 reftchUserInfo()
}
  return (
    <div className="common-container !p-0">
          <Link to={"/"} className=" text-left max-w-5xl w-full pt-[7rem] flex justify-start items-center gap-4">
               <img src={arrowBack} alt="arrow icon" width={30} height={30} />
               <p className="font-semibold text-[22px] text-black dark:text-white ">Back</p>
          </Link> 
          <div className="w-full border rounded-tl-[10px] rounded-bl-[10px] flex-1 flex justify-start h-[500px] items-start lg:flex-row flex-col">
              <div className="flex-1 w-full h-[500px] ">
                 <img className="w-full rounded-tl-[10px] rounded-bl-[10px] h-full object-cover" src={post?.media} alt={post?.caption} />
              </div> 
              <div className="flex-1 flex   flex-col w-full h-full">
                    <div className="flex-between border-b p-3   gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <img src={post?.creator?.picture || profile} alt={post?.creator?.name} width={30} height={30}
                             className="rounded-full object-contain" />
                             <p className="text-black dark:text-white font-semibold text-[13px] ">
                               {post?.creator?.name}
                             </p>
                        </div>
                        <Dropdown item={post}
              handleDeletePost={handleDeletePost}
              handleToggleFollow={handleToggleFollow}
              currentUser={currentUser}
              userInfo={userInfo}
              handleSavePost={handleToggleSavePost} />
                    </div>
                    {/* comments section starts */}
                    <div className="flex flex-col h-[15rem] overflow-y-scroll pb-4 pt-2 gap-4 ">
                        {post?.comments?.length > 0 ?  post?.comments.map((item)=> (
                            <div className="flex items-start mt-4 px-4 justify-start gap-2" key={item?._id}>
                                 <div>
                                    <img src={item?.user_id?.picture || profile} alt="profile" width={30} height={30} className="rounded-full object-contain" />
                                 </div>
                                 <div className="flex gap-1 flex-col">
                                      <p className="font-semibold text-black dark:text-white text-[15px] ">
                                            {item?.user_id?.name}
                                      </p>
                                      <p className="text-black dark:text-white text-[13px] font-medium leading-[140%] ">
                                         {item?.content}
                                      </p>
                                      <p className="text-gray-400 font-normal text-[12px]">
                                         {getTimesTamp(new Date(item?.createdAt))}
                                      </p>
                                 </div>
                            </div>
                        )): (
                         <div className="flex mt-10 items-center justify-center flex-col">
                         <h4 className="text-2xl font-bold text-black dark:text-white">No comments yet.</h4>
                         <p className="font-normal text-[#111] dark:text-gray-300 text-[14px] leading-[140%] mt-2 ">start the conversation.</p>
                     </div>
                        )}
                    </div>
                    {/* comments section ends */}
                    <div className="my-auto border-t flex flex-col border-secondary-100  dark:border-[#222]   w-full">
                    <div className="flex flex-col w-full py-2.5 border-b  border-secondary-100  dark:border-[#222] ">
                    <div className="flex-between px-6   w-full gap-4">
                          <div className="flex items-center gap-5">
                            <div onClick={handleToggleLikePost}>
                             {post?.upvotes?.includes(currentUser?._id) ? (
                            <FaHeart cursor="pointer" size={20}  color="red" />
                             ): (
                              <FaRegHeart cursor="pointer" size={20}  className="dark:text-white text-black" />
                             )}
                               
                             
                              
                            </div>
                         
                            <FaRegComment  cursor="pointer" size={20} className="dark:text-white text-black" />
                           
                           
                          </div>
                          <div onClick={handleToggleSavePost}>
                          {currentUser?.saved?.includes(post?._id) ? (
                            <img  src={savedIcon} alt='save icon' className="w-[24px]  cursor-pointer h-[24px] object-contain " />
                          ): (
                              <img  src={saveIcon} alt='save icon' className="w-[24px] dark:invert-[100%] cursor-pointer h-[24px] object-contain " />
                          )}
                          
                         
                        
                         </div>
                        </div>
                       <div className="flex flex-col  gap-1 mt-4 px-6">
                          <p className="text-black dark:text-white font-semibold text-[13px] leading-[140%] "> {post?.upvotes?.length} likes </p>
                          <p className="text-gray-400 text-[12px] font-medium leading-[140%] ">
                          {getTimesTamp(new Date(post?.createdAt))}
                          </p>
                       </div>
                    </div>
                    <div className="px-6 max-sm:mb-4 py-3">
                       <AddComment post_id={post?._id} refetch={refetch} />
                    </div>
                        
                  </div>
              </div>
          </div>
    </div>
  )
}

export default PostDetails