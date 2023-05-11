"use client";
import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src?: string | null | undefined;
  alt?: string | null | undefined;
}

const AvatarCom = ({ src, alt }: AvatarProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="w-10 rounded-full">
      <Image
        src={src || `/placeholder.jpg`}
        alt={alt || "avatar"}
        fill
        priority
        sizes="100%"
        style={{ objectFit: "cover" }}
        className={`
              duration-700 ease-in-out group-hover:scale-110 rounded-full
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default AvatarCom;
