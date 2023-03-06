import axios from "axios"
import Image from "next/image"
import img1 from '../../../Assets/1.png'

export async function getServerSideProps(context) {

    const keywords = context.query.keywords
    const result = await axios({
        method: 'GET',
        url: `${process.env.URL_API}recipe?search=${keywords}`
    })
    const data = result.json()

    return {
        props: {
            data
        }
    }
}

const Keywords = (props) => {

    const recipes = props.data.data

  return ( 
    <div className="container mx-auto md:p-10">
        <div className='border-l-[20px] border-[#EFC81A] py-8 pl-5 md:px-16'>
        <p className='text-3xl md:text-6xl font-medium text-blue-900'>Popular Recipes!</p>
        </div>
        { recipes ? 
        <div className="grid space-y-10 md:space-y-0 md:grid-cols-3 md:gap-20 md:my-12 my-8 w-3/4 mx-auto md:mx-0 md:w-full ">
            { recipes.map((item)=> 
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
  )
}

export default Keywords