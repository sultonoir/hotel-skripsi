import { NextResponse } from "next/server";
import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/lib/prisma";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("ID tidak valid");
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favorite: {
        create: {
          listingId,
        },
      },
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favorite: {
        deleteMany: {
          listingId: {
            equals: listingId,
          },
        },
      },
    },
  });

  return NextResponse.json(user);
}
