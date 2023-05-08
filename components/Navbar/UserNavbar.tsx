import { SafeUser } from "@/types";
import React from "react";
import UserMenu from "./UserMenu";
import RentInput from "../Inputs/RentInput";
import { BiPlus } from "react-icons/bi";
import useRentModal from "../hooks/useRentModal";

interface UserNavbarProps {
  currentUser: SafeUser | null;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ currentUser }) => {
  const rentModal = useRentModal();
  return (
    <div className="flex flex-row items-center justify-between gap-3 md:gap-4">
      <button
        onClick={rentModal.onOpen}
        title="tambahkan"
        className="btn btn-circle btn-outline avatar text-foreground/70 hover:bg-info hover:border-info btn-sm"
      >
        <BiPlus size={20} />
      </button>
      <UserMenu currentUser={currentUser} />
    </div>
  );
};

export default UserNavbar;
