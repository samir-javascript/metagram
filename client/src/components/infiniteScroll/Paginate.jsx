/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Pagination,
  PaginationContent,
 
  PaginationItem,
 
} from "@/components/ui/pagination"
import { Button} from "../ui/button"
import { useNavigate } from "react-router-dom";


const Paginate = ({page,pages}) => {
  const navigate = useNavigate()
  if(pages <= 1 ) return null;
  const handlePrev = ()=> {
     if(page === 1) return;
     navigate(`?page=${page - 1}`)
  }
  const handleNext = ()=> {
    if(page === pages) return;
    navigate(`?page=${page + 1}`)
 }
  return (
    <Pagination >
    <PaginationContent className='my-5 flex items-center gap-5'>
      <PaginationItem>
        <Button disabled={page === 1} onClick={handlePrev} type="button" className="bg-secondary-200 px-6 font-medium  text-white"> Prev</Button>
      </PaginationItem>
      <PaginationItem>
         <p className="font-semibold text-black dark:text-white text-[24px] ">
           {page}
         </p>
      </PaginationItem>
      
      <PaginationItem>
      <Button disabled={page === pages} onClick={handleNext} type="button" className="bg-secondary-200 px-6 font-medium  text-white">Next</Button>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  
  )
}

export default Paginate