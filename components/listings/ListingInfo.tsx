import { MdOutlineKingBed } from "react-icons/md";
import Heading from "../shared/Heading";
import { IoBedOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { Fasilitas } from "@prisma/client";
import Facility from "./Facility";
import { SafeUser } from "@/types";
import { GoLocation } from "react-icons/go";
import BluredImage from "../shared/BluredImage";
import AvatarCom from "../shared/AvatarCom";

interface ListingClientProps {
  category:
    | {
        label: string;
        description: string;
      }
    | undefined;
  title: string;
  fasilitas: Fasilitas[];
  location: string;
  description: string;
  user?: SafeUser | null;
  roomCount: number | null;
  guestCount: number | null;
  bathroomCount: number | null;
}
const ListingInfo: React.FC<ListingClientProps> = ({
  category,
  title,
  fasilitas,
  location,
  description,
  roomCount,
  guestCount,
  user,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold uppercase ">
            {title} | Tuan rumah {user?.name}
          </div>
          <div className="flex flex-row items-center gap-2 text-neutral-500">
            <GoLocation />
            {location}
          </div>
        </div>
        <div className="btn btn-ghost btn-circle avatar">
          <AvatarCom
            src={user?.image}
            alt={user?.name}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
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
