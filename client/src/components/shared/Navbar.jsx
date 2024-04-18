import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/logo.png"
import profile from '../../assets/profile.png'
import SearchBar from "../search/SearchBar"
import Theme from "./Theme"
import { Button } from "@/components/ui/button"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector} from "react-redux" 
import {  useLogOutMutation } from "../../slices/UsersApiSlice"
import { logoutUser } from "../../slices/usersSlice"


const Navbar = () => {
  const {pathname} = useLocation()
  const {userInfo} = useSelector((state)=> state.auth)
  
  const [logOut, {isLoading}] = useLogOutMutation()
  const dispatch = useDispatch()


  if(pathname === "/sign-in" || pathname === "/register" || pathname.startsWith('/direct')) return null

  const handleLogout = async()=> {
    try {
      await logOut().unwrap()
      dispatch(logoutUser())
    } catch (error) {
      console.log(error)
    }
 }
  return (
    <>
    <nav className="fixed z-[99] top-0 left-0 right-0 w-full bg-white dark:bg-secondary-800 shadow flex h-[65px] ">
         <div className="h-full w-full px-6 py-2 flex items-center justify-between">
          <Link to="/">
             <img src={logo} alt="appGram" className="w-[150px] dark:invert-[100%] mr-5 h-auto object-contain " />
             </Link>
             
             <SearchBar />
             <div className="flex ml-5 items-center gap-5">
                <Theme />
                {userInfo ? (
                  <DropdownMenu>
                  <DropdownMenuTrigger className="border-none no-focus outline-none">
                      <div>
                          <img src={userInfo?.picture || profile} className="w-[45px] h-[45px] border border-secondary-200 rounded-full cursor-pointer object-contain " alt="profile" />
                      </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white mr-5 dark:bg-secondary-800 shadow z-[999] w-[200px] border border-secondary-100 dark:border-[#333] flex flex-col text-center items-center justify-center">
                   
                 
                    <DropdownMenuItem className="p-2 cursor-pointer hover:bg-secondary-100 dark:hover:bg-transparent  text-center flex justify-center border-b border-secondary-100 dark:border-[#333]  w-full ">
                      <Link to={`/profile/${userInfo?._id}`}>
                         <p className='text-black dark:text-white font-semibold leading-[1.7]   text-[14px] '>View Profile</p>
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer hover:bg-secondary-100 dark:hover:bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#333] w-full ">
                      <Link to='/create-post'>
                         <p className='text-black dark:text-white font-semibold leading-[1.7]   text-[14px] '>Create a new Post</p>
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer hover:bg-secondary-100 dark:hover:bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#333] w-full ">
                      <Link to={`/edit_user/${userInfo?._id}`}>
                         <p className='text-black dark:text-white font-semibold leading-[1.7]   text-[14px] '>Edit my Profile</p>
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="p-2 cursor-pointer hover:bg-secondary-100  dark:hover:bg-transparent text-center flex justify-center border-b border-secondary-100 dark:border-[#333] w-full ">
                         <p className='text-black dark:text-white font-medium leading-[1.7]   text-[14px] '>
                           {isLoading ? "Loading..." : "Sign Out"}
                         </p>
                    </DropdownMenuItem>
                  
                   
                  </DropdownMenuContent>
                </DropdownMenu>
                ): (
                  <Link to='/register'>
                  <Button   className="shad-button_primary rounded-[5px]  " type="button">
                      <p className="font-semibold text-[15px] whitespace-nowrap text-light-2 !text-orange-500">Sign up</p>
                    </Button>
                    </Link>
                )}
               
             </div>
         </div>

    </nav>
    

    </>
  )
}

export default Navbar