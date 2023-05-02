import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice: totalPrice,
          },
        },
      },
      include: {
        reservations: true,
      },
    });
    return NextResponse.json(listingAndReservation);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
