"use client";

import AdminMenu from "@/components/admin/AdminMenu";
import { MainNav } from "../main-nav";
import { adminNav, safeAdmin } from "@/types";
import Container from "../Container";
import AvatarCom from "../AvatarCom";

interface AdminNavbarProps {
  currentAdmin: safeAdmin | null;
}

const AdminNavbar = ({ currentAdmin }: AdminNavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="p-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <AvatarCom
              alt="logo"
              src={`./logo.svg`}
            />
            <AdminMenu currentAdmin={currentAdmin} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminNavbar;
