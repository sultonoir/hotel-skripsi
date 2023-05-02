"use client";

import { NavItem, SafeUser, safeAdmin } from "@/types";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import AdminMenu from "../admin/AdminMenu";
import useLoginModal from "../hooks/useLoginModal";
import { MainNav } from "../main-nav";

interface NavbarProps {
  currentUser: SafeUser | null;
  currentAdmin: safeAdmin | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser, currentAdmin }) => {
  const loginModal = useLoginModal();
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex gap-x-8">
              <Logo />
              <MainNav items={NavItem} />
            </div>
            {currentUser && <UserMenu currentUser={currentUser} />}
            {currentAdmin && <AdminMenu currentAdmin={currentAdmin} />}
            {!currentUser && !currentAdmin && (
              <button
                onClick={loginModal.onOpen}
                className="btn btn-info btn-xs"
              >
                Login
              </button>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
