"use client";

import useRentModal from "../hooks/useRentModal";
import Heading from "../Heading";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ListingCard from "../listings/ListingCard";

interface RentInputProps {
  listings: any;
}

const RentInput = ({ listings }: RentInputProps) => {
  const rentmodal = useRentModal();
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-3 max-w-xs">
        <Heading title="Properties" subtitle="Buat properi mu" />
        <button
          onClick={rentmodal.onOpen}
          className="btn btn-info btn-sm flex flex-row gap-1 items-center justify-center text-foreground"
        >
          <AiOutlinePlusCircle className="w-4" />
          property
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((list: any) => (
          <ListingCard data={list} key={list.id} />
        ))}
      </div>
    </div>
  );
};

export default RentInput;