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
              <div className={token ? 'w-1/12' : 'w-11/12'}>
                <Image src={logo} width={75} height={75} alt='logo' onClick={()=>router.push('/')} className='cursor-pointer' />
              </div>
              { token ?
                  <div className="w-full flex">
                    <div className='flex w-11/12 space-x-20'>
                      <button onClick={()=>router.push('/')} className='h-max my-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>Home</button>
                      <button onClick={()=>router.push(`/menu/add-menu`)} className='h-max my-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>Add Recipe</button>
                      <button onClick={()=>router.push(`/profile/${id}`)} className='h-max my-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>Profile</button>
                    </div>
                    <div className='w-1/12 h-max my-auto'>  
                      <button onClick={()=>{localStorage.clear(); router.push(`/auth/login`)}} className='flex my-auto ml-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <p className='text-xl my-auto text-white font-semibold'>Logout</p>
                      </button>
                    </div>
                  </div>
              :
                <div className="w-1/12 ml-auto flex">
                  <button onClick={()=>router.push('/auth/login')} className='flex my-auto ml-auto font-semibold transition-all duration-300 text-xl text-white hover:scale-110 py-2 px-5 rounded-full hover:bg-gray-500 hover:opacity-80'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <p className='text-xl my-auto text-white font-semibold'>Login</p>
                  </button>
                </div>
              }
          </div>
          <div className="wrapper bg-[#EFC81A] py-2 md:hidden px-4">
            <div className="flex w-full">
              <div className="w-11/12">
                <Image src={logo} width={35} height={35} alt='logo' onClick={()=>router.push('/')} className='' />
              </div>
              <div className="w-1/12 h-max my-auto">
                  <button onClick={()=>show === false ? setShow(true) : setShow(false)} className='ml-auto'>
                    { show === false ?
                      <Image src={menu} width={35} height={35} alt='logo'/>
                      :
                      <Image src={close} width={35} height={35} alt='logo'/>  
                    }
                  </button>
                </div>
              </div>

            <div className={`wrapper w-screen py-5 grid absolute transition-all duration-700 left-0 mt-0 ${show === true ? 'opacity-100' : 'opacity-0'} bg-[#EFC81A]`}>
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