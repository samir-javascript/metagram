/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserModel from "../modals/UserModel";
import { useLocation } from "react-router-dom";

const StatBlock = ({value,label,userData,rf})=> {
  const {pathname }= useLocation()
    const [isOpen,setIsOpen] = useState(false)
    const [modalData,setModalData] = useState(null)
    const [modalStatement,setModalStatement] = useState("")
    const handleClick = ()=> {
      switch (label) {
        case "Followers":
          setModalData(userData?.followers)
          setModalStatement("Followers")
          setIsOpen(true)
          break;
          case "Following":
            setModalData(userData?.following)
            setModalStatement("Following")
            setIsOpen(true)
            break;
        default:
          setModalData(null)
          setIsOpen(false)
          break;
       }
    }
    useEffect(() => {
      setIsOpen(false)
   }, [pathname])
    return ( 
      <>
      <div onClick={handleClick} className={`${label === "Posts" || label === "Post" ? " cursor-default" : "cursor-pointer" } flex  items-center gap-2`}>
          <p className="text-[14px] lg:text-[18px] lg:font-bold font-semibold
           !text-secondary-200 leading-[140%] tracking-tighter ">
             {value}
          </p>
          <p className="text-[14px] lg:text-[16px] lg:font-medium font-medium
           text-black dark:text-white leading-[140%] tracking-tighter ">{label} </p>
      </div>
        {modalData !== null && <UserModel rf={rf} statement={modalStatement} modalData={modalData}  open={isOpen} onClose={()=> setIsOpen(false)} />} 
       </>
    )
  }
  export default StatBlock