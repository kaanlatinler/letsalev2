import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CarImages, CarListing } from "../../../configs/schema";
import { and, eq, lte } from "drizzle-orm";
import Service from "@/Shared/Service";
import { db } from "../../../configs";
import Header from "@/components/Header";
import Search from "@/components/Search";
import CarItem from "@/components/CarItem";
import Footer from "@/components/Footer";

const SearchByOptions = () => {
  const [searchParam] = useSearchParams();

  const [carList, setCarList] = useState([]);

  const condition = searchParam.get("cars");
  const make = searchParam.get("make");
  const price = searchParam.get("price");

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    const res = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(
        and(
          condition != undefined && eq(CarListing.condition, condition),
          make != undefined && eq(CarListing.make, make)
        )
      );
    // .where(price!=undefined&&lte(CarListing.price,price))

    const response = Service.FormatResult(res);
    setCarList(response);
  };

  return (
    <div>
      <Header />

      <div className="p-10 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl ">Search Results</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList?.length > 0
            ? carList.map((car, index) => (
                <div key={index}>
                  <CarItem car={car} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                <div className="h-[300px] rounded-xl bg-slate-200 animate-pulse"></div>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchByOptions;
