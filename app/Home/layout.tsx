import Navbar from "@/components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const layoutAdmin = ({ children }: Props) => {
  return (
    <div>
      <Navbar />

      <div>{children}</div>
    </div>
  );
};

export default layoutAdmin;
