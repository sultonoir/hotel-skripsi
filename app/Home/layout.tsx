import Navbar from "@/components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const layouHome = ({ children }: Props) => {
  return (
    <div>
      <Navbar />

      <div>{children}</div>
    </div>
  );
};

export default layouHome;
