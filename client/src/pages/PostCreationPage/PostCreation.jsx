
import PostForm from '../../components/forms/PostForm'
import PostIcon from '../../assets/add-post.svg'
const PostCreation = () => {
  return (
    <div className=' common-container'>
      <div  className='w-full pt-20 max-w-5xl justify-start flex-start gap-3 '>
           <img src={PostIcon} alt="create post icon" className='w-[40px] h-[40px] dark:invert-[0]  invert-[100%] object-contain' />
           <h2 className='h3-bold xl:h2-bold text-left w-full'>Create Post</h2>
      </div>
        <PostForm action="create" post={[]} />
    </div>
  )
}

export default PostCreation