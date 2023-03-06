import Checkbox from '@/Components/bases/Checkbox/Checkbox'
import Input from '@/Components/bases/Input/Input'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import background from '../../Assets/background.png'
import logo from '../../Assets/logo.png'
import { useRouter } from 'next/router'
import Loading from '@/Components/modules/Loading'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [agree, setAgree] = useState(false)
  const router = useRouter() 
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async(e) => {
    setLoading(true)
    try {
      setLoading(false)
      if(agree === false){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need agree terms and condition'
        })
      }else{
        setLoading(true)
        const res = await axios({
          method: 'POST',
          url: `${process.env.URL_API}user/login`,
          data: form
        })
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login success'
        })
        localStorage.setItem('id', res.data.data.id)
        localStorage.setItem('token', res.data.data.token)
        setLoading(false)
        router.push('/')
      }
    } catch (error) {
      setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Login failed'
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
            <p className='text-4xl text-center text-[#EFC81A] mb-3 font-bold'>Welcome</p>
            <p className='text-lg md:text-xl text-center'>Login into your existing account.</p>
            <div className="flex">
              <Input name='email' value={form.email} onChange={handleChange} tittle='Email' width='mt-10 mb-5 w-full' placeholder='Insert your email' type='email' />
              <button className='ml-4 opacity-0'>abc</button>
            </div>
            <div className="flex">
              <Input name='password' value={form.password} onChange={handleChange} tittle='Password' placeholder='Insert your password' type={show === false ? 'password' : 'text'} width='mb-5 w-full'/>
              <button onClick={()=>show === false ? setShow(true) : setShow(false)} className='hover:scale-125 transition-all duration-300 ml-3'>
                { show === false ?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#EFC81A]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#EFC81A]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
               }
              </button>
            </div>
            <div className="flex">
            <Checkbox cek={agree} onClick={()=>agree === false ? setAgree(true) : setAgree(false)} className={`transition-all duration-500 hover:scale-110 ${agree === true ? 'bg-[#EFC81A] text-white rounded-md w-6 h-6' : 'border-2 rounded-md w-6 h-6'}`} />
              <p className='ml-4'>I agree to term and condition.</p>
            </div>
            <div className="grid">
              <button onClick={(e)=>{e.preventDefault(); handleLogin();}} className='transition-all duration-300 w-3/4 mx-auto py-3 mt-8 text-xl rounded-md hover:scale-105 hover:bg-[#f8dc60] text-white bg-[#EFC81A]'>Sign In</button>
              <button onClick={(e)=>router.push('/auth/forgot-password')} className='transition-all duration-300 mt-2 hover:scale-105 hover:text-[#EFC81A]'>Forgot Password ?</button>
            </div>
            <p className='mt-10 text-center'>Do not have an account? <span onClick={()=>router.push('/auth/register')} className='cursor-pointer text-[#EFC81A] font-medium hover:opacity-70'>Sign up</span></p>
          </div>
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Login