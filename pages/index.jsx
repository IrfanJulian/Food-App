import Footer from '@/Components/bases/Footer/Footer'
import Navbar from '@/Components/modules/navbar/Navbar'
import Head from 'next/head'
import Image from 'next/image'
import piring from '../Assets/piring.png'
import salad from '../Assets/salad.png'
import pizza from '../Assets/pizza.png'
import burger from '../Assets/burger.png'
import lotek from '../Assets/lotek.png'
import newRecipe from '../Assets/new recipe.png'
import img1 from '../Assets/1.png'
import { useRouter } from 'next/router'

export async function getServerSideProps() {

  const result = await fetch(`${process.env.URL_API}recipe`)
  const data = await result.json()
  
  return {
    props: {
      data
    }
  }
}

export default function Home(props) {

  const recipe = props.data.data
  const router = useRouter()

  return (
    <>
      <div className='bg-[#FFF5EC]' id='font-custom'>
      <Navbar />
        <div className="wrapper block md:flex">
          <div className="w-screen h-screen md:w-3/4 grid">
            <div className="tittle w-3/4 h-max md:m-auto mx-auto mt-10">
              <p className='text-4xl md:text-7xl font-medium text-blue-900'>Discover Recipe & Delicious Food</p>
              <div className="wrapperimage md:hidden">
              <Image src={salad} className='relative left-0' alt='background' />
              <Image src={piring} className='absolute -left-5 top-80' alt='background' />
              </div>
              <form className='flex my-5'>
                <button className='bg-white mt-20 border-b-2 border-l-2 border-t-2 pl-2 md:pl-10'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-30">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
                <input type="text" className='w-full mt-20 md:w-1/2 py-2 pl-4 pr-5 text-md md:text-xl border-b-2 border-r-2 border-t-2' placeholder='Search Recipe' />
              </form>
            </div>
          </div>
          <div className="relative bg-[#EFC81A] hidden h-screen md:block w-1/4">
            <Image src={salad} className='absolute -left-60 mt-36' alt='background' />
            <Image src={piring} className='absolute -left-72 mt-80' alt='background' />
          </div>
        </div>
        { recipe ?
          <div className="container mx-auto md:p-10">
            <div className='border-l-[20px] border-[#EFC81A] py-8 pl-5 md:px-16'>
              <p className='text-3xl md:text-6xl font-medium text-blue-900'>Popular For You!</p>
            </div>
            <div className="grid md:grid-cols-3 w-3/4 md:w-full mx-auto md:mx-0 gap-20 my-12">
              <div className="relative mx-auto md:w-full md:mx-0">
                <video className='rounded-md w-full' controls>
                  <source src={recipe[0].photo} type='video/mp4' />
                </video>
                <div onClick={()=>router.push(`/menu/${recipe[0].id}`)} className=" absolute top-0 cursor-pointer md:top-5 left-0 md-left-0 bg-white py-1 opacity-50 px-8 rounded-md">
                  <p className='text-sm md:text-lg font-semibold text-left'>{recipe[0].tittle}</p>
                </div>
              </div>
              <div className="relative mx-auto md:w-full md:mx-0">
                <video className='rounded-md w-full' controls>
                  <source src={recipe[1].photo} type='video/mp4' />
                </video>
                <div onClick={()=>router.push(`/menu/${recipe[1].id}`)} className=" absolute top-0 cursor-pointer md:top-5 left-0 md-left-0 bg-white py-1 opacity-50 px-8 rounded-md">
                  <p className='text-sm md:text-lg font-semibold text-left'>{recipe[1].tittle}</p>
                </div>
              </div>
              <div className="relative mx-auto md:w-full md:mx-0">
                <video className='rounded-md w-full' controls>
                  <source src={recipe[2].photo} type='video/mp4' />
                </video>
                <div onClick={()=>router.push(`/menu/${recipe[2].id}`)} className=" absolute top-0 cursor-pointer md:top-5 left-0 md-left-0 bg-white py-1 opacity-50 px-8 rounded-md">
                  <p className='text-sm md:text-lg font-semibold text-left'>{recipe[2].tittle}</p>
                </div>
              </div>
            </div>
          </div>
        : 
          <div className="container mx-auto md:p-10">
            <div className='border-l-[20px] border-[#EFC81A] py-8 pl-5 md:px-16'>
              <p className='text-3xl md:text-6xl font-medium text-blue-900'>Popular For You!</p>
            </div>
            <div className="grid md:grid-cols-3 w-3/4 md:w-full mx-auto md:mx-0 gap-20 my-12">
              <div className="relative w-3/4 mx-auto md:w-full md:mx-0">
                <Image src={pizza} className='rounded-2xl' alt='' />
                <div className=" absolute bottom-5 left-5 bg-white py-1 opacity-60 px-8 rounded-md">
                  <p className='text-lg md:text-2xl font-semibold'>Pizza A La Carte</p>
                </div>
              </div>
              <div className="relative w-3/4 mx-auto md:w-full md:mx-0">
                <Image src={burger} className='rounded-2xl' alt='' />
                <div className=" absolute bottom-5 left-5 bg-white py-1 opacity-60 px-8 rounded-md">
                  <p className='text-lg md:text-2xl font-semibold'>Burgerkill</p>
                </div>
              </div>
              <div className="relative w-3/4 mx-auto md:w-full md:mx-0">
                <Image src={lotek} className='rounded-2xl' alt='' />
                <div className=" absolute bottom-5 left-5 bg-white py-1 opacity-60 px-8 rounded-md">
                  <p className='text-lg md:text-2xl font-semibold'>Lotek A La Carte</p>
                </div>
              </div>
            </div>
          </div>
        }

        <div className="container mx-auto md:p-10">
          <div className='border-l-[20px] border-[#EFC81A] py-8 pl-5 md:px-16'>
            <p className='text-3xl md:text-6xl font-medium text-blue-900'>New Recipe!</p>
          </div>
          { recipe ? 
            <div className="grid md:flex my-12">
              <div className="relative w-3/4 border md:w-1/2 mx-auto md:mx-0">
                <video className='rounded-md w-full' controls>
                  <source src={recipe[0].photo} type='video/mp4' />
                </video>
                <div onClick={()=>router.push(`/menu/${recipe[0].id}`)} className="cursor-pointer absolute bottom-5 left-5 bg-white py-1 opacity-60 px-8 rounded-md">
                  <p className='text-sm md:text-lg font-semibold'>{recipe[0].tittle}</p>
                </div>
              </div>
              <div className="wrapper w-3/4 mx-auto md:mx-0 md:ml-10 md:w-1/2 h-max mt-10 md:my-auto">
                <p className='text-2xl md:text-5xl black font-medium'>{recipe[0].tittle}</p>
                <hr className='my-4 md:my-9 border-black w-1/2' />
                <p className='black text-md md:text-xl'>{recipe[0].description}</p>
                <button onClick={()=>router.push(`/menu/${recipe[0].id}`)} className='transition-all duration-500 hover:scale-105 hover:bg-black text-xl text-white font-medium rounded-lg bg-[#EFC81A] py-3 px-10 mt-10'>Learn More</button>
              </div>
            </div>
          :
            <div className="grid md:flex my-12">
              <div className="relative w-3/4 border md:w-1/2 mx-auto md:mx-0">
                <Image src={newRecipe} className='w-full md:w-3/4' alt='' />
                <div className=" absolute bottom-5 left-5 bg-white py-1 opacity-60 px-8 rounded-md">
                  <p className='text-lg md:text-2xl font-semibold'>Burgerkill Jellyfish</p>
                </div>
              </div>
              <div className="wrapper w-3/4 mx-auto md:mx-0 md:w-1/2 h-max mt-10 md:my-auto">
                <p className='text-2xl md:text-5xl black font-medium'>Healthy Bone Broth Ramen (Quick & Easy)</p>
                <hr className='my-4 md:my-9 border-black w-1/2' />
                <p className='black text-md md:text-xl'>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                <button className='transition-all duration-500 hover:scale-105 hover:bg-black text-xl text-white font-medium rounded-lg bg-[#EFC81A] py-3 px-10 mt-10'>Learn More</button>
              </div>
            </div>
          }
        </div>

        <div className="container mx-auto md:p-10">
          <div className='border-l-[20px] border-[#EFC81A] py-8 pl-5 md:px-16'>
            <p className='text-3xl md:text-6xl font-medium text-blue-900'>Popular Recipes!</p>
          </div>
          { recipe ? 
            <div className="grid space-y-10 md:space-y-0 md:grid-cols-3 md:gap-20 md:my-12 my-8 w-3/4 mx-auto md:mx-0 md:w-full ">
              { recipe.map((item)=> 
              <div key={item.id} className="relative w-full mx-auto md:mx-0 md:w-full">
                <video className='rounded-md w-full' controls>
                  <source src={item.photo} type='video/mp4' />
                </video>
                <div onClick={()=>router.push(`/menu/${item.id}}`)} className="cursor-pointer transition-all duration-500 p-5 hover:rounded-xl hover:opacity-80 hover:scale-110">
                  <p className='text-sm md:text-lg font-semibold'>{item.tittle}</p>
                </div>
              </div>
              )}
            </div>
          :
            <div className="grid space-y-10 md:space-y-0 md:grid-cols-3 md:gap-20 md:my-12 my-8 w-3/4 mx-auto md:mx-0 md:w-full ">
              <div className="relative w-3/4 mx-auto md:mx-0 md:w-full">
                <Image src={img1} className='rounded-2xl' alt='' />
                <div className=" absolute bottom-5 left-5 bg-white py-1 opacity-60 px-8 rounded-md">
                  <p className='text-lg md:text-2xl font-semibold'>Karee</p>
                </div>
              </div>
            </div>         
          }
        </div>
        <Footer />
      </div>
    </>
  )
}
