/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import Loader from '../../assets/loadersaver.gif'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateProfileMutation} from "../../slices/UsersApiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { setCredentials } from "../../slices/usersSlice"

import { useNavigate } from "react-router-dom"


import { useState } from "react"
import UploadProfile from "./UploadProfile"
import { useDispatch } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { UserValidation } from "@/validation"

export default function UserForm({user,id,refetch}) {


  const navigate = useNavigate()
  const { toast } = useToast()
  const dispatch = useDispatch()
  const  [image,setImage] = useState("")
  const [updateProfile, {isLoading:isEditing}] = useUpdateProfileMutation()
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
       name: user?.name || "",
       username: user?.username || "",
       picture: user?.picture || image,
       bio: user?.bio || "",
       location: user?.location || "",
       gender: user?.genre || "",
       email: user?.email || ""
    },
  })

  async function handleSubmit(values) {

    try {
       const res = await updateProfile({
         id,
         location: values.location,
         bio: values.bio,
         email: values.email,
         genre: values.gender,
         name: values.name,
         username: values.username,
         picture: image ? image : values.picture

       })
       if(res.error) {
        toast({
          title: "Failed to update profile",
          variant: "destructive"
        })
        return;
       }
       toast({
        title: "Post updated successfuly"
       })
        dispatch(setCredentials({...res.data}))
      navigate(`/profile/${user?._id}`)
      refetch()
      // toast info
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} 
      className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <UploadProfile fieldChange={field.onChange} setImage={setImage} mediaUrl={user?.picture} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold
               text-[15px] capitalize ">Name</FormLabel>
              <FormControl>
                <Input disabled={isEditing} className="shad-input !no-focus custom-scrollbar" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold
               text-[15px] capitalize ">Username</FormLabel>
              <FormControl>
                <Input disabled={isEditing} className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold 
              text-[15px] capitalize ">Email address</FormLabel>
              <FormControl>
                <Input disabled={isEditing} className="shad-input !no-focus" {...field} />
               
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
              <FormLabel className="text-black dark:text-white font-semibold
               text-[15px] capitalize ">Location</FormLabel>
              <FormControl>
                <Input disabled={isEditing}  className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold
               text-[15px] capitalize ">Gender</FormLabel>
              <FormControl>
                <Input disabled={isEditing}  className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white font-semibold 
              text-[15px] capitalize ">Bio</FormLabel>
              <FormControl>
                <Textarea disabled={isEditing}  className="shad-textarea !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button disabled={isEditing}  onClick={() => navigate(-1)} className="h-10 bg-secondary-200 px-5 rounded-[5px] text-white flex gap-2" type="button">Cancel</Button>
          <Button  disabled={isEditing} className=" shad-button_primary rounded-[5px] " 
          type="submit">{isEditing  ? (
            <div className="flex-center gap-2">
              <img src={Loader} width={24} height={24} alt="loader" /> <p className="base-regular text-light-2">Loading...</p>
            </div>
          )
            :
            (
              <p className="base-regular text-light-2 capitalize">Edit Profile</p>
            )}</Button>
        </div>

      </form>
    </Form>
  )
}


