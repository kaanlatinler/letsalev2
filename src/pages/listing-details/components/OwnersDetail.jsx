import { Button } from '@/components/ui/button'
import React from 'react'

const OwnersDetail = ({carDetail}) => {
  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className='font-medium text-2xl mb-3'>Owner / Deals Details</h2>
        <img src={carDetail?.userImageUrl} className='w-[100px] h-[100px] object-cover rounded-full'/>
        <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
        <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>

        <Button className="w-full mt-6">Message Owner</Button>
    </div>
  )
}

export default OwnersDetail