"use client";
import Container from "@/components/Container";
import Modal from "@/components/Modal/Modal";
import Logo from "@/components/Navbar/Logo";
import useAdminModal from "@/components/hooks/useAdminModal";

const AdminNavbar = () => {
  const adminModal = useAdminModal();
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <button
              onClick={adminModal.onOpen}
              className="btn btn-info btn-sm text-white"
            >
              Signin
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminNavbar;
