import { useState } from "react"
import { FaSearch, FaTimes} from 'react-icons/fa'
import { Input } from "@/components/ui/input"
const SearchBar = () => {
    const [search,setSearch] = useState("")
  return (
    <div
    className={`bg-secondary-100
     dark:bg-gradient-to-br from-gray-400 to-gray-800 flex min-h-[45px]
      max-w-[600px] w-full   px-2 rounded-[10px]
   gap-4 items-center  max-lg:hidden
`}
  >
  
    {!search && <FaSearch size={20} className="cursor-pointer dark:text-white 
    font-semibold text-black max-sm:hidden block" />} 
    <Input
      type="text"
      placeholder={"Search by user name and explore appGram..."}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className=" shadow-none font-medium !border-none !text-black
       dark:!text-white no-focus  !outline-none
             placeholder:text-[15px] placeholder:text-gray-400  text-[16px]  bg-transparent 
             
         "
    />
     {search && <FaTimes cursor="pointer" onClick={()=> setSearch('')} color="gray" />} 
    
     
    
  </div>
  )
}

export default SearchBar