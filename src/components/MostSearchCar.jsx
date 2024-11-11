import FakeData from "@/Shared/FakeData";
import React, { useEffect, useState } from "react";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarImages, CarListing } from "../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "../../configs";
import Service from "@/Shared/Service";

const MostSearchCar = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    getPopularCars();
  }, []);

  const getPopularCars = async () => {
    const res = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id));

    const response = Service.FormatResult(res);
    setCarList(response);
  };

  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center mt-16 mb-7">
        Most Search Cars
      </h2>

      <Carousel>
        <CarouselContent>
          {carList.map((car, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MostSearchCar;
