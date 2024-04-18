/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useGetCurrentUserQuery, useGetUserProfileFollowersQuery, useGetUserQuery, useToggleFollowMutation, useUserPostsQuery } from "../../slices/UsersApiSlice"
import {Button} from "../../components/ui/button"
import { Link, useParams} from 'react-router-dom'
import profile from "../../assets/profile.png"
import calender from '../../assets/icons/calendar.svg'
import location from '../../assets/icons/location.svg'
import Loader from  "../../assets/loadersaver.gif"
import NoPostIcon from '../../assets/icons/no-image.png'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
 } from "@/components/ui/tabs"
 import GridPostList from "../../components/cards/GridPostList"

import StatBlock from "../../components/shared/StatBlock"
import { useSelector } from "react-redux"


const ProfileLink = ({title,imgUrl,href})=> {
  return (
   <div className="flex items-center gap-1">
      <img src={imgUrl} alt={title}  className="w-[20px] h-[20px] "/>
      {href ? (
          <Link className="font-medium !text-secondary-200 text-[15px] lg:text-[17px] leading-[140%]" to={href} target='_blank' >
               {title}
          </Link>
      ): (
          <p className="font-medium text-black dark:text-white text-[15px] lg:text-[17px] leading-[140%] ">
             {title}
          </p>
      )}
   </div>
  )
}
const Profile = () => {
  const {id} = useParams()
  const {data:user, isLoading, isError,refetch} = useGetCurrentUserQuery(id)
   const {data:currentUser,isLoading:ld,refetch:rf} = useGetUserQuery()
  const {data:userPosts,isLoading:loading,isError:error} = useUserPostsQuery(id)
  const {userInfo} = useSelector(state => state.auth)
  const [ToggleFollow, {isLoading:following}] = useToggleFollowMutation()
   
  if(isLoading || loading || ld  ) return <p>Loading...</p>
  if(isError || error ) return <p>error </p>
 
    
    const handleToggleFollow = async()=> {
         try {
            const res =  await ToggleFollow({
                userToFollowId: user?._id,
             })
             if(res.error) {
                alert('something went wrong')
                return;
             }
             refetch()
             rf()
         } catch (error) {
             console.log(error)
         }
    }
  return (
    <div className="h-full">
    <div className="pt-28 flex flex-col-reverse items-start  justify-between sm:flex-row">
        <div className="flex items-start flex-col gap-4 lg:flex-row">
               <img src={user?.picture || profile} alt={user?.name} className="rounded-full object-cover w-[140px] h-[140px] " />
               <div className="mt-3">
                  <h2 className="h2-bold text-black dark:text-white ">{user?.name} </h2>
                  <p className="mt-1.5 font-medium text-base text-gray-400 dark:text-white">@{user?.username} </p>
                  <div  className="flex mt-5 gap-8 w-full justify-start items-center z-20 ">
                      <StatBlock rf={rf} userData={user} value={userPosts?.length}  label={userPosts?.length === 1 ? "Post": "Posts"}  />
                      <StatBlock rf={rf} userData={user} value={user?.followers?.length} label={"Followers"} />
                      <StatBlock rf={rf} userData={user} value={user?.following?.length} label={ "Following"} />
                  </div>
                  <div className="mt-5 flex flex-wrap justify-start gap-8">
                  
                     {user?.location && (
                      <ProfileLink imgUrl={location} title={user.location}  />
                    )}
                       <ProfileLink  imgUrl={calender}
                          title={user?.createdAt.substring(0,10)} />
                       
                  </div>
                  {user?.bio && (
                     <p className="max-w-[500px] mt-6 text-black dark:text-white font-medium text-[15px] lg:text-[17px] leading-[140%]  "><span className="capitalize font-bold text-gray-500  ">Bio: </span>{user?.bio} </p>
                  )}
               </div>
        </div>
        <div className="max-sm:w-full justify-end flex sm:mt-5 max-sm:mb-5">
           {currentUser?._id === user?._id ? (
 <Link to={`/edit_user/${user?._id}`}>
 <Button type="button" className="bg-secondary-200 leading-[140%]  text-white rounded-[5px] dark:bg-gradient-to-br from-gray-400 to-gray-800 min-h-[45px] : ">
  Edit Profile
  </Button>
</Link>
           ): (
           
            <Button onClick={handleToggleFollow} type="button" className="bg-secondary-200 hover:bg-blue-500 leading-[140%]
              text-white rounded-[5px] w-[120px] 
              dark:bg-gradient-to-br from-gray-400 to-gray-800 min-h-[40px] : ">
                 {following ? (
                    <img src={Loader} alt="loader" width={24} height={24} />
                 ): (
                  currentUser?.following?.includes(user?._id) ? 'Unfollow' : "Follow" 
                 )}
                
             </Button>
       
           )}
         
        </div>
    </div>
    <div className="mt-10 flex gap-10">
    <Tabs defaultValue="posts" className="flex-1">
  <TabsList >
    <TabsTrigger  value="posts">
        <Button type="button" className="bg-secondary-100 hover:bg-secondary-100  dark:text-white dark:bg-gradient-to-br from-gray-400 to-gray-800 focus:bg-secondary-200 focus:text-white w-[150px] min-h-[45px] rounded-[5px] font-medium capitalize text-base ">
             Posts
        </Button>
    </TabsTrigger>
    <TabsTrigger value="likedPosts">
    <Button type="button" className="bg-secondary-100  hover:bg-secondary-100 dark:text-white dark:bg-gradient-to-br from-gray-400 to-gray-800 focus:bg-secondary-200 focus:text-white w-[150px] min-h-[45px] rounded-[5px] font-medium capitalize text-base ">
             Liked Posts
          </Button>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="posts">
      {userPosts.length > 0 ? (
        <div className="grid-container">
          {userPosts.map((item) => (
            <ul className="mt-5" key={item?._id}>
              <GridPostList user={user} showStates={true} item={item} />
            </ul>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 justify-center text-center flex-col items-center gap-4">
          <img className="w-[200px] h-[200px] mx-auto object-contain" src={NoPostIcon} alt="icon" />
          <p className="text-black dark:text-white font-semibold leading-[140%] text-[18px]">
            It seems like you haven't created any post yet.
          </p>
          {user?._id === userInfo?._id && (
            <Link to="/create-post">
            <Button type="button" className="bg-secondary-200 hover:bg-secondary-200 text-white mt-4">
              Create post
            </Button>
          </Link>
          )}
          
        </div>
      )}
    </TabsContent>
    <TabsContent value="likedPosts">
      {user?.liked.length > 0 ? (
        <div className="grid-container">
          {user?.liked?.map((item) => (
            <ul className="mt-5" key={item?._id}>
              <GridPostList user={user} showUser item={item} />
            </ul>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 justify-center text-center flex-col items-center gap-4">
          <img className="w-[200px] h-[200px] mx-auto object-contain" src={NoPostIcon} alt="icon" />
          <p className="text-black dark:text-white font-semibold leading-[140%] text-[18px]">
            It seems like you haven't liked any post yet.
          </p>
          {user?._id === userInfo?._id && (
 <Link to={`/explore/${user?._id}`}>
 <Button type="button" className="bg-secondary-200 hover:bg-secondary-200 text-white mt-4">
   browse posts
 </Button>
</Link>
          )}
         
        </div>
      )}
    </TabsContent>
  {/* <TabsContent className="grid-container " value="likedPosts">
  {user?.liked.length > 0 ? user?.liked?.map((item)=> (

        <ul className="mt-5" key={item?._id}>
              <GridPostList showUser={true} item={item}  />
      </ul>
    )): (
       <p>You haven't liked any post yet.</p>
    )}
  </TabsContent> */}
</Tabs>



 
   
 


    </div>
   
    </div>
  )
}

export default Profile