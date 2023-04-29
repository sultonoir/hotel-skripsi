import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
  alt: string;
}

const AvatarCom = ({ src, alt }: AvatarProps) => {
  return (
    <div className="w-10 rounded-full">
      <Image
        width={100}
        height={100}
        src={src || `/placeholder.jpg`}
        alt={alt}
        className="rounded-full"
      />
    </div>
  );
};

export default AvatarCom;
