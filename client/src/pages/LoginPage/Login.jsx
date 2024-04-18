/* eslint-disable react/no-unescaped-entities */

import logo from '../../assets/anylogo.png'

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useAuthUserMutation } from '../../slices/UsersApiSlice'
import { setCredentials} from "../../slices/usersSlice"
import Loader from '../../assets/loadersaver.gif'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToast } from '../../components/ui/use-toast'
import { UserLoginFormValidation } from '@/validation'
const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const dispatch = useDispatch()
 const [authUser, {isLoading}] = useAuthUserMutation()
  const form = useForm({
     resolver: zodResolver(UserLoginFormValidation),
     defaultValues: {
        
        email: "",
        password: "",
        
        
     },
   })
 
   async function handleSubmit(values) {
 
     try {
       const res = await authUser({
          
           password: values.password,
           email: values.email,
           
        })
        if(res?.error) {
          
            toast({
                title: res?.error?.data?.message,
                variant: "destructive"
            })
        }else {
          dispatch(setCredentials({...res?.data}))
          navigate("/")
        }
         
        
       
     } catch (error) {
       console.log(error)
     }
 
   }
 
  return (
    <div className="min-h-screen w-full bg-secondary-800 flex items-center justify-center">
         <div className="sm:w-[600px] w-[320px] my-8 px-7 py-3 gap-6 h-auto
          bg-white flex flex-col rounded-[15px] ">
            <Link to="/">
              <img className="w-[60px] h-[70px] object-contain " src={logo} alt="appGram" />
              </Link>
            
              <div className="flex flex-col gap-2">
                   <p className="font-semibold text-[20px] text-black leading-[140%] ">Sign in</p>
                   <p className="text-gray-400 font-normal text-bases ">to continue to appGram</p>
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
                 <Input disabled={isLoading} className="shad-input !no-focus" {...field} />
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
              <p className="base-regular text-light-2">Login</p>
            )}</Button>
        </div>

      </form>
    </Form>
    <div className='flex items-center '>
         <p className='font-semibold text-[#454545] sm:text-[16px] text-[13px] leading-[1.7] '>Don't have an Account ?</p> <Link className='ml-1 text-secondary-200 underline whitespace-nowrap' to="/register"> sign up</Link>
    </div>
         </div>
    </div>
  )
}

export default Login