/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import Loader from '../../assets/loadersaver.gif'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useCreateNewPostMutation,useEditPostMutation} from "../../slices/PostsApiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"


import { useNavigate } from "react-router-dom"

import UploadFile from "./UploadFile"
import { useState } from "react"
import { PostValidation } from "@/validation"

export default function PostForm({ post, action }) {

  const [CreatePost, {isLoading}] = useCreateNewPostMutation()
  const [EditPost, {isLoading:editing}] = useEditPostMutation()
  const navigate = useNavigate()
  const  [image,setImage] = useState("")
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      location: post ? post?.location : '',
      media: post ?  post?.media :  "",
      tags: post ? post?.tags?.join(',') : ''
    },
  })

  async function handleSubmit(values) {

    try {
      if(action === 'create') {
        const res =  await CreatePost({
          location: values.location,
          caption: values.caption,
          media: image ? image : values.media,
          tags: values.tags,
       })
       if(res.error) {
          toast({
            title: "Failed to create post!",
            variant: "destructive"
          })
          return;
       }
       toast({
        title: "Post has been created successfuly"
       })
       navigate("/")
      }else if(action === "edit") {
       const res = await EditPost({
           location: values.location,
           caption: values.caption,
           _id: post?._id,
           media: image ? image : values.media,
           tags: values.tags
        })
        if(res.error) {
          toast({
            title: "Failed to edit post!",
            variant: "destructive"
          })
          return;
        }
        toast({
          title: "Post has been updated successfuly"
        })
        navigate(`/post/${post?._id}`)
      }
      
    } catch (error) {
      console.log(error)
    }

  }
console.log(image)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold text-[15px] capitalize ">Caption</FormLabel>
              <FormControl>
                <Textarea disabled={isLoading || editing} className="shad-textarea !no-focus custom-scrollbar" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold text-[15px] capitalize ">Add Location</FormLabel>
              <FormControl>
                <Input disabled={isLoading || editing} className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold text-[15px] capitalize ">Add image</FormLabel>
              <FormControl>
                <UploadFile isLoading={isLoading || editing}  fieldChange={field.onChange} setImage={setImage} mediaUrl={post?.media} />
               
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold text-[15px] capitalize ">add tags</FormLabel>
              <FormControl>
                <Input disabled={isLoading || editing} placeholder="traveling, art , music" className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button disabled={isLoading || editing}  onClick={() => navigate(-1)} className="h-10 bg-secondary-200 px-5 rounded-[5px] text-white flex gap-2" type="button">Cancel</Button>
          <Button  disabled={isLoading || editing} className=" shad-button_primary rounded-[5px] " 
          type="submit">{isLoading || editing ? (
            <div className="flex-center gap-2">
              <img src={Loader} width={24} height={24} alt="loader" /> <p className="base-regular text-light-2">Loading...</p>
            </div>
          )
            :
            (
              <p className="base-regular text-light-2 capitalize">{action} Post</p>
            )}</Button>
        </div>

      </form>
    </Form>
  )
}


