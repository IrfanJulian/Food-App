import Image from 'next/image'
import React from 'react'
import atom from '../../Assets/atom.png'

const Loading = () => {
  return (
    <div className='absolute top-0 lef-0 h-screen w-screen'>
        <div className="fixed top-0 bg-black opacity-50 h-screen w-screen"></div>
        <div className="absolute grid top-0 w-screen h-screen">
          <div className="card bg-white h-1/6 md:h-2/6 md:w-1/4 w-1/2 grid m-auto rounded-xl">
              <Image src={atom} alt='loading' className='w-16 md:w-32 m-auto animate-spin' />
              <p className='text-xl md:text-4xl font-medium text-center'>Loading.....</p>
          </div>
        </div>
    </div>
  )
}

export default Loading