/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom"
import profile from "../../assets/profile.png"
import { useGetUserQuery, useToggleFollowMutation } from "../../slices/UsersApiSlice"
import Loader from "../../assets/loadersaver.gif"
import { useToast } from "@/components/ui/use-toast"

const UserView = ({item}) => {
    const {pathname} = useLocation()
    const { toast } = useToast()
    
    const {data:currentUser, isLoading,isError,refetch} = useGetUserQuery()
    const [ToggleFollow, {isLoading:following}] = useToggleFollowMutation()
    if(isLoading  || isError) return;
    const handleToggleFollow = async()=> {
         try {
            const res =  await ToggleFollow({
                userToFollowId: item?._id,
             })
             if(res.error) {
                toast({
                  title: "Faild to complete this action!",
                  variant: "destructive"
                })
                return;
             }
             toast({
              title: currentUser?.following?.includes(item?._id) ? "unfollowed successfuly": "Followed successfuly"
             })
             refetch()
         } catch (error) {
             console.log(error)
         }
    }
  return (
    <div className="flex-between w-full gap-2" key={item?._id}>
                     <Link className="flex items-center gap-2" to={`/profile/${item?._id}`}>
                 <img src={item?.picture || profile} alt="profile" className="w-[50px] h-[50px] 
                 rounded-full object-contain " />
                 <div className="flex flex-col">
                     <p className={`${pathname.startsWith("/profile") ? "text-black" : "text-black dark:text-white"}  font-medium   text-[13px]`}>
                         {item?.name }
                     </p>
                     <p className="font-normal text-gray-400 text-[12px] ">
                         {item?.username}
                     </p>
                    {!pathname.startsWith("/profile") && <p className="font-normal text-gray-400 text-[12px] ">Suggested for you</p>} 
                 </div>
             </Link>
              {currentUser?._id !== item?._id && (
 <button   onClick={handleToggleFollow} type="button" className="text-white px-6 rounded-[10px]
 py-2 bg-secondary-200 hover:bg-blue-500 capitalize
text-[13px] border-none outline-none  font-semibold  transition-all duration-150">
    {following ? (
      <img src={Loader} alt="loader" width={24} height={24} />
    ): 
     (
       currentUser?.following?.includes(item?._id) ? "UnFollow": "Follow"
     )
    }
   
</button>
              )}
            
                </div>
  )
}

export default UserView