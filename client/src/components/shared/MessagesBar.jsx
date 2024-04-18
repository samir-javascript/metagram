/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom"
import profile from "../../assets/profile.png"
import HomeIcon from "../../assets/home.svg"
import { Button } from "@/components/ui/button"
import ExploreIcon from "../../assets/wallpaper.svg"
import CommunityIcon from "../../assets/people.svg"
import logo from "../../assets/anylogo.png"
import logoutIcon from "../../assets/logout.svg"
import SendIcon from "../../assets/send.png"
import { logoutUser } from "../../slices/usersSlice"
import { useGetUserQuery, useLogOutMutation } from "../../slices/UsersApiSlice"
import SavedIcon from "../../assets/bookmark.svg"
import CreateIcon from "../../assets/gallery-add.svg"
import { useDispatch, useSelector } from "react-redux"

const MessagesBar = () => {
    const isLoading = false
    const {pathname} = useLocation()
    const {userInfo} = useSelector(state  => state.auth)
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
        {
            imgURL: userInfo?.picture || profile,
            route: `/profile/${userInfo?._id}`,
            label: "profile",
            },
        ];

    const handleLogout = ()=> {}
   // if(!pathname.startsWith("/direct")) return null
  return (
  <div className="h-screen max-md:hidden overflow-y-auto  border-r px-4 py-7   bottom-0 flex flex-col !sticky left-0 top-0 ">
       <Link to="/">
          <img src={logo} alt="logo" className="w-[30px] ml-3 h-[30px] object-contain " />
       </Link>
       <div className="flex flex-col flex-1 mt-12 gap-6">
            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route;
                return  (
                    <Link className={`${isActive ? "bg-secondary-100 dark:bg-secondary-800" : "" } p-3 hover:bg-secondary-100 group dark:hover:bg-secondary-800  rounded-[10px]`} to={item.route} key={item.label}>
                         <img
            width={24}
            height={24}
            className={`${item.label === "profile" ? "rounded-full" : ""} transition-all duration-200 ease-in-out object-contain group-hover:scale-[1.1] `}
            src={item.imgURL}
            alt={item.label}
           
        />
                    </Link>
                )
            })}
       </div> 
       <Button  onClick={handleLogout}
          disabled={isLoading}
          className="min-h-[41px]  mt-6 whitespace-nowrap
              px-4 py-3 rounded-lg mb-8
               bg-secondary-100 dark:bg-[#151821]
               small-medium w-full shadow-none"
        >
         
          <span className="text-orange-500 font-semibold capitalize ">
             {isLoading ? "Loading..." : (
                 <img width={24} height={24} src={logoutIcon} alt="logout" />
             )}
          </span>
        </Button>
  </div>
  )
}

export default MessagesBar