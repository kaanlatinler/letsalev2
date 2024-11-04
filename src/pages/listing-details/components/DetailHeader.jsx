import React from 'react'
import { BsFuelPumpFill } from 'react-icons/bs';
import { FaCalendarAlt } from "react-icons/fa";
import { MdSpeed } from 'react-icons/md';
import { TbManualGearbox } from 'react-icons/tb';

const DetailHeader = ({carDetail}) => {
  return (
    <div>
       {carDetail?.listingTitle ? <div>
            <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
            <p className='text-sm'>{carDetail?.tagline}</p>

            <div className='flex gap-2 mt-3'>
                <div className='flex gap-2 items-center bg-slate-400 rounded-full p-2 px-3'>
                    <FaCalendarAlt className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.year}</h2>
                </div>
                <div className='flex gap-2 items-center bg-slate-400 rounded-full p-2 px-3'>
                    <MdSpeed className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.mileage}</h2>
                </div>
                <div className='flex gap-2 items-center bg-slate-400 rounded-full p-2 px-3'>
                    <TbManualGearbox className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.transmission}</h2>
                </div>
                <div className='flex gap-2 items-center bg-slate-400 rounded-full p-2 px-3'>
                    <BsFuelPumpFill className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.fuelType}</h2>
                </div>
            </div>
       </div>
       : <div className='w-full rounded-xl h-[100px] bg-slate-200 animate-pulse'>

       </div>}
    </div>
  )
}

export default DetailHeader