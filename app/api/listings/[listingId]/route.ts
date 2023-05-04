import getAdmin from "@/components/actions/getAdmin";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentAdmin = await getAdmin();
  if (!currentAdmin) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("invailid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      adminId: currentAdmin.id,
    },
  });

  return NextResponse.json(listing);
}
