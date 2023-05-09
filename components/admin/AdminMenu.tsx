"use client";

import { safeAdmin } from "@/types";
import AvatarCom from "../shared/AvatarCom";
import useAdminModal from "../hooks/useAdminModal";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Fragment } from "react";

interface AdminMenuProps {
  currentAdmin: safeAdmin | null;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ currentAdmin }) => {
  const adminModal = useAdminModal();
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button className="">
          <label className="btn btn-ghost btn-circle avatar">
            <AvatarCom
              src={currentAdmin?.image}
              alt="profile"
            />
          </label>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 right-0 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-secondary shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            {currentAdmin ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-info text-white" : "text-primary"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={adminModal.onOpen}
                    className={`${
                      active ? "bg-info text-white" : "text-primary"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Login
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AdminMenu;
