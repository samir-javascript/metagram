/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import logo from '../../assets/anylogo.png'

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import { setCredentials} from "../../slices/usersSlice"
import Loader from '../../assets/loadersaver.gif'

import { useVerifyPasswordTokenMutation , useUpdateUserPasswordMutation , useAuthUserMutation} from '../../slices/UsersApiSlice'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToast } from '../../components/ui/use-toast'
import { ResetPasswordValidation } from '@/validation'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
const RecoverPassword = () => {
  const navigate = useNavigate()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const token = searchParams.get('token')
  const [error,setError] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const user = searchParams.get('user')
  const { toast } = useToast()
  
  const dispatch = useDispatch()
  const [updatePassord, {isLoading}] = useUpdateUserPasswordMutation()
  const [auth] = useAuthUserMutation()
 const [verifyPasswordToken, {isLoading:loading}] = useVerifyPasswordTokenMutation()
  const form = useForm({
     resolver: zodResolver(ResetPasswordValidation),
     defaultValues: {
        confirmPassword: "",   
        password: "",
      },
   })
 
   async function handleSubmit(values) {
    if(values.password !== values.confirmPassword)  {
        toast({
          title: "Passwords must match",
          variant: 'desctructive'
        })
        return;
    }
 
     try {
       const res = await updatePassord({
           token,
           user,
           password: values.password
       })
       if(res.error) {
           setErrorMessage(res.error.data.message)
           return
       }
       await auth({
          email: res.data.email,
          password: values.password
       })
       dispatch(setCredentials({...res.data}))
       form.reset()
       navigate("/")
       toast({
        title: res.data.message,
       })
      
        
       
     } catch (error) {
       console.log(error)
     }
 
   }
 useEffect(()=>  {
   const verify = async()=> {
      const res = await verifyPasswordToken({
        token,user
      })
      if(res.error) {
        setError(res.error.data.message)
        return;
      }
   }
   verify()
 }, [token,user,verifyPasswordToken])
 if(loading) return <p>loading...</p>
 if(error) return (
   
        <Alert className='!bg-red-500 text-white' variant="destructive">
  
  <AlertTitle>Ooops!</AlertTitle>
  <AlertDescription>
      {error}
  </AlertDescription>
</Alert>
      
 )
  return (
    <div className="min-h-screen w-full flex-col bg-secondary-800 flex items-center justify-center">
       {errorMessage && (
         <Alert className='!bg-red-500 text-white' variant="destructive">
  
         <AlertTitle>Ooops!</AlertTitle>
         <AlertDescription>
             {errorMessage}
         </AlertDescription>
       </Alert>
       )}
         <div className="sm:w-[600px] w-[320px] my-8 px-7 py-3 gap-6 h-auto
          bg-white flex flex-col rounded-[15px] ">
            
              <img className="w-[60px] h-[70px] object-contain " src={logo} alt="appGram" />
             
            
              <div className="flex flex-col gap-2">
                   <p className="font-semibold text-[20px] text-black leading-[140%] ">Reset your password</p>
                   <p className="text-gray-400 font-normal text-bases ">to continue to appGram</p>
              </div>
              <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
       
       
        <FormField
          control={form.control}
          type="password"
          name="password"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black 
               font-semibold text-[15px] capitalize ">
                New Password
               </FormLabel>
              <FormControl>
                 <Input type="password" disabled={isLoading} className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
         <FormField
         type="password"
          control={form.control}
          name="confirmPassword"
          
          render={({ field }) => (
            
            <FormItem >
              <FormLabel className="text-black  font-semibold 
              text-[15px] capitalize ">Confirm Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password"  className="shad-input !no-focus" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
        
          <Button  disabled={isLoading} className="shad-button_primary rounded-[5pxcommon-container] " type="submit">{isLoading  ? (
            <div className="flex-center gap-2">
              <img width={24} height={24} src={Loader} alt="loader" /> <p className="base-regular text-light-2">Loading...</p>
            </div>
          )
            :
            (
              <p className="base-regular text-light-2">Reset password</p>
            )}</Button>
             <Button onClick={()=> navigate('/sign-in', {replace: true})} disabled={isLoading} className="shad-button_primary rounded-[5pxcommon-container] " type="button">
            
              <p className="base-regular text-light-2">Cancel</p>
            </Button>
        </div>

      </form>
    </Form>
    
  
         </div>
    </div>
  )
}

export default RecoverPassword