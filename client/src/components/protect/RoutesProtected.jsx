import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
const RoutesProtected = () => {
    const {userInfo} = useSelector(state => state.auth)
  return (
     userInfo ? <Outlet /> : <Navigate to="/sign-in" replace={true} />
    
  )
}

export default RoutesProtected