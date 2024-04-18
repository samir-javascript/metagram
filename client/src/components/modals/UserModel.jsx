/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import UserView from '../shared/UserView'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import { useState } from 'react';
import { FaTimes} from "react-icons/fa"
import { CiSearch } from "react-icons/ci";


const UserModel = ({open,onClose,statement,modalData}) => {
  const [value,setValue] = useState('')
  
  const filteredModalData = modalData.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.username.toLowerCase().includes(value.toLowerCase())
  );
  
  
  return (
    <Dialog className="outline-none border-none no-focus" open={open} onOpenChange={onClose}>
    
    <DialogContent className='bg-white outline-none border-none no-focus flex flex-col  max-w-[400px] !p-0'>
        {modalData?.length === 0 ? (
          <div className='p-4 h-[200px] '>
             <p>The current user has no {statement} yet </p>
          </div>
           
        ): (
          <>
          <div className="flex border-b border-[#222] p-3 items-center justify-between gap-4">
          <div />
          <p className="text-[#222] font-semibold text-[18px]  ">
             {statement} 
          </p>
          <div />
       </div>
       <div className="flex items-center gap-2 mx-3 px-4 py-2 mb-2 bg-secondary-100 rounded-[10px]">
           {!value && <CiSearch className="text-gray-400 text-[18px] " />} 
            <input  value={value} onChange={(e)=>setValue(e.target.value)} type="text" className="border-none flex-1 bg-transparent outline-none" placeholder="Search" />
            {value && <FaTimes className="text-gray-400 text-[18px] cursor-pointer "  onClick={()=> setValue("")} />}
       </div>
       <div className="h-80  flex flex-col overflow-y-auto gap-6 ">
           {filteredModalData.map((item)=> (
             <div  key={item?._id} className='mx-3'>
              <UserView item={item} />
             
             </div>
               
           ))}
       </div>
       </>
        )}
       
    </DialogContent>
  </Dialog>
  
  )
}

export default UserModel