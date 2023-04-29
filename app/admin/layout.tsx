import React, { ReactNode } from "react";
import getAdmin from "../../components/actions/getAdmin";
import AdminModal from "@/components/Modal/AdminModal";
import AdminNavbar from "@/components/admin/AdminNavbar";

type Props = {
  children: React.ReactNode;
};

const layoutHome = async ({ children }: Props) => {
  const currentAdmin = await getAdmin();
  return (
    <div>
      <AdminModal />
      <AdminNavbar currentAdmin={currentAdmin} />
      <div>{children}</div>
    </div>
  );
};

export default layoutHome;
