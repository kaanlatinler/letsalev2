import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const Features = ({features}) => {

  return (
        <div className='p-10 my-7 rounded-xl border shadow-md'>
            <h2 className='font-medium text-2xl'>Features</h2>
            
            <div className='grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-10'>
                {features&& Object.entries(features).map(([key, value]) => (
                    <div key={key} className='flex gap-2 items-center'>
                        <FaCheckCircle className='text-primary rounded-full' />
                        <h2>{key}</h2>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Features