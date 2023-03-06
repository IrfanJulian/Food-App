import Loading from "@/Components/modules/Loading";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import background from "../../../Assets/background.png";
import logo from "../../../Assets/logo.png";

const ResetPassword = () => {

  const router = useRouter()
  const {email} = router.query
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async() => {
    setLoading(true)

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios({
          method: 'PUT',
          url: `${process.env.URL_API}user/resetpassword/${email}`,
          data: {
            password
          }
        })
        Swal.fire('Saved!', '', 'success')
        setLoading(false)
        router.push('/auth/login')
      } else if (result.isDenied) {
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Somthing wrong'
        })    
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <div className="w-screen bg-white md:flex">
      <div className="hidden md:block md:w-1/2 relative h-screen overflow-hidden">
        <div className="bg-[#EFC81A] absolute opacity-70 h-screen w-full"></div>
        <Image src={background} priority={true} alt="bg" className="w-full" />
        <div className="wrapper absolute top-0 w-full h-screen grid">
          <div className="wrapper w-max h-max m-auto">
            <Image src={logo} alt="logo" className="mx-auto" />
            <p className="text-3xl font-medium text-white text-center">
              Mama Irfan Recipes
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-screen grid">
        <div className="w-full m-auto md:w-1/2">
          <p className="text-4xl font-bold text-center text-[#EFC81A]">Reset Password</p>
          <p className="text-center my-3">Reset Your Password to Login</p>
          <div className="my-10 w-3/4 mx-auto grid">
            <p className="font-medium mb-3 text-center">Insert new password</p>
            <div className="flex">
              <input placeholder="insert password...." type={show === false ? 'password' : 'text'} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full outline-none border-l-2 border-t-2 border-b-2 focus:border-[#EFC81A] text-center py-2' />
              <button className="h-max m-auto py-2 border-t-2 border-r-2 border-b-2 px-3" onClick={()=>show === false ? setShow(true) : setShow(false)}>
                { show === false ?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                }
              </button>
            </div>
            <button onClick={(e)=>{e.preventDefault(); handleSubmit()}} className="font-medium text-xl transition-all duration-300 hover:opacity-60 hover:scale-110 text-white bg-[#EFC81A] rounded-xl py-2 w-3/4 mx-auto my-10">Reset Password</button>
          </div>
        </div>
      </div>
      { loading === true ? <Loading /> : null }
    </div>
  );
};

export default ResetPassword;
