import React from 'react'

const Footer = () => {
  return (
    <div className='w-screen bg-[#EFC81A] px-5 mt-auto'>
        <div className="wrapper pt-5 md:py-20">
            <p className='text-3xl md:text-7xl text-blue-900 text-center'>Eat, Cook, Repeat</p>
            <p className='text-sm md:text-2xl mt-1 md:mt-5 text-blue-900 text-center'>Share your best recipe by uploading here !</p>
        </div>
        <div className="wrapper space-x-4 md:space-x-16 text-blue-900 text-md md:text-xl py-5 md:py-5 flex w-max mx-auto">
            <button className='hover:scale-110 transition-all duration-500'>Product</button>
            <button className='hover:scale-110 transition-all duration-500'>Company</button>
            <button className='hover:scale-110 transition-all duration-500'>Learn More</button>
            <button className='hover:scale-110 transition-all duration-500'>Get in touch</button>
        </div>
    </div>
  )
}

export default Footer