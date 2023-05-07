import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getAdmin from "@/components/actions/getAdmin";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const currentAdmin = await getAdmin();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!currentAdmin) {
    return NextResponse.error();
  }
  // kudu aya batas waktu cancel
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
            userId: currentUser.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice: totalPrice,
          },
        },
        notification: {
          create: {
            userId: currentUser.id,
            adminId: currentAdmin.id,
          },
        },
        admin: {
          update: {
            hasNotification: true,
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
