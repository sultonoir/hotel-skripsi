import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const rese = await prisma.reservation.findMany({
    include: {
      admin: true,
      listing: {
        include: {
          imageSrc: true,
          fasilitas: true,
          favorite: true,
        },
      },
      user: {
        include: {
          favorite: true,
        },
      },
    },
  });
  return NextResponse.json({ rese });
};
