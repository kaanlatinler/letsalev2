import React from 'react'
import { Separator } from "@/components/ui/separator"
import { BsFuelPumpFill } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { IoMdOpen } from "react-icons/io";

const CarItem = ({car}) => {
  return (
    <div className='rounded-xl bg-white border hover:shadow-xl cursor-pointer'>
        <h2 className='absolute m-2 bg-green-500 rounded-full px-2 text-sm text-white'>New</h2>
        <img src={car?.image} width={'100%'} height={250} alt=""
        className='rounded-t-xl' />

        <div className='p-4'>
            <h2 className='font-bold text-black text-lg mb-2'>{car?.name}</h2>

            <Separator />

            <div className='grid grid-cols-3 mt-5'>
                <div className='flex flex-col items-center'>
                    <BsFuelPumpFill className='text-lg mb-2' />
                    <h2>{car.miles} Miles</h2>
                </div>
                <div className='flex flex-col items-center'>
                    <MdSpeed className='text-lg mb-2' />
                    <h2>{car.fuelType}</h2>
                </div>
                <div className='flex flex-col items-center'>
                    <TbManualGearbox className='text-lg mb-2' />
                    <h2>{car.gearType}</h2>
                </div>
            </div>

            <Separator className="my-2" />
            
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-xl'>${car.price}</h2>
                <h2 className='text-[#7AB2D3] text-sm flex gap-2 items-center'>
                <IoMdOpen />
                    View Details</h2>
            </div>
        </div>
    </div>
  )
}

export default CarItem