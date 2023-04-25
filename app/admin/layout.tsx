import React, { ReactNode } from "react";
import AdminNavbar from "./AdminNavbar";

type Props = {
  children: React.ReactNode;
};

const layoutHome = ({ children }: Props) => {
  return (
    <div>
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
};

export default layoutHome;
