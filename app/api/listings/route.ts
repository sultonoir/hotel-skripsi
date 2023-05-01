import getAdmin from "@/components/actions/getAdmin";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currnetAdmin = await getAdmin();

  if (!currnetAdmin) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    rooms,
    kingSize,
    fullSize,
    favorite,
    category,
    guestCount,
    price,
    img,
    fasilitas,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      category,
      rooms,
      kingSize,
      fullSize,
      favorite,
      guestCount,
      price: parseInt(price, 10),
      adminId: currnetAdmin.id,
      imageSrc: {
        create: img.map((url: string) => ({ img: url })),
      },
      fasilitas: {
        create: fasilitas.map((item: string) => ({ label: item })),
      },
    },
  });

  return NextResponse.json(listing);
}
