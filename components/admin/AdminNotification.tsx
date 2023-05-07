"use client";

import { SafeAdminNotif, SafeListing, safeAdmin } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsBell } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

interface AdminNoticationProps {
  currentAdmin: safeAdmin | null;
}

const AdminNotication: React.FC<AdminNoticationProps> = ({ currentAdmin }) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button>
          <div
            title="notification"
            className="btn btn-ghost btn-circle"
          >
            <span className="relative">
              <BsBell size={25} />
              {currentAdmin?.hasNotification ? (
                <GoPrimitiveDot className="text-info absolute top-0 right-0" />
              ) : null}
            </span>
          </div>
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
        <Menu.Items className="absolute mt-2 right-0 max-w-md origin-top-right divide-y divide-gray-100 rounded-md bg-secondary shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1"></div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AdminNotication;
