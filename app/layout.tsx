import "./globals.css";
import { Inter } from "next/font/google";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import getCurrentUser from "../components/actions/getCurrentUser";
import ToasterProvider from "@/providers/ToasterProvider";
import Navbar from "@/components/Navbar/Navbar";
import RentModal from "@/components/Modal/RentModal";
import getAdmin from "@/components/actions/getAdmin";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  const currentAdmin = await getAdmin();
  return (
    <html lang="en">
      <link
        rel="icon"
        href="./logo.svg"
        type="image/gif"
        sizes="16x16"
      />
      <body className={inter.className}>
        <Navbar
          currentUser={currentUser}
          currentAdmin={currentAdmin}
        />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <div className="pt-20">{children}</div>
        <ToasterProvider />
      </body>
    </html>
  );
};

export default RootLayout;
