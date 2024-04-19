/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom"
import profile from "../../assets/profile.png"
import HomeIcon from "../../assets/home.svg"
import { Button } from "@/components/ui/button"
import ExploreIcon from "../../assets/wallpaper.svg"
import CommunityIcon from "../../assets/people.svg"
import SendIcon from "../../assets/send.png"
import { logoutUser } from "../../slices/usersSlice"
import { useGetUserQuery, useLogOutMutation } from "../../slices/UsersApiSlice"
import SavedIcon from "../../assets/bookmark.svg"
import CreateIcon from "../../assets/gallery-add.svg"
import { useDispatch, useSelector } from "react-redux"
const LeftSidebar = () => {
  const {pathname} = useLocation()
  const [logOut, {isLoading}] = useLogOutMutation()
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state)=> state.auth)
 
  //if(pathname === "/sign-in" || pathname === "/register" || pathname.startsWith("/direct")) return null

  const sidebarLinks = [
    {
    imgURL: HomeIcon,
    route: "/",
    label: "Home",
    },
    {
    imgURL: ExploreIcon,
    route: `/explore/${userInfo?._id}`,
    label: "Explore",
    },
    {
    imgURL: CommunityIcon,
    route: "/community",
    label: "People",
    },
    {
      imgURL: SendIcon,
      route: "/direct/inbox",
      label: "Messages",
      },
    {
    imgURL: SavedIcon,
    route: `/saved/${userInfo?._id}`,
    label: "Saved",
    },
    {
    imgURL: CreateIcon,
    route: "/create-post",
    label: "Create Post",
    },
    ];
    const handleLogout = async()=> {
       try {
         await logOut().unwrap()
         dispatch(logoutUser())
       } catch (error) {
         console.log(error)
       }
    }
   
  return (
    <div className="leftsidebar   !pt-28  ">
      <div className="flex flex-col justify-between gap-5">
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
             
             <ul className="flex flex-1 flex-col gap-4">
                {sidebarLinks.map((link)=> {
                  const isActive = pathname === link.route;
                  return(
                     <li className={`leftsidebar-link ${isActive ? "bg-secondary-100 group dark:bg-secondary-300" : ""}`} key={link.label}>
                          <Link to={link.route} className="p-4 flex items-center gap-4">
                                <img className="w-[25px] h-[25px] object-contain " src={link.imgURL} alt={link.label} />
                                <p>{link.label} </p>
                          </Link> 
                     </li>
                  )
                })}
             </ul>
        </div>
        {!userInfo ? (
          <>
             
              
           
             <div className='flex  flex-col gap-5'>
             <Link to={"/sign-in"}>
             <Button
               className="min-h-[41px] 
                   px-4 py-3 rounded-lg
                    bg-secondary-100 dark:bg-[#151821]  whitespace-nowrap
                    small-medium w-full shadow-none"
             >
              
               <span className="text-orange-500 font-semibold capitalize ">
                 log in
               </span>
             </Button>
           </Link>
           <Link className="mb-3" to={"/register"}>
             <Button
               className="min-h-[41px]   whitespace-nowrap
                   px-4 py-3 rounded-lg
                    bg-secondary-100 dark:bg-[#151821]
                    small-medium w-full shadow-none"
             >
              
               <span className="text-orange-500 font-semibold capitalize ">
                 sign up
               </span>
             </Button>
           </Link>
             </div>
               
             </>
        ): (
          <Button  onClick={handleLogout}
          disabled={isLoading}
          className="min-h-[41px]   whitespace-nowrap
              px-4 py-3 rounded-lg mb-5 hover:bg-secondary-100 dark:hover:bg-[#151821]
               bg-secondary-100 dark:bg-[#151821]
               small-medium w-full shadow-none"
        >
         
          <span className="text-orange-500 font-semibold capitalize ">
             {isLoading ? "Loading..." : "Logout"}
          </span>
        </Button>
        )}
        
      </div>
      
    </div>
  )
}

export default LeftSidebar