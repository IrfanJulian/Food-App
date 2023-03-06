/* eslint-disable @next/next/no-img-element */
import Footer from '@/Components/bases/Footer/Footer'
import Navbar from '@/Components/modules/navbar/Navbar'
import Image from 'next/image'
import React, { useState } from 'react'
import icon from '../../public/user.png'
import Input from '@/Components/bases/Input/Input'
import axios from 'axios'
import Loading from '@/Components/modules/Loading'
import Swal from 'sweetalert2'

export async function getServerSideProps(context){
    const id = context.query.id

    const myrecipe = await fetch(`${process.env.URL_API}recipe/myrecipe/${id}`)
    const myfood = await myrecipe.json()
    console.log(myfood);

    const result = await fetch(`${process.env.URL_API}user/${id}`)
    const data = await result.json()

    return {
        props: {
            user: data,
            recipe: myfood
        }
    }
}

const MyProfile = ({ user, recipe }) => {

    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [data] = useState(user.data)
    const [myRecipes] = useState(recipe.data)
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState()

    const handleUpdate = async() => {
        setLoading(true)
        const id = localStorage.getItem('id')
        const formData = new FormData()
        formData.append('name', name)
        formData.append('photo', photo, photo.name)
        console.log(formData);
        try {
            await axios({
                method: 'PUT',
                url: `${process.env.URL_API}user/${id}`,
                data: formData
            })
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Profile updated'
              })
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Profile can not updated'
              })
        }
    }

  return (
    <div>
        <div className="wrapper wrapper">
        <div className="absolute top-0 left-0">
        <Navbar />
        </div>
            <div className="my-10">
                <div className="wrapperimage relative">
                    {edit === true ?
                            <div className='absolute top-0 w-screen lg:pr-4 h-[10rem] md:h-[20rem]'>
                                <div className="wrapper bg-black opacity-30 w-[10rem] h-[10rem] md:h-[20rem] md:w-[20rem] grid rounded-full text-white m-auto">
                                    <label htmlFor="img" className='grid'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[5rem] md:w-[15rem] m-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                        </svg>
                                    </label>
                                </div>
                                <input name='photo' onChange={(e)=>setPhoto(e.target.files[0])} type="file" id='img' hidden/>
                            </div>
                    :
                        null
                    }
                    { data && data.photo.length !== 0 ?
                    <div className="wrapper bg-white w-max mx-auto rounded-full">
                        <img src={data.photo} alt='profile' className='w-[10rem] h-[10rem] md:w-[20rem] md:h-[20rem] rounded-full' />
                    </div>
                    :
                    <div className="wrapper bg-white w-max mx-auto rounded-full">
                        <Image src={icon} alt='profile' className='w-[10rem] md:w-[20rem] rounded-full' />
                    </div>
                    }
                    <button onClick={()=>show === false ? setShow(true) : setShow(false)}>
                        <div className="transition-all duration-300 hover:scale-125 absolute bottom-16 md:bottom-28 left-1/2 ml-16 md:ml-32 w-max">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8 shadow-xl text-[#EFC81A]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                    </button>
                    {show === true ?
                        <div className={`shadow-xl bg-[#EFC81A] absolute w-1/2 md:w-1/4 rounded-lg grid p-1 -bottom-3 left-1/4 md:ml-56 md:bottom-3`}>
                            <button onClick={()=>{setEdit(true); setShow(false)}} className='transition-all duration-500 hover:scale-110 hover:opacity-80 text-md md:text-xl text-white'>Edit Profile</button>
                            <hr className='border-t border-white my-1'/>
                            <button className='transition-all duration-500 hover:scale-110 hover:opacity-80 text-md md:text-xl text-white'>Change Password</button>
                        </div>
                    :
                        null
                    }
                    {edit === true ?
                        <Input name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Insert your name' width='grid' className='border-2 rounded-lg py-2 px-5 mt-1 w-3/4 md:w-1/4 mx-auto text-md md:text-xl text-center focus:border-[#EFC81A] focus:shadow-xl hover:border-[#EFC81A] hover:shadow-xl outline-none' />
                    :
                        <p className='text-xl md:text-3xl font-medium text-center md:my-10'>{data ? data.name : null}</p>
                    }
                </div>
                {edit === true ?
                    <div className="flex w-3/4 md:w-1/4 mx-auto space-x-6 mt-5">
                        <button onClick={()=>setEdit(false)} className='p-2 w-1/2 md:text-xl hover:font-bold hover:bg-red-500 transition-all duration-500 hover:scale-110 bg-[#EFC81A] rounded-full text-white'>Cancel</button>
                        <button onClick={(e)=>{e.preventDefault(); handleUpdate();}} className='p-2 w-1/2 md:text-xl hover:font-bold hover:bg-lime-600 transition-all duration-500 hover:scale-110 bg-[#EFC81A] rounded-full text-white'>Save</button>
                    </div>
                :
                    null
                }
            </div>
            <div className="container mx-auto grid my-5 md:1my-20">
                <div className="flex mx-auto md:mx-0 md:space-x-32 text-md md:text-xl font-medium">
                    <button className='transition-all duration-300 hover:scale-110 hover:bg-[#EFC81A] focus:scale-110 focus:bg-[#EFC81A] hover:opacity-80 rounded-md py-2 px-10'>My Recipes</button>
                </div>
                <hr className='border border-black my-5 md:my-10' />
                <div className="cardwrapper space-y-7 md:space-y-0 container md:grid md:grid-cols-4 md:gap-10">
                    { myRecipes ? myRecipes.map((food)=>
                        <div key={food.id} className="relative w-3/4 mx-auto md:mx-0 md:w-full">
                         <video className='rounded-md w-full' controls>
                           <source src={food.photo} type='video/mp4' />
                         </video>
                         <div onClick={()=>router.push(`/menu/${food.id}}`)} className="cursor-pointer transition-all duration-500 p-5 hover:rounded-xl hover:opacity-80 hover:scale-110">
                           <p className='text-sm md:text-lg font-semibold'>{food.tittle}</p>
                         </div>
                       </div>
                    ):
                    <p className='text-md md:text-2xl'>-Nothing recipe, start to insprations people with your recipe-</p>
                    }
                </div>
            </div>
        </div>    
        { loading === true ? <Loading /> : null }
        <Footer />
    </div>
  )
}

export default MyProfile