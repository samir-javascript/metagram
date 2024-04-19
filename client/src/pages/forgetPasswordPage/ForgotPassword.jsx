/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import logo from '../../assets/anylogo.png'

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { setCredentials} from "../../slices/usersSlice"
import Loader from '../../assets/loadersaver.gif'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ForgetPasswordValidation } from '@/validation'
import { useResetPasswordRequestMutation } from '../../slices/UsersApiSlice'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
const ForgotPassword = () => {
  const navigate = useNavigate()
 const [message,setMessage] = useState('')
 const [error,setError] = useState('')
  const dispatch = useDispatch()
 const [resetPassword, {isLoading}] = useResetPasswordRequestMutation()

  const form = useForm({
     resolver: zodResolver(ForgetPasswordValidation),
     defaultValues: {
      email: ""    
     },
   })
 
   async function handleSubmit(values) {
     try {
      
     const res = await resetPassword({
        email:  values.email
     })
     if(res.error) {
        setError(res.error.data.message)
        return;
     }
     
     setMessage(res.data.message)
       
     } catch (error) {
       console.log(error)
     }
 
   }
 
  return (
    <div className="min-h-screen w-full flex-col  bg-secondary-800 flex items-center justify-center">
      {message && (
        <Alert className="!bg-green-400 max-w-[600px] my-10 mx-auto text-center " variant="destructive">
  
  <AlertTitle>you're almost done</AlertTitle>
  <AlertDescription className="capitalize">
      {message}.
  </AlertDescription>
</Alert>
      )}
       {error && (
        <Alert className="!bg-red-500  text-white max-w-[600px] my-10 mx-auto text-center " variant="destructive">
  
  <AlertTitle>Ooops!</AlertTitle>
  <AlertDescription className="capitalize">
      {error}.
  </AlertDescription>
</Alert>
      )}
         <div className="sm:w-[600px] w-[320px] my-8 px-7 py-3 gap-6 h-auto
          bg-white flex flex-col rounded-[15px] ">
            
              <img className="w-[60px] h-[70px] object-contain " src={logo} alt="appGram" />
           
            
              <div className="flex flex-col gap-2">
                   <p className="font-semibold text-[20px] text-black leading-[140%] ">Find your marjanemall account</p>
                   <p className="text-gray-400 font-normal text-bases ">    Enter your email associated with your account to change your password.</p>
              </div>
              <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
       
       
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
                 <Input disabled={isLoading} type="email" required placeholder="joe@gmail.com"  className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
         
        <div className="flex items-center justify-end gap-4">
        
          <Button  disabled={isLoading} className="shad-button_primary rounded-[5px] " type="submit">{isLoading  ? (
            <div className="flex-center gap-2">
              <img width={24} height={24} src={Loader} alt="loader" /> <p className="base-regular text-light-2">Loading...</p>
            </div>
          )
            :
            (
              <p className="base-regular text-light-2">Request</p>
            )}</Button>
        </div>

      </form>
    </Form>
   
  
         </div>
    </div>
  )
}

export default ForgotPassword