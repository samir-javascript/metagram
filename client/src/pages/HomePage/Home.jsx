import { useLocation } from 'react-router-dom';

import PostCard from '../../components/cards/PostCard';
import { useGetPostsQuery } from '../../slices/PostsApiSlice';
import Paginate from '../../components/infiniteScroll/Paginate';




const Home = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page')) || 1;


  const { data, isLoading, isError, refetch } = useGetPostsQuery({ pageNumber:page });

 
  
  

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="w-full !pt-28 flex-1 h-full">
      <h2 className="w-full text-left mx-[20px] h3-bold md:h2-bold capitalize">Home feed</h2>
      <div className="flex flex-col gap-9 w-full flex-1">
        {data?.posts.map((item) => (
          <PostCard refetch={refetch} item={item} key={item?._id} />
        ))}
      </div>
      <Paginate page={data?.page} pages={data?.pages} />
    </div>
  );
};

export default Home;
