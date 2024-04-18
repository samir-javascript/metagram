
import PostForm from '../../components/forms/PostForm'
import PostIcon from '../../assets/edit.svg'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../slices/PostsApiSlice'
const EditPost = () => {
  const { id } = useParams()
  const { data:post,isLoading,isError} = useGetPostByIdQuery(id)
  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Error</p>
  return (
    <div className=' common-container'>
      <div  className='w-full pt-20 max-w-5xl justify-start flex-start gap-3 '>
           <img src={PostIcon} alt="create post icon" className='w-[40px] h-[40px] dark:invert-[0]  invert-[100%] object-contain' />
           <h2 className='h3-bold xl:h2-bold text-left w-full'>Edit Post</h2>
      </div>
        <PostForm action="edit" post={post} />
    </div>
  )
}

export default EditPost