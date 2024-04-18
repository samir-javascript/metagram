/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom"

import profile from '../../assets/profile.png'
import { useSelector} from 'react-redux'

import Users from "./Users"
import { useGetUsersQuery } from "../../slices/UsersApiSlice"
const RightSidebar = () => {
    const { pathname } = useLocation()
    const {userInfo} = useSelector(state => state.auth)
    
    const {data:users,isLoading,isError} = useGetUsersQuery()
 
  if(isLoading || isError) return
    if(pathname !== "/") return null
  return ( 
    <div className="rightsidebar !pt-28 ">
        <div className="flex flex-col gap-6">
            {userInfo && (
                <Link className="flex items-center gap-2" to={`/profile/${userInfo?._id}`}>
                 <img src={userInfo?.picture || profile} alt="profile" className="w-[35px] h-[35px] 
                 rounded-full object-contain " />
                 <div className="flex flex-col">
                     <p className="font-semibold text-black dark:text-white text-[18px] ">
                         {userInfo?.name}
                     </p>
                     <p className="font-normal text-gray-400 text-[12px] ">@{userInfo?.username} </p>
                 </div>
             </Link>
            )}
            
            <div className="flex-between gap-2">
                <p className="font-medium text-black dark:text-white text-[16px] ">Suggested for you</p>
                <Link to="/community">
                   <p className="text-[#424242] text-[13px] capitalize font--medium dark:text-gray-200 hover:text-gray-500 ">See all</p>
                </Link>
            </div>
            <div className="flex flex-col gap-6">
            {users.slice(0,5).map((item)=> (
                <Users  key={item?._id} item={item} />
              ))}
            </div>
           <p className="text-gray-300 text-[13px] mt-2 font-normal ">© 2024 INSTAGRAM FROM META</p>
        </div>
    </div>
  )
}

export default RightSidebar