
import { useParams } from 'react-router-dom'
import EditIcon from '../../assets/edit.svg'
import UserForm from '../../components/forms/UserForm'
import { useGetCurrentUserQuery } from '../../slices/UsersApiSlice'
const EditProfile = () => {
  const {id} = useParams()
  const {data:user, isLoading, isError,refetch} = useGetCurrentUserQuery(id)
  if(isLoading) return;
  if(isError) return <p>error </p>
  return (
    <div className=' common-container'>
      <div  className='w-full pt-20 max-w-5xl justify-start flex-start gap-3 '>
           <img src={EditIcon} alt="create post icon" className='w-[40px] h-[40px] dark:invert-[0]  invert-[100%] object-contain' />
           <h2 className='h3-bold xl:h2-bold text-left w-full'>Edit Profile</h2>
      </div>
        <UserForm  id={id} user={user} refetch={refetch} />
    </div>
  )
}

export default EditProfile