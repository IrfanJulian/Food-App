import { useState } from "react"

const Checkbox = ({ onClick, className, cek }) => {
  return (
    <div className="">
        <button onClick={onClick} className={className}>
            { cek === true ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 m-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            :
            null
            }
        </button>
    </div>
  )
}

export default Checkbox