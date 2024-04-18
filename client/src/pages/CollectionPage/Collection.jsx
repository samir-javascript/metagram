
import { useGetSavedPostsQuery } from "../../slices/UsersApiSlice"
import saveIcon from '../../assets/savee.svg'
import GridPostList from '../../components/cards/GridPostList'
import { useLocation } from "react-router-dom"
import Paginate from "../../components/infiniteScroll/Paginate"
const Collection = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = parseInt(searchParams.get("page") || 1)
  const  {data,isLoading,isError} = useGetSavedPostsQuery({pageNumber:page})

  if(isLoading) return;
  if(isError) return <p>error</p>
  
  return (
    <div className="common-container h-screen !px-0">
       <div className="pt-20 w-full max-w-7xl flex justify-start items-start gap-3 ">
        <img src={saveIcon} alt="save_icon" className="w-[35px] h-[35px] object-contain  " />
          <h2 className="h2-bold capitalize ">Saved posts</h2>
       </div>
       <div className="grid-container">
       {data?.savedPosts.map((item)=> (
          <ul key={item?._id} className="mt-10">
          <GridPostList item={item}  />
          </ul>
            
           ))}
      
          
       </div>
       <Paginate page={data?.page} pages={data?.pages} />
    </div>
  )
}

export default Collection