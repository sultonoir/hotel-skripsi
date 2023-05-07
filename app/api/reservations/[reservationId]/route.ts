import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getAdmin from "@/components/actions/getAdmin";
import getCurrentUser from "@/components/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentAdmin = await getAdmin();
  const currentUser = await getCurrentUser();

  if (!currentAdmin && !currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser?.id },
        { adminId: currentAdmin?.id },
        { listing: { adminId: currentAdmin?.id, userId: currentUser?.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
