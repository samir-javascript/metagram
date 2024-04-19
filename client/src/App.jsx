import { Route, Routes } from 'react-router-dom'
// import Navbar from './components/shared/Navbar'
// import LeftSidebar from './components/shared/LeftSidebar'
// import RightSidebar from './components/shared/RightSidebar'
import Home from './pages/HomePage/Home'
import PostDetails from './pages/PostDetailsPage/PostDetails'
import Profile from './pages/ProfilePage/Profile'
import EditProfile from './pages/EditProfilePage/EditProfile'
import EditPost from './pages/EditPostPage/EditPost'
import Community from './pages/CommunityPage/Community'
import Explore from './pages/ExplorePage/Explore'
import Collection from './pages/CollectionPage/Collection'
import Chat from './pages/ChatPage/Chat'
import PostCreation from './pages/PostCreationPage/PostCreation'
import Register from './pages/RegisterPage/Register'
import Login from './pages/LoginPage/Login'
// import BottomBar from './components/shared/BottomBar'

import RoutesProtected from './components/protect/RoutesProtected'
import ForgotPassword from './pages/forgetPasswordPage/ForgotPassword'
import Layout from './components/Layout'
import VerifyToken from './pages/Verify/VerifyToken'
import RecoverPassword from './pages/RecoverAccountPage/RecoverPassword'


export default function App() {
  // const {pathname} = useLocation()
 
 
  return (
    <main className='flex flex-col bg-white dark:bg-black w-full relative '>
        {/* <Navbar /> */}
        <div className='flex flex-1'>
          {/* <div  >
           <LeftSidebar />
          </div>  */}
           {/* flex justify-center items-center w-full h-full" */}
                        {/* // lg:ml-[18rem] md:ml-[14rem] */}
               {/* <div className={`${pathname === "/sign-in" ||pathname === "/register" || pathname.startsWith("/direct") ? "h-full w-full" : "!px-6 sm:!px-14  mx-auto max-w-5xl  pb-6  max-md:pb-14 flex-1 w-full bg-white dark:bg-black   justify-center items-center "}`}> */}
                <div className='flex-1'>
               <Routes>
                <Route path='' element={<Layout />}>
              <Route path='' element={<RoutesProtected />}>
                <Route index path='/' element={<Home />} />
                  
                  <Route  path='/post/:id' element={<PostDetails />} />
                  <Route  path='/edit_post/:id' element={<EditPost />} />
                  <Route  path='/profile/:id' element={<Profile />} />
                  <Route  path='/explore/:id' element={<Explore />} />
                  
                  <Route  path='/community' element={<Community />} />
                  <Route  path='/saved/:id' element={<Collection />} />
                  <Route  path='/direct/inbox' element={<Chat />} />
                  <Route  path='/create-post' element={<PostCreation />} />
                 
                  <Route  path='/edit_user/:id' element={<EditProfile />} />
                
                  </Route>
                  <Route  path='/register' element={<Register />} />
                  <Route  path='/sign-in' element={<Login />} />
                  <Route path="/resetPassword" element={<VerifyToken />} />
                  <Route path="/reset_mypassword" element={<ForgotPassword />} />
                  <Route path="/reset-password_appGram" element={<RecoverPassword />} />
                  </Route>
               </Routes>
               </div>
               {/* <RightSidebar /> */}
        </div>
        {/* <BottomBar /> */}
    </main>
  )
}
