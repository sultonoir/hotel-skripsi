import { NextResponse } from "next/server";

import getcurrentAdmin from "@/components/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import getAdmin from "@/components/actions/getAdmin";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentAdmin = await getAdmin();

  if (!currentAdmin) {
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
        { adminId: currentAdmin.id },
        { listing: { adminId: currentAdmin.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
