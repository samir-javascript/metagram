/* eslint-disable no-unused-vars */

import UserView from "../../components/shared/UserView";
import { useGetUsersQuery } from "../../slices/UsersApiSlice"
const Community = () => {
  const { data:users, isLoading, isError} = useGetUsersQuery()
  if(isLoading || isError) return <p className="text-black dark:text-white">check</p>;
  return (
    <div className=" pt-[9rem] max-w-[550px] mx-auto flex flex-col justify-start items-start ">
           <h5 className="text-black mb-5 font-medium dark:text-white leading-[140%]">Suggested</h5>
           <div className="flex flex-col w-full gap-4">
              {users.map((item)=> (
                 <UserView item={item} key={item?._id} />
              ))}
           </div>
    </div>
  )
}

export default Community