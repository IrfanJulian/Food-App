import Input from '@/Components/bases/Input/Input'
import Loading from '@/Components/modules/Loading'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import background from '../../../Assets/background.png'
import logo from '../../../Assets/logo.png'

export async function getServerSideProps(context) {
    const email = context.query.email
    // Fetch data from external API

    const res = await fetch(`${process.env.URL_API}user/byemail/${email}`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { 
        props: { 
            data 
        } 
    }
  }

const OTP = (props) => {

    const [loading, setLoading] = useState(false)
    const otp = props.data.data.otp
    const email = props.data.data.email
    const [otp2, setOtp2] = useState('')
    const router = useRouter()

    const handleVerified = (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(otp);
        if(otp === otp2){
            setTimeout(() => {
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'OTP is valid, change password now'
                })
                router.push(`/auth/reset-password/${email}`)
            }, 2500);
        }else{
            setTimeout(() => {
                setLoading(false)
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'OTP doesn`t match!'
                })
            }, 2500);
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
                <p className='text-4xl text-center text-[#EFC81A] mb-3 font-bold'>Verified</p>
                <p className='text-lg md:text-xl text-center'>Insert OTP Code.</p>
                <Input name='otp' value={otp2} onChange={(e)=>setOtp2(e.target.value)} tittle='OTP Code' width='mt-10 mb-5 w-full text-center' maxLength={6} placeholder='Insert OTP Code' type='text' className='border-2 py-1 px-4 w-full text-md md:text-xl focus:border-[#EFC81A] focus:shadow-xl hover:border-[#EFC81A] hover:shadow-xl outline-none text-center' />
                <div className="grid">
                    <button onClick={handleVerified} className='transition-all duration-300 w-3/4 mx-auto py-3 mt-8 text-xl rounded-md hover:scale-105 hover:bg-[#f8dc60] text-white bg-[#EFC81A] font-bold'>Verified OTP</button>
                </div>
            </div>
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default OTP