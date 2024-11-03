import { Button } from '@/components/ui/button'
import { db } from '../../../../configs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarImages, CarListing } from '../../../../configs/schema'
import { useUser } from '@clerk/clerk-react'
import { desc, eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import CarItem from '@/components/CarItem'
import { FaTrash } from "react-icons/fa";

const MyListing = () => {
    const {user} = useUser()
    const [carList, setCarList] = useState([])

    useEffect(() => {
        user && getUserCarListings()
    },[user])

    const getUserCarListings = async () => {
        const res = await db.select().from(CarListing).leftJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
        .where(eq(CarListing.createdBy,user.primaryEmailAddress.emailAddress))
        .orderBy(desc(CarListing.id))
        
        const response = Service.FormatResult(res)
        setCarList(response)
    }

  return (
    <div className='mt-6'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-4xl'>My Listing</h2>
            <Link to={"/add-listing"}>
                <Button>+ Add New Listing</Button>
            </Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
            {carList.map((car, index)=>(
                <div key={index} className=''>
                  <CarItem car={car} />
                  <div className='p-2 bg-slate-100 rounded-lg flex justify-between gap-3'>
                    <Link to={`/add-listing?mode=edit&id=${car?.id}`} className='w-full'>
                      <Button variant="outline" className="w-full">Edit</Button>
                    </Link>
                    <Button variant="destructive"><FaTrash /></Button>
                  </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyListing