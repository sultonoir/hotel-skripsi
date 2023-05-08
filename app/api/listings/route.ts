import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    favorite,
    category,
    title,
    description,
    adult,
    kids,
    children,
    location,
    price,
    img,
    fasilitas,
  } = body;

  const { value } = location;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      location: value,
      adult,
      kids,
      children,
      category,
      favorite,
      price: parseInt(price, 10),
      adminId: currentUser.adminId,
      userId: currentUser.id,
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
