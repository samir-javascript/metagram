/* eslint-disable react/prop-types */
import { useState } from "react"
import spinner from '../../assets/loadersaver.gif'
import { useAddCommentMutation } from "../../slices/PostsApiSlice"
import { useToast } from "@/components/ui/use-toast"

const AddComment = ({post_id,refetch}) => {
    const [value,setValue] = useState("")
    const { toast } = useToast()
    const [addComment, {isLoading}] = useAddCommentMutation()
    const handleAddComment = async()=> {
       try {
        const res = await addComment({
            post_id,
            content: value
         })
          if(res.error) {
             toast({
               title:"Failed to comment this Post"
             })
             return;
          }
          setValue("")
          refetch()
          toast({
            title: "Post has been commented successfuly",
            variant: "destructive"
          })
       } catch (error) {
         console.log(error)
       }
    }
  return (
    <div className="flex-between gap-3 w-full"> 
          <input value={value} onChange={(e)=> setValue(e.target.value)} placeholder="Add a comment" type="text" className="placeholder:text-[#737373] outline-none no-focus bg-transparent border-none flex-1  text-[#111] dark:text-white text-[14px] " />
          {value && (
             
              <button  type="button" className="text-secondary-200 capitalize
              text-[13px] border-none outline-none bg-transparent font-semibold hover:text-blue-700 transition-all duration-150">
                 {isLoading ? (
                 <img src={spinner} alt="loading..." className="w-[24px] h-[24px] " />
                 ): (
                  <button onClick={handleAddComment}  type="button" className="text-secondary-200 capitalize
                  text-[13px] border-none outline-none bg-transparent font-semibold hover:text-blue-700 transition-all duration-150">
                    Post
                 </button>
                 )}
             </button>
             

          )}
         
    </div>
  )
}

export default AddComment