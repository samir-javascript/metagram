/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { useGetPostsQuery } from "../../slices/PostsApiSlice";
import Loader from "../../assets/loadersaver.gif";
import PostCard from "../cards/PostCard";

const InfiniteScroll = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;

  const [pageNumber, setPageNumber] = useState(page);
  const { data, isLoading, isError, refetch } = useGetPostsQuery({ pageNumber });

  const { ref, inView } = useInView({
    
  });

  useEffect(() => {
    if (inView && !isLoading && data && data.page < data.pages) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, data]);

  if (isLoading && pageNumber === page) return <p>Loading...</p>; // Initial loading state

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="flex flex-col gap-9 w-full flex-1">
      {data?.posts.map((item) => (
        <PostCard refetch={refetch} item={item} key={item?._id} />
      ))}

      {/* Conditionally render loader based on available pages */}
      {data && pageNumber <= data.pages && (
        <div ref={ref} className="flex w-full justify-center items-center my-4">
          {isLoading ? (
            <img src={Loader} alt="loading" width={30} height={30} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;