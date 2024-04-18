/* eslint-disable react/prop-types */

import { useGetUserQuery, useToggleFollowMutation } from "../../slices/UsersApiSlice"
import spinner from "../../assets/loadersaver.gif"
import { Link } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

import profile from "../../assets/profile.png"

const Users = ({item}) => {
    const { toast } = useToast()
    const {data:currentUser,isLoading,isError,refetch:refetchUserInfo} = useGetUserQuery()
   
    const [ToggleFollow, {isLoading:following} ] = useToggleFollowMutation()
    const handleToggleFollow = async(id)=> {
        try {
           const res = await ToggleFollow({
               userToFollowId: id
            })
            if(res.error) {
                toast({
                    title: res?.error?.data?.message  || "Failed to complete this action!",
                    variant: "destructive"
                })
            }
            toast({
                title: currentUser?.following?.includes(item?._id) ? "unfollowed successfuly": "Followed successfuly"
               })
           refetchUserInfo()
        } catch (error) {
            console.log(error)
        }
   }
   if(isLoading) return;
   if(isError) return <p>error </p>
  return (
    <div className="flex-between gap-2" key={item?._id}>
                     <Link className="flex items-center gap-2" to={`/profile/${item?._id}`}>
                 <img src={item?.picture || profile} alt="profile" className="w-[35px] h-[35px] 
                 rounded-full object-contain " />
                 <div className="flex flex-col">
                     <p className="font-semibold text-black dark:text-white text-[15px] ">
                         {item?.name}
                     </p>
                     <p className="font-normal text-gray-400 text-[12px] ">Suggested for you</p>
                 </div>
             </Link>
             <button onClick={()=> handleToggleFollow(item?._id)}  type="button" className="text-secondary-200 capitalize
             text-[13px] border-none outline-none bg-transparent font-semibold hover:text-blue-700 transition-all duration-150">
                {following ? (
                  <img width={24} height={24} src={spinner} alt="loading" />
                ): (
                     currentUser?.following?.includes(item?._id) ? 'UnFollow' : "Follow"
                )}
            </button>
                </div>
  )
}

export default Users