import Footer from '@/Components/bases/Footer/Footer'
import Loading from '@/Components/modules/Loading'
import Navbar from '@/Components/modules/navbar/Navbar'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import Swal from 'sweetalert2'
import image from '../../public/user.png'

export async function getServerSideProps(context){
  const id = context.query.id
  const res = await fetch(`${process.env.URL_API}recipe/${id}`)
  const recipe = await res.json()
  const result = await fetch(`${process.env.URL_API}comment/${id}`)
  const comment = await result.json()

  return {
    props: {
      recipe,
      comment
    }
  }
}

const DetailMenu = ({ recipe, comment }) => {

  const food = recipe.data[0]
  const comments = comment.data
  const [form, setForm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleComment = async() => {
    setLoading(true)
    try {
      await axios({
        method: `POST`,
        url: `${process.env.URL_API}`,
        data: {
          form
        }
      })
      setLoading(false)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Comment send!'
      })
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something wrong'
      })
    }
  }

  return (
    <div>
      <div className="wrapper">
      <Navbar />
        <div className="content my-10">
          <p className='md:text-4xl text-2xl text-center font-medium'>{food.tittle}</p>
          <div className="wrappervid w-11/12 md:w-1/2 border mx-auto my-5">
            <video className='rounded-md w-full' controls>
              <source src={'/ramen.mp4'} type='video/mp4' />
            </video>
          </div>
          <div className="ingredients w-3/4 mx-auto">
            <p className='text-xl md:text-2xl font-bold'>Ingredients :</p>
            <p className='text-sm md:text-lg mt-2'>{food.ingredients}</p>
            <form onSubmit={handleComment} className='my-10 grid'>
              <textarea name="form" value={form} onChange={(e)=>setForm(e.target.value)} className='w-full h-32 md:h-52 p-5 rounded-lg outline-none' placeholder='Comment' />
              <button type='submit' className='bg-[#EFC81A] text-white w-1/2 md:w-1/4 mx-auto py-2 rounded-md mt-5'>Add Comment</button>
            </form>
            <div className="wrappercomment">
              <p className='font-bold'>Comment :</p>
                { comments ? comments.map((item)=>
                  <div key={item.id} className="w-full mt-5 mx-auto">
                    <div className="flex space-x-5">
                      <Image src={item.photo.length === 0 ? image : item.photo } alt='icon' width={10} height={10} />
                      <div className="wrapper">
                        <p className='font-bold'>{item.name}</p>
                        <p className='mt-2 text-sm md:text-lg'>{item.comment}</p>
                      </div>
                    </div>
                  </div>
                ):
                  <p className='text-md md:text-2xl'>Nothing Comment Yet!</p>
                }
            </div>
          </div>
        </div>
      </div>
      { loading === true ? <Loading /> : null }
      <Footer />
    </div>
  )
}

export default DetailMenu