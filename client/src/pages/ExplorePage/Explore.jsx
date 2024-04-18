import { useGetExplorePostsQuery} from "../../slices/PostsApiSlice"
import { useLocation, useParams } from "react-router-dom"
import Paginate from "../../components/infiniteScroll/Paginate"
import GridPostList from '../../components/cards/GridPostList'
import { useGetCurrentUserQuery } from "../../slices/UsersApiSlice"
const Explore = () => {
   const location = useLocation()
   const searchParams = new URLSearchParams(location.search)
   const page = parseInt(searchParams.get('page')) || 1;
 const {id} = useParams()

const { data, isLoading, isError, refetch} = useGetExplorePostsQuery({id,pageNumber:page})
const {data:user, isLoading:fetching, isErro:error} = useGetCurrentUserQuery(id)
if(isLoading || isError || fetching || error) return;
  
  return (
    <div className="common-container !px-0">
        <div className="w-full pt-[60px] max-w-5xl flex justify-start items-start gap-4 ">
           <h2 className="h2-bold">
              Popular today
           </h2>
           </div>
           <div className="grid-container">
               {data?.posts?.map((item)=> (
                  <ul key={item?._id}>
                     <GridPostList user={user} refetch={refetch} item={item} showIndicators showUser />
                  </ul>
               ))}
           </div>
       <Paginate page={data?.page} pages={data?.pages} />
    </div>
  )
}

export default Explore