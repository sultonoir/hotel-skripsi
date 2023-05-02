import { MdOutlineKingBed } from "react-icons/md";
import Heading from "../Heading";
import { IoBedOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { Fasilitas } from "@prisma/client";
import Facility from "./Facility";

interface ListingClientProps {
  category:
    | {
        label: string;
        description: string;
      }
    | undefined;
  rooms: number | null;
  guestCount: number | null;
  kingSize: number | null;
  fullSize: number | null;
  title: string;
  fasilitas: Fasilitas[];
}
const ListingInfo: React.FC<ListingClientProps> = ({
  rooms,
  category,
  guestCount,
  kingSize,
  fullSize,
  title,
  fasilitas,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold ">
          <Heading title={title} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          {rooms !== null && rooms > 0 ? (
            <div className="flex flex-col md:flex-row gap-2 items-center border-r pr-2 md:pr-4">
              <BsDoorOpen />
              {rooms} Kamar
            </div>
          ) : null}
          {kingSize !== null && kingSize > 0 ? (
            <div className="flex flex-col md:flex-row gap-2 items-center border-r pr-2 md:pr-4">
              <IoBedOutline />
              {kingSize} King Size
            </div>
          ) : null}
          {fullSize !== null && fullSize > 0 ? (
            <div className="flex flex-col md:flex-row gap-2 items-center border-r pr-2 md:pr-4">
              <MdOutlineKingBed />
              {fullSize} Full size
            </div>
          ) : null}
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <BiUser />
            {guestCount} Tamu
          </div>
        </div>
        <hr />
        {category && (
          <div className="font-light text-neutral-500 text-justify indent-8">
            {category.description}
          </div>
        )}
        <hr />
        <div className="grid grid-cols-2 gap-4">
          {fasilitas.map((item) => (
            <Facility
              key={item.id}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
