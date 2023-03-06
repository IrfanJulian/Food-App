import Input from '@/Components/bases/Input/Input'
import Loading from '@/Components/modules/Loading'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import background from '../../Assets/background.png'
import logo from '../../Assets/logo.png'


const ForgotPassword = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleForgotPassword = async() => {
        setLoading(true)
        try {
            await axios({
                method: 'PUT',
                url: `${process.env.URL_API}user/forgotpassword/${email}`,
                data: {
                    email
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'OTP send please check your email'
              })
              setLoading(false)
              router.push(`/auth/otp-forgot-password/${email}`)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email not found'
              })
        }
    }

  return (
    <div className='w-screen bg-white md:flex'>
        <div className="hidden md:block md:w-1/2 relative h-screen overflow-hidden">
            <div className="bg-[#EFC81A] absolute opacity-70 h-screen w-full"></div>
            <Image src={background} priority={true} alt='bg' className='w-full' />
            <div className="wrapper absolute top-0 w-full h-screen grid">
                <div className="wrapper w-max h-max m-auto">
                    <Image src={logo} alt='logo' className='mx-auto' />
                    <p className='text-3xl font-medium text-white text-center'>Mama Irfan Recipes</p>
                </div>
            </div>
        </div>
        <div className="md:w-1/2 w-full h-screen grid">
            <div className="w-full md:w-1/2 m-auto px-7">
                <p className='text-4xl text-center text-[#EFC81A] mb-3 font-bold'>Forgot password?</p>
                <p className='text-lg md:text-xl text-center'>Insert your email to get OTP.</p>
                <Input name='email' value={email} onChange={(e)=>setEmail(e.target.value)} tittle='Email' width='mt-10 mb-5 w-full text-center' placeholder='Insert your email' type='email' />
                <div className="grid">
                    <button onClick={handleForgotPassword} className='transition-all duration-300 w-3/4 mx-auto py-3 mt-8 text-xl rounded-md hover:scale-105 hover:bg-[#f8dc60] text-white bg-[#EFC81A] font-bold'>Send OTP</button>
                </div>
            </div>
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default ForgotPassword