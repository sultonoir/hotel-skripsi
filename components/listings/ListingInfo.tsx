import { MdOutlineKingBed } from "react-icons/md";
import Heading from "../Heading";

interface ListingClientProps {
  category:
    | {
        label: string;
        description: string;
      }
    | undefined;
  rooms?: number | null;
  guestCount?: number | null;
  kingSize?: number | null;
  fullSize?: number | null;
  title: string;
}
const ListingInfo: React.FC<ListingClientProps> = ({
  rooms,
  category,
  guestCount,
  kingSize,
  fullSize,
  title,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold ">
          <Heading title={title} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div className="flex gap-2 items-center border-r pr-2">
            <MdOutlineKingBed />
            {kingSize} king Size
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
