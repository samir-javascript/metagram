/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import logo from '../../assets/anylogo.png'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Loader from '../../assets/loadersaver.gif'
import { useRegisterUserMutation } from '../../slices/UsersApiSlice'
import { useToast } from "../../components/ui/use-toast"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { useDispatch } from 'react-redux'
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../../slices/usersSlice'
import { UserFormValidation } from '@/validation'
import { useState } from 'react'
const Register = () => {
  const dispatch = useDispatch()
  const [error,setError] = useState("")
  const [message,setMessage] = useState("")
  const { toast } = useToast()
  const navigate = useNavigate()
  const [RegisterUser, {isLoading}] = useRegisterUserMutation()
  const form = useForm({
     resolver: zodResolver(UserFormValidation),
     defaultValues: {
        name: "",
        username:"",
        email: "",
        password: "",
        gender: "",
        
     },
   })
 
   async function handleSubmit(values) {
 
    try {
      const res =  await RegisterUser({
         
          password: values.password,
          email: values.email,
          name: values.name,
          username: values.username,
          gender: values.gender,
          
       })
       if(res.error) {
          // toast({
          //   title:res?.error?.data?.message,
          //   variant: "destructive"
          // }) 
          setError(res.error.data.message)
          return;
       }else {
        dispatch(setCredentials({...res?.data}))
        setMessage(res.data.message)
       }
       
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="min-h-screen w-full bg-secondary-800 
    flex flex-col items-center justify-center">
      {error && (
        <Alert className='!bg-red-500 text-white' variant="destructive">
  
  <AlertTitle>Ooops!</AlertTitle>
  <AlertDescription>
      {error}
  </AlertDescription>
</Alert>
      )}
      {message && (
        <Alert className="!bg-green-400 max-w-[600px] my-10 mx-auto text-center " variant="destructive">
  
  <AlertTitle>you're almost done</AlertTitle>
  <AlertDescription className="capitalize">
      {message}.
  </AlertDescription>
</Alert>
      )}


         <div className="sm:w-[600px] w-[320px] my-8 px-7 py-3 gap-6 h-auto bg-white flex flex-col rounded-[15px] ">
       
              <img className="w-[60px] h-[70px] object-contain " src={logo} alt="appGram" />
             
              <div className="flex flex-col gap-2">
                   <p className="font-semibold text-[20px] text-black leading-[140%] ">Register</p>
                   <p className="text-gray-400 font-normal text-bases ">to continue to appGram</p>
              </div>
              <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black  
              font-semibold text-[15px] capitalize ">Name</FormLabel>
              <FormControl>
                <Input  className="shad-input !no-focus custom-scrollbar" {...field} />
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
              <FormLabel className="text-black 
               font-semibold text-[15px] capitalize ">username</FormLabel>
              <FormControl>
                <Input className="shad-input !no-focus" {...field} />
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
              <FormLabel className="text-black 
               font-semibold text-[15px] capitalize ">
                Email Address
               </FormLabel>
              <FormControl>
                 <Input className="shad-input !no-focus" {...field} />
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
              <FormLabel className="text-black  font-semibold
               text-[15px] capitalize ">Gender</FormLabel>
              <FormControl>
                <Input   className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
         type="password"
          control={form.control}
          name="password"
          
          render={({ field }) => (
            
            <FormItem >
              <FormLabel className="text-black  font-semibold 
              text-[15px] capitalize ">Password</FormLabel>
              <FormControl>
                <Input type="password"  className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
        
          <Button disabled={isLoading}  className="shad-button_primary rounded-[5pxcommon-container] " type="submit">{isLoading  ? (
            <div className="flex-center gap-2">
              <img width={24} height={24} src={Loader} alt="loader" /> <p className="base-regular text-light-2">Loading...</p>
            </div>
          )
            :
            (
              <p className="base-regular text-light-2">Register</p>
            )}</Button>
        </div>

      </form>
    </Form>
    <div className='flex items-center'>
         <p className='font-semibold text-[#454545] sm:text-[16px] text-[13px] leading-[1.7] '>Already have an Account ?</p> <Link className='underline text-secondary-200 ml-1 whitespace-nowrap' to="/sign-in">Log in</Link>
    </div>
         </div>
    </div>
  )
}

export default Register