import { Outlet, useLocation } from  'react-router-dom'
import Navbar from './shared/Navbar'
import LeftSidebar from './shared/LeftSidebar'
import RightSidebar from './shared/RightSidebar'
import BottomBar from './shared/BottomBar'

const Layout = () => {
    const { pathname} = useLocation()
    const noHeaderFooterRoutes = [
        '/sign-in',
        "/reset-password_appgram",
        '/register',
        '/reset_mypassword',
        "/direct/inbox",
        "/resetPassword"
       
      ];
    
      // Check if current route is in the list of routes to hide header and footer
      const showHeaderFooter = !noHeaderFooterRoutes.some(route => pathname.includes(route));
  return (
    <>
      {showHeaderFooter && <Navbar />}  
      <div className='flex'>
     {showHeaderFooter &&   <LeftSidebar />}
        <main className={`${showHeaderFooter ? "!px-6   sm:!px-14  mx-auto max-w-5xl  pb-6  max-md:pb-14 flex-1 w-full bg-white dark:bg-black   justify-center items-center" : 'h-full w-full' }`}>
             <Outlet />
        </main>
       <RightSidebar />
      </div>
       <BottomBar />

    </>
  )
}

export default Layout