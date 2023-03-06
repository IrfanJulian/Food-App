'use client';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import menu from '../../../Assets/menu new.png'
import close from '../../../Assets/close new.png'
import logo from '../../../Assets/logo.png'

const Navbar = () => {

    const router = useRouter()
    const [show, setShow] = useState(false)
    const [token, setToken] = useState()
    const [id, setId] = useState(false)

    useEffect(()=>{
        if(localStorage){
            setToken(localStorage.getItem('token'))
            setId(localStorage.getItem('id'))
        }else{
            console.log('tidak ada localstorage');
        }
    }, [])
    
  return (
    <div className="relative top-0 bg-[#EFC81A] opacity-100 w-screen" id='font-custom'>
        <div className="container mx-auto hidden md:flex py-3">
            <Image src={logo} width={75} height={75} alt='logo' onClick={()=>router.push('/')} className='cursor-pointer' />
            { token === false ?
              <div className='w-full'>
                <div className="w-3/4 space-x-20 flex">
                  <div className='flex space-x-20'>
                    <button onClick={()=>router.push('/')} className='h-max my-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>Home</button>
                    <button onClick={()=>router.push(`/menu/add-menu`)} className='h-max my-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>Add Recipe</button>
                    <button onClick={()=>router.push(`/profile/${id}`)} className='h-max my-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>Profile</button>
                  </div>
                </div>
                <div className="w-1/4 flex">
                  <button onClick={()=>{localStorage.clear(); router.push(`/auth/login`)}} className='flex my-auto ml-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <p className='text-xl my-auto text-white font-semibold'>Logout</p>
                  </button>
                </div>
              </div>
            :
              <div className="w-full flex">
                <button onClick={()=>router.push('/auth/login')} className='flex my-auto ml-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  <p className='text-xl my-auto text-white font-semibold'>Login</p>
                </button>
              </div>
            }
        </div>
        <div className="wrapper bg-[#EFC81A] py-2 md:hidden">
          <Image src={logo} width={45} height={45} alt='logo' onClick={()=>router.push('/')} className='mx-auto' />
          <button onClick={()=>show === false ? setShow(true) : setShow(false)} className='absolute top-3 right-3'>
            { show === false ?
              <Image src={menu} width={35} height={35} alt='logo'/>
            :
              <Image src={close} width={35} height={35} alt='logo'/>  
            }
          </button>

            <div className={`wrapper w-screen py-5 grid absolute transition-all duration-700 mt-0 ${show === true ? 'opacity-100' : 'opacity-0'} bg-[#EFC81A]`}>
              { !token ? 
              <button onClick={()=>router.push('/auth/login')} className='mx-auto w-max text-white text-md font-semibold'>Login</button>
              :
              <div className='grid space-y-2'>
                <button onClick={()=>router.push(`/`)} className='mx-auto w-max text-white text-md font-semibold'>Home</button>
                <button onClick={()=>router.push(`/profile/${id}`)} className='mx-auto w-max text-white text-md font-semibold'>Profile</button>
                <button onClick={()=>router.push(`/menu/add-menu`)} className='mx-auto w-max text-white text-md font-semibold'>Add Menu</button>
                <button onClick={()=>{localStorage.clear(); router.push(`/auth/login`)}} className='mx-auto w-max text-white text-md font-semibold'>Logout</button>
              </div>
              }
            </div>

        </div>
    </div>
  )
}

export default Navbar