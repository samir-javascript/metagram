/* eslint-disable no-unused-vars */
import { Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useVerifyEmailMutation } from '@/slices/UsersApiSlice'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
const VerifyToken = () => {
    const { search } = useLocation()
    const [error,setError] = useState('')
    const searchParams = new URLSearchParams(search)
    const [Verify, {isLoading}] = useVerifyEmailMutation()
    const user = searchParams.get('user')
    const token = searchParams.get('token')
    useEffect(()=> {
        const verifyAccount = async()=> {
           const res = await Verify({
              user,
              token
           })
           if(res.error) {
             setError(res.error.data.message)
             return;
           }


        }
        verifyAccount()
    },[token,user,Verify])

    if(isLoading) {
      return <p className='text-gray-500 py-20 font-semibold text-2xl capitalize animate-pulse leading-[140%] opacity-[0.9] '>  Please wait while we are verifying your account...</p>
    }

    if(error) {
      return (
        <Alert variant="destructive">
  
        <AlertTitle>Ooops!</AlertTitle>
        <AlertDescription>
            {error}
        </AlertDescription>
      </Alert>
      )
    }
  return (
    <div className="flex    h-screen w-full items-center justify-center gap-5 ">

          <div className='shadow-md  max-w-[530px] min-h-auto h-[300px]  flex flex-col px-4 py-3 rounded-xl bg-white gap-3 '>
               <p className='font-bold text-black dark:text-white text-[18px] leading-[1.7]  '>your account has been verified</p>
               <Link to='/'>
               <Button className="bg-[#0aafaa] text-white rounded-[10px] w-full font-medium " type="button">
                    procceed
                  </Button>
               </Link>
              
          </div>
    </div>
  )
}

export default VerifyToken