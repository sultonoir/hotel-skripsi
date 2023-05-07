"use client";

import AdminMenu from "@/components/admin/AdminMenu";
import { SafeAdminNotif, SafeListing, safeAdmin } from "@/types";
import AdminNotication from "./AdminNotification";

interface AdminNavbarProps {
  currentAdmin: safeAdmin | null;
}

const AdminNavbar = ({ currentAdmin }: AdminNavbarProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
      <AdminNotication currentAdmin={currentAdmin} />
      <AdminMenu currentAdmin={currentAdmin} />
    </div>
  );
};

export default AdminNavbar;
