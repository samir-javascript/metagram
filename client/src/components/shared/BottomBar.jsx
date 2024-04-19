import HomeIcon from "../../assets/home.svg"
import ExploreIcon from "../../assets/wallpaper.svg"
import SaveIcon from "../../assets/bookmark.svg"
import CreateIcon from '../../assets/gallery-add.svg'
import SendIcon from "../../assets/send.png"
import profile from "../../assets/profile.png"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
const BottomBar = () => {
  const {pathname} = useLocation()
  const  { userInfo } = useSelector((state) => state.auth)
  const { messages :message} = useSelector(state => state.conversation)
  const bottombarLinks = [
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
    imgURL: SaveIcon,
    route: `/saved/${userInfo?._id}`,
    label: "Saved",
    },
    {
    imgURL: CreateIcon,
    route: "/create-post",
    label: "Create",
    },
    {
      imgURL: SendIcon,
      route: "/direct/inbox",
      label: "Chat",
      },
      {
        imgURL: profile,
        route: `/profile/${userInfo?._id}`,
        label: "Profile",
        },
    ];
    if(pathname === "/sign-in" || pathname === "/register" || pathname.startsWith("/reset_mypassword") ||  pathname.startsWith('/post') || message) return null
  return (
    <div className="bottom-bar">
        {bottombarLinks.map((link)=> {
          const isActive = pathname === link.route;
          return (
             <Link  className={`${isActive ? "" : ""}`} key={link.label} to={link.route}>
                   <img className="w-[25px] text-black dark:text-white dark:invert-0  h-[25px] object-contain " src={link.imgURL} alt={link.label} />
             </Link>
          )
        })}
    </div>
  )
}

export default BottomBar