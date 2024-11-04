import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { FaSearch } from "react-icons/fa";
import Data from "@/Shared/Data";
import { Link } from "react-router-dom";

const Search = () => {
  const [cars, setCars] = useState(null);
  const [carMakes, setCarMakes] = useState(null);
  const [pricing, setPricing] = useState(null);

  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]">
      <Select onValueChange={(v) => setCars(v)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Certified Pre-Owned">
            Certified Pre-Owned
          </SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(v) => setCarMakes(v)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {Data.CarMakes.map((maker, index) => (
            <SelectItem key={index} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(v) => setPricing(v)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((price, index) => (
            <SelectItem key={index} value={price.amount}>
              {price.amount} $
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Link to={`/search?cars=${cars}&make=${carMakes}&price=${pricing}`}>
        <FaSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
};

export default Search;
