import Footer from "@/Components/bases/Footer/Footer"
import Input from "@/Components/bases/Input/Input"
import Loading from "@/Components/modules/Loading"
import Navbar from "@/Components/modules/navbar/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const AddMenu = () => {

    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState({
        tittle: '',
        ingredients: '',
        description: ''
    })
    const [photo, setPhoto] = useState('')

    useEffect(()=>{
        localStorage ?
        setId(localStorage.getItem('id')) :
        setId(null)
    }, [id])

    const handleChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]:e.target.value
        })
    }

    const handleUpload = async(e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('tittle', menu.tittle)
        formData.append('ingredients', menu.ingredients)
        formData.append('description', menu.description)
        formData.append('userid', id)
        formData.append('photo', photo, photo.name)
        try {
            await axios({
                method: 'POST',
                url: `${process.env.URL_API}recipe`,
                data: formData
            })
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Add data success'
              })
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Something Wrong'
              })
        }
    }

  return (
    <div>
        <div className="wrapper wrapper">
        <Navbar />
            <div className="my-10 w-full md:w-1/2 mx-auto">
                <p className="md:text-4xl text-2xl text-center font-medium">Add Menu</p>
                <form className="w-3/4 mx-auto my-5 grid">
                    <Input name="tittle" value={menu.tittle} onChange={handleChange} width='mt-5 w-full mx-auto' tittle='Tittle Menu' placeholder='insert tittle menu' />
                    <p className="text-md md:text-xl font-medium mt-5">Ingredients</p>
                    <textarea name="ingredients" value={menu.ingredients} onChange={handleChange} className="border-2 h-32 rounded-lg py-2 px-5 mt-1 w-full text-md md:text-xl focus:border-[#EFC81A] focus:shadow-xl hover:border-[#EFC81A] hover:shadow-xl outline-none"  placeholder='insert ingredients' />
                    <p className="text-md md:text-xl font-medium mt-5">Description</p>
                    <textarea name="description" value={menu.description} onChange={handleChange} className="border-2 h-32 rounded-lg py-2 px-5 mt-1 w-full text-md md:text-xl focus:border-[#EFC81A] focus:shadow-xl hover:border-[#EFC81A] hover:shadow-xl outline-none"  placeholder='insert description' />
                    <div className="file">
                        <label htmlFor="img" className="grid">
                            <div className="bg-white cursor-pointer p-5 w-3/4 mt-5 md:w-1/2 mx-auto hover:scale-110 hover:border-2 hover:border-[#EFC81A] rounded-xl opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 m-auto">
                                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <p className="font-medium text-center">Just allow mp4 and mkv</p>
                            </div>
                        </label>
                        <input name="photo" onChange={(e)=>setPhoto(e.target.files[0])} type="file" id="img" hidden/>
                    </div>
                    <button onClick={handleUpload} className="bg-[#EFC81A] text-white font-bold md:w-1/4 w-1/2 py-3 rounded-lg my-10 mx-auto">Add Recipe</button>
                </form>
            </div>
        </div>
        { loading === true ? <Loading /> : null }
        <Footer />
    </div>
  )
}

export default AddMenu