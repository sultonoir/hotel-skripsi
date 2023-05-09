import prisma from "@/lib/prisma";

interface IParams {
  listingId?: string;
  adminId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, adminId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (adminId) {
      query.adminId = adminId;
    }

    if (authorId) {
      query.listing = { adminId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: {
          include: {
            imageSrc: true,
            fasilitas: true,
          },
        },
        admin: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
